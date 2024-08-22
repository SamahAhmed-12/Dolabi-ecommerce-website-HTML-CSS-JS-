// Store admin credentials in localStorage
(function storeAdminData() {
    const adminData = {
        username: "Dolabi.admin",
        password: "Dol@bi123",
        email: "dolabi-admin@gmail.com"
    };

    if (!localStorage.getItem('admin')) {
        localStorage.setItem('admin', JSON.stringify(adminData));
    }
})();

// Check email format
function checkLoginEmail() {
    var userInputEmail = document.getElementById("loginEmail").value;
    var regExpEmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|[a-z0-9.-]+\.com|[a-z0-9.-]+\.edu|[a-z0-9.-]+\.eg)$/i;
    var emailError = document.getElementById('loginEmailError');
    console.log("Checking email:", userInputEmail);

    if (!regExpEmail.test(userInputEmail)) {
        console.log("Invalid email format");
        emailError.style.display = 'inline';
        return false;
    } else {
        console.log("Valid email format");
        emailError.style.display = 'none';
        return true;
    }
}

// Check password format
function checkLoginPassword() {
    var userInputPassword = document.getElementById("loginPassword").value;
    var regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passwordError = document.getElementById('loginPasswordError');
    console.log("Checking password:", userInputPassword);

    if (!regExpPassword.test(userInputPassword)) {
        console.log("Invalid password format");
        passwordError.style.display = 'inline';
        return false;
    } else {
        console.log("Valid password format");
        passwordError.style.display = 'none';
        return true;
    }
}

// Validate login form fields and show errors on submit
function validateLoginForm() {
    var isEmailValid = checkLoginEmail();
    var isPasswordValid = checkLoginPassword();

    return isEmailValid && isPasswordValid;
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    if (validateLoginForm()) {
        var email = document.getElementById("loginEmail").value;
        var password = document.getElementById("loginPassword").value;
        var rememberMe = document.getElementById("rememberMe").checked;

        // Retrieve admin and users data from localStorage
        var admin = JSON.parse(localStorage.getItem('admin'));
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Find a user with matching email
        var matchedUser = users.find(user => user.email === email);

        // Check if email is not registered (neither admin nor user)
        if (email !== admin.email && !matchedUser) {
            console.log("Email not registered");
            document.getElementById('mailNotRegisteredError').style.display = 'inline';
            document.getElementById('loginError').style.display = 'none';
            return;
        }

        // Check if the credentials match the admin
        if (email === admin.email && password === admin.password) {
            console.log("Admin login successful");
            if (rememberMe) {
                localStorage.setItem('adminLoggedIn', true);
            } else {
                sessionStorage.setItem('adminLoggedIn', true);
            }

            // Redirect to admin page
            window.location.href = 'html.html';
        } else if (matchedUser && password === matchedUser.password) {
            console.log("User login successful");
            // Store credentials in sessionStorage or localStorage based on "Remember Me"
            if (rememberMe) {
                localStorage.setItem('email', matchedUser.email);
                localStorage.setItem('fullName', matchedUser.fullName);
                localStorage.setItem('phone', matchedUser.phone);
                localStorage.setItem('loggedIn', true);
            } else {
                sessionStorage.setItem('email', matchedUser.email);
                sessionStorage.setItem('fullName', matchedUser.fullName);
                sessionStorage.setItem('phone', matchedUser.phone);
                sessionStorage.setItem('loggedIn', true);
            }

            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            // Show error message if email is registered but password is incorrect
            console.log("Incorrect password");
            document.getElementById('loginError').style.display = 'inline';
            document.getElementById('mailNotRegisteredError').style.display = 'none';
        }
    }
});

// Validate fields on blur
document.getElementById('loginEmail').addEventListener('blur', checkLoginEmail);
document.getElementById('loginPassword').addEventListener('blur', checkLoginPassword);

// function to set user id (ended up not used)
function handleLoginSuccess(userId) {
    localStorage.setItem('userId', userId);
}
