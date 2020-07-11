import { LightningElement, api } from 'lwc';
export default class File extends LightningElement {
    @api prop;

    get isHtml() {
        if (this.prop == null || this.prop.name == null || typeof this.prop.name != 'string')
            return false;
        return this.prop.name.split('.').reverse()[0] == 'html';
    }
    get isCss() {
        if (this.prop == null || this.prop.name == null || typeof this.prop.name != 'string')
            return false;
        return this.prop.name.split('.').reverse()[0] == 'css';
    }
    get isJs() {
        if (this.prop == null || this.prop.name == null || typeof this.prop.name != 'string')
            return false;
        return this.prop.name.split('.').reverse()[0] == 'js';
    }
    get className() {
        if (this.prop == null || this.prop.selected == null)
            return '';
        return this.prop.selected == true ? 'filenode selected' : 'filenode';
    }
    handleMyclick() {
        this.dispatchEvent(new CustomEvent('fileclick',
            {
                bubbles: true, composed: true,
                detail: this.prop.id
            }));
    }
}