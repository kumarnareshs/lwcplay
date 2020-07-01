import {LightningElement,api}from 'lwc';

export default class Editor extends LightningElement{
    
 
  _prop;
  @api
  set property(value) {
    console.log(value);
    this._prop = value;
  }

  get property() {
    if (this._prop) return this._prop;
    return null;
  }
  isEditorCreated = false;
  editor;
  theIframe;

  get fullUrl() {
    return `resources/inner.html`;
  }

  isReloaded = false;

  renderedCallback() {
    console.log("rendred callback called" + this.theIframe);
    if (this.theIframe === undefined) {
      this.theIframe = this.template.querySelector("iframe");
      this.theIframe.onload = () => {
        console.log("Onload called" + this.isReloaded);
        if (!this.isReloaded) {
          this.isReloaded = true;
          this.theIframe.src = this.theIframe.src;
        }
      };
    }
  }

 

}
