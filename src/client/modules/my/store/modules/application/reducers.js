import { CONNECTIVITY_STATUS_CHANGED,USER_LOGEDIN,USER_LOGEDOUT,SET_SIGNED_URL,SET_FILE } from './constants';
const initialState = {
    isOnline: navigator.onLine,
    user: { type: 'guest' }
}

export default function application(
    state = initialState,
    action,
) {
    switch (action.type) {
        case CONNECTIVITY_STATUS_CHANGED:
            return {
                ...state,
                isOnline: action.isOnline,
            };
        case USER_LOGEDIN:
            return {
                ...state,
                user: { type: 'authenticated-user', user: action.user }
            };
        case USER_LOGEDOUT:
            return {
                ...state,
                user: { type: 'guest' }
            };
            case SET_SIGNED_URL:
            return {
                ...state,
                signedurl: action.urlObj
            };
            case SET_FILE:
            return {
                ...state,
                file: action.fileObj
            };
        default:
            return state;
    }
}