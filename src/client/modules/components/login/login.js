import { LightningElement, api } from 'lwc';
import { toQuery } from '../../helper/slds/util';
import * as CONSTANTS from '../../helper/constant/constant';
import PopupWindow from './PopupWindow'
export default class Login extends LightningElement {
    @api property;
    code;
    props = {
        client_id: '6e2a9fedf66ea4fc3a5e',
        client_secret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
        redirect_uri: 'http://localhost:3000/authcallback',
        scope: 'user'
    }
    popup;
    handleLogin(evt) {

        const { client_id, scope, redirect_uri } = this.props;
        const search = toQuery({
            client_id: client_id,
            scope,
            redirect_uri: redirect_uri,
        });
        this.popup = PopupWindow.open(
            '_blank',
            `https://github.com/login/oauth/authorize?${search}`,
            { height: 1000, width: 600 }
        );
        this.popup.then(
            data => this.onSuccess(data),
            error => this.onFailure(error)
        );
    }
    onSuccess = (data) => {
        if (!data.code) {
            return this.onFailure(new Error('\'code\' not found'));
        }
        this.popup.close();
        this.handleGetToken(data.code);
    }


    onFailure = (error) => {
        this.popup.close();
        this.props.onFailure(error);
    }
    handleGetToken(code) {
     

        let url = CONSTANTS.BASE_URL + '/auth/login?code=' + code;
        fetch(url,{credentials: 'include'})
            .then(response => { console.log(response); response.json() })
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleUsername(){
        let url = CONSTANTS.BASE_URL + '/user/profile';
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