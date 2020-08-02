import { store, userLoggedOut } from 'my/store';
import * as CONSTANTS from 'helper/constant';
export function  logoutUser() {
        let url = CONSTANTS.BASE_URL + '/auth/logout';
        fetch(url, { credentials: 'include' })
            .then(response => { console.log(response); response.json() })
            .then(data => {
                console.log('Success:', data);
                store.dispatch(userLoggedOut());
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
