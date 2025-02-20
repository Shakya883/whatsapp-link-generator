function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+91[789]\d{9}$/; // Regex for Indian phone numbers starting with +91 and followed by 10 digits
    return phoneRegex.test(phoneNumber);
}

function showValidationError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearValidationError() {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

export { validatePhoneNumber, showValidationError, clearValidationError };