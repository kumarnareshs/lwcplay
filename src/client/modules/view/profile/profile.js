import BaseElement from "base/baseelement";
import { store, userLoggedOut } from 'my/store';
import * as CONSTANTS from 'helper/constant';
import{logoutUser} from 'base/functions'

export default class Profile extends BaseElement {

    logout(){
        logoutUser();
        
    }

    connectedCallback(){
        this.getTemplates();
    }
    getTemplates(){
        let url = CONSTANTS.BASE_URL + '/s3/template';
        fetch(url,{credentials: 'include'})
            .then(response => { console.log(response); response.json() })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }    
    
}