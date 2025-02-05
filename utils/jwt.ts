function getRoleFromJWT(token: string): string {
  let role = '';
  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  role += json.isOwner ? '1' : '0';
  role += json.isManager ? '1' : '0';
  role += json.isCustomer ? '1' : '0';
  return role;
}

function getUserNameFromJWT(token: string): string {
  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.fullName;
}

function getUserImageFromJWT(token: string): string {
  const jwtPayload = token.split('.')[1];
  const json = JSON.parse(Buffer.from(jwtPayload, 'base64url').toString('utf8'));
  return json.imagePath;
}

export { getRoleFromJWT, getUserNameFromJWT, getUserImageFromJWT };
