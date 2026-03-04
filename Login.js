document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    // Reset error
    loginError.style.display = 'none';

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find matching user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Set "session"
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            email: user.email,
            loginTime: new Date().getTime()
        }));

        alert('Welcome back, ' + user.username + '!');
        window.location.href = 'index.html';
    } else {
        loginError.style.display = 'block';
    }
});
