
// Check full name (conditions from lab3)
function checkFullName() {
    var userInputFullName = document.getElementById("fullname").value;
    var regExpFullName = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})+$/;
    var nameError = document.getElementById('nameError');

    if (!regExpFullName.test(userInputFullName)) {
        nameError.style.display = 'inline';
        return false;
    } else {
        nameError.style.display = 'none';
        return true;
    }
}

// Check email (conditions from lab3)
function checkEmail() {
    var userInputEmail = document.getElementById("email").value;
    var regExpEmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|[a-z0-9.-]+\.com|[a-z0-9.-]+\.edu|[a-z0-9.-]+\.eg)$/i;
    var emailError = document.getElementById('emailError');

    if (!regExpEmail.test(userInputEmail)) {
        emailError.style.display = 'inline';
        return false;
    } else {
        emailError.style.display = 'none';
        return true;
    }
}

// Check password (conditions from lab3)
function checkPassword() {
    var userInputPassword = document.getElementById("password").value.trim();
    console.log("Password input:", userInputPassword); // Debugging the input
    var regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passwordError = document.getElementById('passwordError');

    if (!regExpPassword.test(userInputPassword)) {
        passwordError.style.display = 'inline';
        return false;
    } else {
        passwordError.style.display = 'none';
        return true;
    }
}


// Check repeat password validation
function checkRepeatPassword() {
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;
    var repeatPasswordError = document.getElementById('repeatPasswordError');

    if (password !== repeatPassword) {
        repeatPasswordError.style.display = 'inline';
        return false;
    } else {
        repeatPasswordError.style.display = 'none';
        return true;
    }
}

// Check phone number (conditions from lab3)
function checkPhoneNumber() {
    var userInputPhone = document.getElementById("phone").value;
    var regExpPhone = /^(010|011|012|015)\d{8}$/;
    var phoneError = document.getElementById('phoneError');

    if (!regExpPhone.test(userInputPhone)) {
        phoneError.style.display = 'inline';
        return false;
    } else {
        phoneError.style.display = 'none';
        return true;
    }
}

// Validate full name on blur
document.getElementById('fullname').addEventListener('blur', checkFullName);

// Validate email on blur
document.getElementById('email').addEventListener('blur', checkEmail);

// Validate password on blur
document.getElementById('password').addEventListener('blur', checkPassword);

// Validate repeat password on blur
document.getElementById('repeatPassword').addEventListener('blur', checkRepeatPassword);

// Validate phone number on blur
document.getElementById('phone').addEventListener('blur', checkPhoneNumber);

// Register if all fields are valid and store registered data locally and keep the user logged in 
function Register() {
    var isFullNameValid = checkFullName();
    var isEmailValid = checkEmail();
    var isPasswordValid = checkPassword();
    var isRepeatPasswordValid = checkRepeatPassword();
    var isPhoneValid = checkPhoneNumber();

    if (isFullNameValid && isPasswordValid && isEmailValid && isRepeatPasswordValid && isPhoneValid) {
        // Get user input values
        var fullName = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var phone = document.getElementById("phone").value;

        // Retrieve existing users from localStorage or create an empty array
        var users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists
        var emailExists = users.some(function(user) {
            return user.email === email;
        });

        if (emailExists) {
            alert("Email already registered. Please use a different email.");
            return false;
        }

        // Create a user object
        var newUser = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone
        };

        // Add the new user to the array
        users.push(newUser);

        // Store the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Store the user as logged in in sessionStorage
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('fullName', fullName);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('loggedIn', true);

        // Optionally, set user info in localStorage if you want to persist across sessions
        localStorage.setItem('loggedIn', true);

        // Redirect to home page
        var encodedFullName = encodeURIComponent(fullName);
        window.location.href = 'index.html?FullName=' + encodedFullName;
    }
}

// Add event listener to the form submission
document.getElementById('customer-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    Register(); // Call the Register function to validate and store data
})

