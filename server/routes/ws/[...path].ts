import httpProxy from 'http-proxy';

export default defineWebSocketHandler({
  open(peer) {},
  close(peer) {},
  error(err) {
    console.error('WebSocket error:', err);
  },
  message(peer, message) {},
});
