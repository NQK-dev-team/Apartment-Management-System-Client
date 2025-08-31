function getRoleFromJWT(token: string): string {
  if (!token) {
    return '';
  }

  let role = '';
  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  role += json.isOwner ? '1' : '0';
  role += json.isManager ? '1' : '0';
  role += json.isCustomer ? '1' : '0';
  return role;
}

function getUserNameFromJWT(token: string): string {
  if (!token) {
    return '';
  }

  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.fullName;
}

function getUserImageFromJWT(token: string): string {
  if (!token) {
    return '';
  }

  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.imagePath;
}

function getUserIDFromJWT(token: string): string {
  if (!token) {
    return '';
  }

  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.userID;
}

function getUserNoFromJWT(token: string): string {
  if (!token) {
    return '';
  }

  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.userNo;
}

function getTicketByPassPermission(token: string): string {
  if (!token) {
    return '0';
  }

  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.ticketByPass ? '1' : '0';
}

export {
  getRoleFromJWT,
  getUserNameFromJWT,
  getUserImageFromJWT,
  getUserIDFromJWT,
  getUserNoFromJWT,
  getTicketByPassPermission,
};
