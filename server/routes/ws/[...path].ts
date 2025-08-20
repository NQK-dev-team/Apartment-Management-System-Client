import type { RuntimeConfig } from 'nuxt/schema';
import { apiRoutes } from '~/consts/api_routes';
import { COMMON } from '~/consts/common';
import type { APITokenResponse } from '~/types/api_response';

function getServerBaseUrl(): string {
  const config: RuntimeConfig = useRuntimeConfig();
  let apiUrl = (config.public.apiBaseURL as string) || '';
  const apiPrefix = (config.public.apiPrefix as string) || '';
  const apiVersion = (config.public.apiVersion as string) || '';
  apiUrl = apiUrl + (apiPrefix ? '/' + apiPrefix : '') + (apiVersion ? '/' + apiVersion : '');

  return apiUrl;
}

async function verifyToken(token: string): Promise<boolean> {
  // Verify the token
  const response = await fetch(getServerBaseUrl() + apiRoutes.authentication.verifyToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    },
    body: JSON.stringify({ jwtToken: token }),
  });

  const body: APITokenResponse<boolean> = await response.json();

  return body.data;
}

async function getNewToken(refreshToken: string): Promise<APITokenResponse<null> | null> {
  // Get a new token
  const response = await fetch(getServerBaseUrl() + apiRoutes.authentication.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json, multipart/form-data, image/*',
      Accept: 'application/json, image/*',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const body: APITokenResponse<null> = await response.json();

  if (body.status && body.status !== COMMON.HTTP_STATUS.OK) {
    return null;
  }

  return body;
}

export default defineWebSocketHandler({
  async open(peer) {
    // Extract JWT from cookies and verify it before creating WS connection
    const jwtCookie = peer.request?.headers
      ?.get('cookie')
      ?.split('; ')
      .find((row) => row.startsWith('jwt='));

    if (!jwtCookie) {
      peer.close();
    } else {
      const jwt = jwtCookie.split('=')[1];

      if (!(await verifyToken(jwt))) {
        const refreshTokenCookie = peer.request?.headers
          ?.get('cookie')
          ?.split('; ')
          .find((row) => row.startsWith('refreshToken='));

        if (!refreshTokenCookie) {
          peer.close();
        } else {
          const refreshToken = refreshTokenCookie.split('=')[1];
          const newToken = await getNewToken(refreshToken);
          if (!newToken) {
            peer.close();
          }
        }
      }
    }

    const config: RuntimeConfig = useRuntimeConfig();
    const preprocessedPath =
      peer.websocket.url?.replace(
        `${peer.request?.headers?.get('x-forwarded-proto')}://${peer.request?.headers?.get('host')}/ws`,
        ''
      ) || '';

    let _externalWSPath = '';
    let userID = 0;

    // Remove query parameter of clientUserID from preprocessedPath
    const splitResult = preprocessedPath.split('?');

    if (splitResult.length > 1) {
      const basePath = preprocessedPath.split('?')[0];
      const queryParams = preprocessedPath
        .split('?')[1]
        .split('&')
        .filter((param) => !param.startsWith('clientUserID='));
      userID = Number(
        preprocessedPath
          .split('?')[1]
          .split('&')
          .find((param) => param.startsWith('clientUserID='))
          ?.split('=')[1] || 0
      );

      _externalWSPath = `${basePath}?${queryParams.join('&')}`;
    } else {
      _externalWSPath = preprocessedPath;
    }

    _externalWSPath = '/'; // Since the list of feature is minimal, there is currently no need to categorize WS connection base on _externalWSPath, we can keep it simple (for now)
    const external = new WebSocket(
      `${config.public.webSocketURL}/${config.public.webSocketPrefix}/${config.public.webSocketVersion}${_externalWSPath}`
    );
    peer.websocket.onclose = () => {
      // console.log('WebSocket closed:', peer.id);
      external.close();
    };

    external.onmessage = (event) => {
      if (peer.websocket && typeof peer.websocket.send === 'function') {
        const data = JSON.parse(event.data);
        const type = data.type;
        const notificationSignals = [
          COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_IMPORTANT,
          COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_INBOX,
          COMMON.WEBSOCKET_SIGNAL_TYPE.NEW_SENT,
        ];

        if (notificationSignals.includes(type)) {
          const users: number[] = data.users;
          if (users.includes(userID)) {
            peer.websocket.send(event.data);
          }
        } else {
          peer.websocket.send(event.data);
        }
      }
    };
  },
  error(_err) {
    // console.error('WebSocket error:', _err);
  },
  message(_peer, _message) {
    /* empty */
  },
});
