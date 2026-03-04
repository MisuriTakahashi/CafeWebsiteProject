document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');

    // Reset errors
    userError.style.display = 'none';
    passError.style.display = 'none';

    // Basic Validation
    if (password !== confirmPassword) {
        passError.style.display = 'block';
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        userError.style.display = 'block';
        return;
    }

    // Save new user
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now log in.');
    window.location.href = 'Login.html';
});
