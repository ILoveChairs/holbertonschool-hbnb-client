
async function loginUser(email, password) {
  // Sends response
  const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
  });

  // Handles response
  if (response.ok) {
    const data = await response.json();
    setJwtToken(data.access_token);
    window.location.href = 'index.html';
  } else {
    alert('Login failed: ' + response.statusText);
  }
}

window.onload = () => {
  // Load all shared functions that need onload from !shared.js
  loadSharedFunctions()

  const loginForm = document.getElementById('login-form');

  // Adds handler for login form
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      console.log('login attempt');
      loginUser(loginForm.email.value, loginForm.password.value);
  });
};
