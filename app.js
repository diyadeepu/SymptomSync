// Mock database routing counties to nearest hospitals
const hospitals = {
    'benton': 'Good Samaritan Regional Medical Center (2.3 miles away)',
    'multnomah': 'OHSU Hospital (1.1 miles away)',
    'lane': 'PeaceHealth Sacred Heart Medical Center (3.4 miles away)',
    'other': 'Regional Health System (Location Services Required)'
};

// Navigation logic to hide/show pages
function showPage(pageId) {
    document.querySelectorAll('main > div').forEach(div => div.classList.add('hidden-page'));
    document.getElementById(pageId).classList.remove('hidden-page');
}

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

    if (!first || !last || !email || !password) {
        errorDiv.innerText = "All fields are required.";
        errorDiv.classList.remove('hidden');
        return;
    }
    
    if (password.length < 8 || !/\d/.test(password)) {
        errorDiv.innerText = "Password must be at least 8 characters and contain a number.";
        errorDiv.classList.remove('hidden');
        return;
    }

    const users = getRegisteredUsers();
    
    if (users.find(u => u.email === email)) {
        errorDiv.innerText = "An account with this email already exists.";
        errorDiv.classList.remove('hidden');
        return;
    }

    users.push({ first, last, email, password });
    localStorage.setItem('triageUsers', JSON.stringify(users));

    document.getElementById('signup-first').value = '';
    document.getElementById('signup-last').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    
    successDiv.innerText = "Account created successfully! You can now log in.";
    successDiv.classList.remove('hidden');
    
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
        errorDiv.innerText = "Invalid credentials. Please check your spelling or click 'Sign Up'.";
        errorDiv.classList.remove('hidden');
    }
}

function guestLogin() {
    document.getElementById('user-status').innerText = 'Guest User';
    showPage('page-welcome');
}

// Form handling logic
function populateConcern() {
    const dropdown = document.getElementById('common-concern');
    const textArea = document.getElementById('concern-text');
    if (dropdown.value) {
        textArea.value = dropdown.value;
    }
}

function goToQuestions() {
    const concern = document.getElementById('concern-text').value;
    if (!concern.trim()) {
        alert('Please enter or select a concern.');
        return;
    }
    document.getElementById('dynamic-concern-display').innerText = 'Regarding: "' + concern + '"';
    showPage('page-questions');
}

function goToResults() {
    const county = document.getElementById('county-select').value;
    document.getElementById('hospital-display').innerText = hospitals[county] || 'Nearest Hospital Location';
    showPage('page-results');
}

function resetApp() {
    document.getElementById('concern-text').value = '';
    document.getElementById('common-concern').value = '';
    showPage('page-welcome');
}
