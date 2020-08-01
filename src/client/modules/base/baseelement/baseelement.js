import { LightningElement, api ,wire} from "lwc";
import { connectStore, store } from 'my/store';
export default class  BaseElement extends LightningElement{
   @api property;
   application;
    @wire(connectStore, { store })
    storeChange({ application }) {
        this.application = application;
    }

    constructor(){
        super();
    }
}