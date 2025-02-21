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
  const PHONE_REGEX = {
    91: /^[6-9]\d{9}$/, // India
    1: /^\d{10}$/, // US/Canada
    44: /^\d{10}$/, // UK
    61: /^\d{9}$/, // Australia
    86: /^\d{11}$/, // China
    81: /^\d{10}$/, // Japan
    49: /^\d{11}$/, // Germany
    33: /^\d{9}$/, // France
    7: /^\d{10}$/, // Russia
    65: /^\d{8}$/, // Singapore
    971: /^\d{9}$/, // UAE
  };

  // DOM Elements
  const countryCode = document.getElementById("country-code");
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
    invalid: "Please enter a valid phone number for the selected country",
    valid: "Valid phone number!",
  };

  // Input validation handler
  phoneInput.addEventListener("input", function (e) {
    const number = e.target.value.trim();
    const selectedCountry = countryCode.value;

    // Reset classes
    this.classList.remove("valid", "invalid");
    validationMessage.classList.remove("success", "error", "hidden");
    whatsappButton.disabled = true;

    // Validate input
    if (!number) {
      showError(messages.empty);
      return;
    }

    // Check for non-numeric characters
    if (!/^\d*$/.test(number)) {
      e.target.value = number.replace(/\D/g, "");
      return;
    }

    // Validate against country-specific regex
    if (PHONE_REGEX[selectedCountry].test(number)) {
      showSuccess();
      whatsappButton.disabled = false;
    } else {
      showError(messages.invalid);
    }
  });

  // Country code change handler
  countryCode.addEventListener("change", function () {
    // Revalidate number when country changes
    phoneInput.dispatchEvent(new Event("input"));
  });

  // WhatsApp button click handler
  whatsappButton.addEventListener("click", function () {
    const number = phoneInput.value.trim();
    const selectedCountry = countryCode.value;
    if (PHONE_REGEX[selectedCountry].test(number)) {
      const whatsappLink = `https://wa.me/${selectedCountry}${number}`;
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

  // Helper functions
  function showError(message) {
    validationMessage.textContent = message;
    validationMessage.classList.remove("hidden", "success");
    validationMessage.classList.add("error");
    phoneInput.classList.add("invalid");
  }

  function showSuccess() {
    validationMessage.textContent = messages.valid;
    validationMessage.classList.remove("hidden", "error");
    validationMessage.classList.add("success");
    phoneInput.classList.add("valid");
  }
});
