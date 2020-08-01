import { CONNECTIVITY_STATUS_CHANGED,USER_LOGEDIN,USER_LOGEDOUT } from './constants';
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
                user: { type: 'authenticated-user', userid: action.userid }
            };
        case USER_LOGEDOUT:
            return {
                ...state,
                user: { type: 'guest' }
            };
        default:
            return state;
    }
}