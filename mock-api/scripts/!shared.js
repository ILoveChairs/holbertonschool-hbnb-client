
/* This file contain shared functions.
'loadSharedFunctions' should be called on windows.load to get
access to elements.
*/

/* Functions from https://www.w3schools.com/js/js_cookies.asp */
/* Set cookie modified to have fixed expire date, half a day. */
/* Should not be called directly, instead use jwt cookie functions */
function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + (12 * 60 * 60 * 1000));
  const expires = 'expires='+d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/* Session token handlers, renames. */
function setJwtToken(token) {
  setCookie('jwt', token);
}

function getJwtToken() {
  return getCookie('jwt');
}

function checkJwtToken() {
  if (getJwtToken() === '') {
    return false;
  }
  return true;
}

/* To be called on every window.load */
function loadSharedFunctions() {

  const loginButton = document.getElementById('login-button');

  // If logged in, hide login button.
  if (checkJwtToken()) {
    loginButton.style = 'visibility: hidden';
  }
}
