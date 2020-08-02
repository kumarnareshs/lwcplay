import { LightningElement, api } from 'lwc';
import { toQuery } from '../../helper/slds/util';
import * as CONSTANTS from '../../helper/constant/constant';
import PopupWindow from './PopupWindow';
import BaseElement from 'base/baseelement';
import {  userLoggedIn,store } from 'my/store';
import config from '../config.js'


export default class Login extends BaseElement {
     
    code;
    props = config.github;
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
       // this.props.onFailure(error);
    }
    handleGetToken(code) {
     
        let url = CONSTANTS.BASE_URL + '/auth/login?code=' + code;
        fetch(url,{credentials: 'include'})
            .then(response => { console.log(response); return response.json(); })
            .then(data => {
                console.log('Success:', data);
                store.dispatch(userLoggedIn(data.user));
           
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