import {LightningElement,api} from 'lwc';
export default class TreeNode extends LightningElement{

    @api prop;
    get showTree(){

        return this.prop!=undefined ||this.prop!=null;
    }
    handleFileClick(){
        console.log('s');
    }
}