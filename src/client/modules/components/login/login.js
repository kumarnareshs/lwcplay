import { LightningElement, api } from 'lwc';
import { toQuery } from '../../helper/slds/util';
import PopupWindow from './PopupWindow'
export default class Login extends LightningElement {
    @api property;

    props = {
        clientId: '6e2a9fedf66ea4fc3a5e',
        clientSecret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
        callbackURL: 'http://127.0.0.1:3000/authcallback',
        scope: 'user'
    }
    popup;
    handleLogin(evt) {

        const { clientId, scope, callbackURL } = this.props;
        const search = toQuery({
            client_id: clientId,
            scope,
            redirect_uri: callbackURL,
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
        this.props.onSuccess(data);
    }


    onFailure = (error) => {
        this.popup.close();
        this.props.onFailure(error);
    }
}