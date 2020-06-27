import { LightningElement, api } from 'lwc';
import { toQuery } from '../../helper/slds/util';
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
        this.code = data.code;
    }


    onFailure = (error) => {
        this.popup.close();
        this.props.onFailure(error);
    }
    handleGetToken(evt) {
        // POST request using fetch with error handling
        const { client_id, client_secret, scope, redirect_uri } = this.props;
        const search = toQuery({
            client_id: client_id,
            client_secret: client_secret,
            // scope,
            //   redirect_uri: redirect_uri,
            code: this.code,

        });


        const requestOptions = {
            method: 'POST',
            headers: {
                
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },
            mode: 'no-cors'
        };
        let url = `https://github.com/login/oauth/access_token?${search}`;

        fetch(url, requestOptions)
            .then(response => { console.log(response);response.json()})
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}