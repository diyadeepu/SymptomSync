// Local database simulation using browser's localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('triageUsers');
    return users ? JSON.parse(users) : [];
}

// User Registration Logic
function registerUser() {
    const first = document.getElementById('signup-first').value.trim();
    const last = document.getElementById('signup-last').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const errorDiv = document.getElementById('signup-error');
    const successDiv = document.getElementById('signup-success');
    
    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');

    // Validation
    if (!first || !last || !email || !password) {
        errorDiv.innerText = "All fields are required.";
        errorDiv.classList.remove('hidden');
        return;
    }
    
    // Strong password check (min 8 chars, at least 1 number)
    if (password.length < 8 || !/\d/.test(password)) {
        errorDiv.innerText = "Password must be at least 8 characters and contain a number.";
        errorDiv.classList.remove('hidden');
        return;
    }

    const users = getRegisteredUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        errorDiv.innerText = "An account with this email already exists.";
        errorDiv.classList.remove('hidden');
        return;
    }

    // Save new user
    users.push({ first, last, email, password });
    localStorage.setItem('triageUsers', JSON.stringify(users));

    // Clear form and show success
    document.getElementById('signup-first').value = '';
    document.getElementById('signup-last').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    
    successDiv.innerText = "Account created successfully! You can now log in.";
    successDiv.classList.remove('hidden');
    
    // Optional: auto-route back to login after 2 seconds
    setTimeout(() => {
        showPage('page-login');
        successDiv.classList.add('hidden');
    }, 2000);
}

// User Login Logic
function loginUser() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    errorDiv.classList.add('hidden');

    const users = getRegisteredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
        document.getElementById('user-status').innerText = 'Logged in as: ' + foundUser.first + ' ' + foundUser.last;
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        showPage('page-welcome');
    } else {
        errorDiv.innerText = "Invalid credentials. Please check your spelling or click 'Sign Up' to create an account.";
        errorDiv.classList.remove('hidden');
    }
}

function guestLogin() {
    document.getElementById('user-status').innerText = 'Guest User';
    showPage('page-welcome');
}
