function generateQRCode(link) {
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = ''; // Clear previous QR code

    const qrCode = new QRCode(qrCodeContainer, {
        text: link,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}

function handleQRCodeGeneration() {
    const phoneNumberInput = document.getElementById('phone-number');
    const countryCode = '+91'; // Default country code for India
    const phoneNumber = phoneNumberInput.value.trim();

    if (validatePhoneNumber(phoneNumber)) {
        const whatsappLink = `https://wa.me/${countryCode}${phoneNumber}`;
        generateQRCode(whatsappLink);
    } else {
        alert('Please enter a valid phone number.');
    }
}

// Event listener for QR code generation
document.getElementById('generate-qr').addEventListener('click', handleQRCodeGeneration);