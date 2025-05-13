import Cookies from "universal-cookie";
import { toast } from "wc-toast"

const TOAST = toast
const COOKIES = new Cookies()
const USER_INFO_COOKIE = COOKIES.get("user_info")
const EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
const USER_OPERATOR_INFO = JSON.parse(window.localStorage.getItem("afri_selected_operator"))

const LOCALSTORAGE = {
    email: window.localStorage.getItem("afri_email"),
    username: window.localStorage.getItem("afri_username"),
    mobileNumber: window.localStorage.getItem("afri_mobile_number"),
    selectedOperator: window.localStorage.getItem("afri_selected_operator"),
}

const LOG_MESSAGES = {
    login: "User logged in",
    logout: "User logged out",
    playMovie: "User played movie",
    playSeries: "User played series",
    visitLandingGlobal: "User visited global instance",
    visitLandingGH: 'User visited Ghana instance',
    visitLandingNG: 'User visited Nigeria instance',
    search: "User searched for content",
    quit: "User closed web client",
}

const ERROR_MESSAGES = {
    AUTH: {
        wrongOTP: 'Invalid OTP code',
        invalidMobileNumber: 'Invalid Mobile Number',
        invalidEmail: 'Invalid Mobile Number',
        invalidPassword: 'Your password should be a minimum of 7 characters',
        passwordMismatch: 'Passwords do not match',
        invalidLogin: 'Invalid login credentials',
        invalidAccount: 'Invalid user account. Try again or contact support',
        validationFailed: "Validation failed. Please check your inputs",
        resetFailed: "Password reset failed. Please try again.",
        resetSuccess: "Password reset successful! You can now login."
    },
    VERIFICATION: {
        invalidNetwork: 'Please continue with a valid network',
    },
    SUBSCRIPTION: {
        subscriptionFailed: 'Subscription was unsuccessful',
        subscriptionCancel: 'Failed to cancel subscription',

    },
    errorOccured: 'An error occured. Try again',

}

export { COOKIES, LOG_MESSAGES, TOAST, EMAIL_REGEXP, ERROR_MESSAGES, USER_INFO_COOKIE, LOCALSTORAGE, USER_OPERATOR_INFO }