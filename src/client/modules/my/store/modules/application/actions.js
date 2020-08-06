import { CONNECTIVITY_STATUS_CHANGED,USER_LOGEDIN,USER_LOGEDOUT,SET_SIGNED_URL,SET_FILE } from './constants';

export function connectivityStatusChanged() {
    return {
        type: CONNECTIVITY_STATUS_CHANGED,
        isOnline: navigator.onLine,
    };
}

export function userLoggedIn(userObj) {
    return {
        type: USER_LOGEDIN,
        user: userObj,
    };
}

export function userLoggedOut() {
    return {
        type: USER_LOGEDOUT
    };
}

export function setSignedUrl(urlObj) {
    return {
        type: SET_SIGNED_URL,
        urlObj:urlObj
    };
}

export function setFile(fileObj) {
    return {
        type: SET_FILE,
        fileObj:fileObj
    };
}