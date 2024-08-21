// Redirect if not logged in as admin
if (!sessionStorage.getItem('adminLoggedIn') && !localStorage.getItem('adminLoggedIn')) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
}

// Handle admin logout
document.getElementById('adminLogoutBtn').addEventListener('click', function() {
    // Clear session storage and remove login status from local storage
    sessionStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoggedIn');

    // Redirect to login page after logout
    window.location.href = 'login.html'; // or 'index.html'
});
