import { CONNECTIVITY_STATUS_CHANGED,USER_LOGEDIN,USER_LOGEDOUT } from './constants';

export function connectivityStatusChanged() {
    return {
        type: CONNECTIVITY_STATUS_CHANGED,
        isOnline: navigator.onLine,
    };
}

export function userLoggedIn(userid) {
    return {
        type: USER_LOGEDIN,
        userid: userid,
    };
}

export function userLoggedOut() {
    return {
        type: USER_LOGEDOUT
    };
}