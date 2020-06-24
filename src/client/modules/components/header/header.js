import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api
    property;

    rendered = false;
    async renderedCallback() {
        if (!this.rendered) {

            this.rendered = true;
        }
    }
}