// Function to display user information on the account page
function displayUserInfo() {
    // Retrieve the current logged-in user's email from sessionStorage or localStorage
    var loggedInEmail = sessionStorage.getItem('email') || localStorage.getItem('email');

    // Retrieve the users array from localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if logged-inEmail is not null and users array exists
    if (loggedInEmail) {
        // Find the current logged-in user
        var currentUser = users.find(user => user.email === loggedInEmail);

        // Check if user data is available
        if (currentUser) {
            // Display the data in the respective spans
            document.getElementById('displayFullName').textContent = currentUser.fullName;
            document.getElementById('displayEmail').textContent = currentUser.email;
            document.getElementById('displayPhone').textContent = currentUser.phone;
        } else {
            // If no data is found, you could redirect to the login page or show a message
            document.getElementById('userInfo').textContent = "No user information found. Please log in.";
        }
    } else {
        // If loggedInEmail is not available, show message or redirect
        document.getElementById('userInfo').textContent = "No user information found. Please log in.";
    }
}

// Call the function to display user info when the page loads
window.addEventListener('load', displayUserInfo);

// Debugging: Check if the current user data exists in localStorage/sessionStorage
console.log('Logged in Email:', sessionStorage.getItem('email') || localStorage.getItem('email'));
console.log('Users Data:', JSON.parse(localStorage.getItem('users')));

//handling log out button
document.getElementById('logout-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Retrieve the current logged-in user's email from sessionStorage or localStorage
    var loggedInEmail = sessionStorage.getItem('email') || localStorage.getItem('email');

    // Remove user data based on where it is stored
    if (loggedInEmail) {
        // Clear session data
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('fullName');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('loggedIn');

        // Clear localStorage if user was logged in with 'Remember Me'
        localStorage.removeItem('email');
        localStorage.removeItem('fullName');
        localStorage.removeItem('phone');
        localStorage.removeItem('loggedIn');

        // Redirect to login page
        window.location.href = 'login.html';
    } else {
        // If no user was found, handle the situation (e.g., show an error or redirect)
        alert('No user is currently logged in.')
    }
})
