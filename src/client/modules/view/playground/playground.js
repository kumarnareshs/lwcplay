/* eslint-disable no-self-assign */
import { LightningElement, api } from "lwc";
// import CodeMirror from 'codemirror';
// import 'codemirror/mode/javascript/javascript.js';
export default class Playground extends LightningElement {
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
  // renderedCallback(){
  //     if(this.isEditorCreated===false)
  //     {
  //         let container = this.template.querySelector(".editor-container");
  //         if(container){
  //             this.createEditor(container);
  //           this.isEditorCreated=true;
  //         }
  //     }
  // }
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

  disconnectedCallback() {
    // if(this.editor){
    //     this.editor.delete();
    // }
  }

  // createEditor(container){
  //       CodeMirror(container, {
  //         value: "function myScript() {\n    return 100;\n}",
  //         mode: "javascript",
  //         indentUnit: 4,
  //         lineNumbers: true
  //     });
  // }

  createEditor(container) {
    var programmaticIframe = document.createElement("iframe");
    programmaticIframe.id = "programmaticIframe";
    programmaticIframe.src = "inner.html";
    // trigger its loading & take it off dom
    container.appendChild(programmaticIframe);
  }
}
