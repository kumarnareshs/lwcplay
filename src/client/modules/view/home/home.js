import { api, LightningElement } from "lwc";
import BaseElement from "base/baseelement";

export default class Home extends BaseElement {


    constructor() {
        super();
        
    }
    connectedCallback(){
        console.log(this.application);
    }
}