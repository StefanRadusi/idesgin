export function isAdminLogged(userLogged) {
  if (localStorage.getItem("token")) {
    return true;
  }

  return userLogged;
}
