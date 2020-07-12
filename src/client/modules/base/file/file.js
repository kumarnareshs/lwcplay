import { LightningElement, api } from 'lwc';
export default class File extends LightningElement {
    @api fileTree;

    get isHtml() {
        if (this.fileTree == null || this.fileTree.name == null || typeof this.fileTree.name != 'string')
            return false;
        return this.fileTree.name.split('.').reverse()[0] == 'html';
    }
    get isCss() {
        if (this.fileTree == null || this.fileTree.name == null || typeof this.fileTree.name != 'string')
            return false;
        return this.fileTree.name.split('.').reverse()[0] == 'css';
    }
    get isJs() {
        if (this.fileTree == null || this.fileTree.name == null || typeof this.fileTree.name != 'string')
            return false;
        return this.fileTree.name.split('.').reverse()[0] == 'js';
    }
    get className() {
        if (this.fileTree == null || this.fileTree.selected == null)
            return '';
        return this.fileTree.selected == true ? 'filenode selected' : 'filenode';
    }
    handleMyclick() {
        this.dispatchEvent(new CustomEvent('fileclick',
            {
                bubbles: true, composed: true,
                detail: this.fileTree.id
            }));
    }
}