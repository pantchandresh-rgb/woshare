import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const auth = getAuth();

// Initialize the Invisible Recaptcha
export function initRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
    });
}

// Start Phone Verification
export async function sendOTP(phoneNumber) {
    const appVerifier = window.recaptchaVerifier;
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
        return { success: true };
    } catch (error) {
        console.error("SMS Match Error:", error);
        return { success: false, error };
    }
}

// Verify the OTP Code
export async function verifyOTP(code) {
    try {
        const result = await window.confirmationResult.confirm(code);
        const user = result.user;
        console.log("User logged in:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Invalid OTP:", error);
        return { success: false, error };
    }
}