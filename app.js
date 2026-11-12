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

// Login handling
function loginUser() {
    const user = document.getElementById('username').value || 'User';
    document.getElementById('user-status').innerText = 'Logged in as: ' + user;
    showPage('page-welcome');
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
