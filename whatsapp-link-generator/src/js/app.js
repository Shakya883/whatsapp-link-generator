// This file contains the main JavaScript functionality for the WhatsApp Link Generator application.

console.log("Script loaded");
console.log("Phone Input:", document.getElementById("phone-number"));
console.log(
  "Validation Message:",
  document.getElementById("validation-message")
);
console.log("WhatsApp Button:", document.getElementById("open-whatsapp"));

document.addEventListener("DOMContentLoaded", function () {
  // Constants for validation
  const PHONE_REGEX = /^[6-9]\d{9}$/;
  const MIN_LENGTH = 10;

  // DOM Elements - Add null checks
  const phoneInput = document.getElementById("phone-number");
  const validationMessage = document.getElementById("validation-message");
  const whatsappButton = document.getElementById("open-whatsapp");
  const generatedLinkContainer = document.getElementById(
    "generated-link-container"
  );
  const generatedLinkInput = document.getElementById("generated-link");
  const copyLinkButton = document.getElementById("copy-link");

  // Check if all elements exist
  if (!phoneInput || !validationMessage || !whatsappButton) {
    console.error("Required elements not found");
    return;
  }

  // Validation messages
  const messages = {
    empty: "Please enter a phone number",
    invalid: "Please enter a valid 10-digit mobile number",
    invalidStart: "Indian mobile numbers must start with 6, 7, 8, or 9",
    tooShort: "Please enter complete 10 digits",
    tooLong: "Phone number cannot exceed 10 digits",
    valid: "Valid phone number!",
  };

  // Input validation handler
  phoneInput.addEventListener("input", function (e) {
    const number = e.target.value.trim();

    // Reset classes
    this.classList.remove("valid", "invalid");
    validationMessage.classList.remove("success", "error");
    validationMessage.classList.remove("hidden");

    // Enable/disable button
    whatsappButton.disabled = true;

    // Validate input
    if (!number) {
      showError(messages.empty);
      return;
    }

    // Check for non-numeric characters
    if (!/^\d*$/.test(number)) {
      e.target.value = number.replace(/\D/g, "");
      showError("Only numbers are allowed");
      return;
    }

    // Length validation
    if (number.length < MIN_LENGTH) {
      showError(messages.tooShort);
      return;
    }

    if (number.length > MIN_LENGTH) {
      showError(messages.tooLong);
      return;
    }

    // First digit validation
    if (!/^[6-9]/.test(number)) {
      showError(messages.invalidStart);
      return;
    }

    // Full number validation
    if (PHONE_REGEX.test(number)) {
      showSuccess();
      whatsappButton.disabled = false;
    } else {
      showError(messages.invalid);
    }
  });

  // Show error message
  function showError(message) {
    validationMessage.textContent = message;
    validationMessage.classList.remove("hidden", "success");
    validationMessage.classList.add("error", "message-animation");
    phoneInput.classList.add("invalid");
  }

  // Show success message
  function showSuccess() {
    validationMessage.textContent = messages.valid;
    validationMessage.classList.remove("hidden", "error");
    validationMessage.classList.add("success", "message-animation");
    phoneInput.classList.add("valid");
  }

  // WhatsApp button click handler
  whatsappButton.addEventListener("click", function () {
    const number = phoneInput.value.trim();
    if (PHONE_REGEX.test(number)) {
      const whatsappLink = `https://wa.me/91${number}`;
      console.log("Opening WhatsApp with link:", whatsappLink); // Debug log
      window.open(whatsappLink, "_blank");
    }
  });

  // Add copy button functionality
  if (copyLinkButton && generatedLinkInput) {
    copyLinkButton.addEventListener("click", function () {
      generatedLinkInput.select();
      document.execCommand("copy");

      // Show feedback
      this.textContent = "Copied!";
      setTimeout(() => {
        this.textContent = "Copy";
      }, 2000);
    });
  }
});
