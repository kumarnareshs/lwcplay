import {LightningElement,api} from 'lwc';
export default class TreeNode extends LightningElement{

    @api fileTree;
    get showTree(){

        return this.fileTree!=undefined ||this.fileTree!=null;
    }
    handleFileClick(){
        console.log('s');
    }
}