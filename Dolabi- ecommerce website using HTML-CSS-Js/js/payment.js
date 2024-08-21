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

function checkCity() {
    var userInputCity = document.getElementById("city").value;
    var regExpCity = /^[A-Za-z\s]+$/;
    var cityError = document.getElementById('cityError');

    if (!regExpCity.test(userInputCity)) {
        cityError.style.display = 'inline';
        return false;
    } else {
        cityError.style.display = 'none';
        return true;
    }
}

function checkCountry() {
    var userInputCountry = document.getElementById("country").value;
    var regExpCountry = /^[A-Za-z\s]+$/;
    var countryError = document.getElementById('countryError');

    if (!regExpCountry.test(userInputCountry)) {
        countryError.style.display = 'inline';
        return false;
    } else {
        countryError.style.display = 'none';
        return true;
    }
}

function checkZipCode() {
    var userInputZip = document.getElementById("zipcode").value;
    var regExpZip = /^\d{7}$/;
    var zipError = document.getElementById('zipError');

    if (!regExpZip.test(userInputZip)) {
        zipError.style.display = 'inline';
        return false;
    } else {
        zipError.style.display = 'none';
        return true;
    }
}
function checkCardHolderName() {
    var cardHolderName = document.querySelector('input[placeholder="Name on card"]').value;
    var regExpCardHolderName = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,}){2}$/; // Exactly 3 words
    var cardHolderNameError = document.getElementById('cardHolderNameError');

    if (!regExpCardHolderName.test(cardHolderName)) {
        cardHolderNameError.style.display = 'inline';
        return false;
    } else {
        cardHolderNameError.style.display = 'none';
        return true;
    }
}

function checkCardNumber() {
    var cardNumber = document.querySelector('input[placeholder="1111-2222-3333-4444"]').value;
    var regExpCardNumber = /^\d{16}$/; // Exactly 16 digits
    var cardNumberError = document.getElementById('cardNumberError');

    if (!regExpCardNumber.test(cardNumber)) {
        cardNumberError.style.display = 'inline';
        return false;
    } else {
        cardNumberError.style.display = 'none';
        return true;
    }
}

function validatePayment() {
    var isCashOnDeliveryChecked = document.getElementById('cashOnDelivery').checked;
    var cardName = document.querySelector('input[placeholder="Name on card"]').value;
    var cardNumber = document.querySelector('input[placeholder="1111-2222-3333-4444"]').value;
    var expMonth = document.querySelector('input[placeholder="January"]').value;
    var expYear = document.querySelector('input[placeholder="2025"]').value;
    var cvv = document.querySelector('input[placeholder="1234"]').value;

    if (isCashOnDeliveryChecked) {
        // If Cash on Delivery is checked, skip payment validation
        return true;
    } else {
        // Validate payment information
        var paymentValid = cardName && cardNumber && expMonth && expYear && cvv &&
            checkCardHolderName() && checkCardNumber();
        return paymentValid;
    }
}

function validateForm() {
    var billingValid = checkFullName() && checkEmail() && checkPhoneNumber() && checkCity() && checkCountry() && checkZipCode();
    var paymentValid = validatePayment();
    
    if (!billingValid) {
        return false; // If billing details are invalid, do not submit
    }
    
    if (!paymentValid) {
        alert("Please provide valid payment information.");
        return false; // If payment details are invalid and Cash on Delivery is not checked, do not submit
    }

    return true; // If all validations pass, submit the form
}

// validation on blur
document.getElementById('fullname').addEventListener('blur', checkFullName);
document.getElementById('email').addEventListener('blur', checkEmail);
document.getElementById('phone').addEventListener('blur', checkPhoneNumber);
document.getElementById('city').addEventListener('blur', checkCity);
document.getElementById('country').addEventListener('blur', checkCountry);
document.getElementById('zipcode').addEventListener('blur', checkZipCode);
document.querySelector('input[placeholder="Name on card"]').addEventListener('blur', checkCardHolderName);
document.querySelector('input[placeholder="1111-2222-3333-4444"]').addEventListener('blur', checkCardNumber);
 
//fill form button 
function fillform() {
    // Retrieve the logged-in user's email from sessionStorage or localStorage
    var loggedInEmail = sessionStorage.getItem('email') || localStorage.getItem('email');
    
    // Retrieve the users array from localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the current logged-in user
    var currentUser = users.find(user => user.email === loggedInEmail);

    if (currentUser) {
        // Fill the form fields with the retrieved information
        document.getElementById('fullname').value = currentUser.fullName;
        document.getElementById('email').value = currentUser.email;
        document.getElementById('phone').value = currentUser.phone;
    } else {
        alert('No registration information found.');
    }
}
