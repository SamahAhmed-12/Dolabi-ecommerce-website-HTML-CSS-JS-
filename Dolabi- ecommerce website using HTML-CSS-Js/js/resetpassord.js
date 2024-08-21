// Validation function for password
function checkPassword() {
    var userInputPassword = document.getElementById("password").value.trim();
    var regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regExpPassword.test(userInputPassword);
}

function checkRepeatPassword() {
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    return password === repeatPassword;
}

// Validate fields on blur
document.getElementById('email').addEventListener('blur', function() {
    var email = document.getElementById("email").value;
    document.getElementById('emailError').style.display = checkEmailExists(email) ? 'none' : 'inline';
});
document.getElementById('password').addEventListener('blur', function() {
    var passwordError = document.getElementById('passwordError');
    passwordError.style.display = checkPassword() ? 'none' : 'inline';
});
document.getElementById('repeatPassword').addEventListener('blur', function() {
    var repeatPasswordError = document.getElementById('repeatPasswordError');
    repeatPasswordError.style.display = checkRepeatPassword() ? 'none' : 'inline';
});

// Check if the email exists in localStorage
function checkEmailExists(email) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}

// Handle password reset form submission
document.getElementById('resetpassowrd-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    var email = document.getElementById("email").value;
    var newPassword = document.getElementById("password").value;

    var isEmailValid = checkEmailExists(email);
    var isPasswordValid = checkPassword();
    var isRepeatPasswordValid = checkRepeatPassword();

    if (isEmailValid && isPasswordValid && isRepeatPasswordValid) {
        // Retrieve the users array from localStorage
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Find the user by email and update their password
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                users[i].password = newPassword; // Update the password
                break;
            }
        }

        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Optionally redirect or show a success message
        alert('Password has been updated successfully.');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        // Show appropriate error messages
        if (!isEmailValid) {
            document.getElementById('emailError').style.display = 'inline';
        }
        if (!isPasswordValid) {
            document.getElementById('passwordError').style.display = 'inline';
        }
        if (!isRepeatPasswordValid) {
            document.getElementById('repeatPasswordError').style.display = 'inline';
        }
    }
});
