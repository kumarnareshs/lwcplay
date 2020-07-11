import { LightningElement, api } from 'lwc';
import { normalizeFiles } from '../../helper/util';
import {changeProps} from 'find-and';
export default class Explorer extends LightningElement {
    @api property;
    prop = [
        {
            id:1, type: 'folder', name: 'parent', children: [
                { type: 'file', name: 'parent.css', id:2,selected:true },
                { type: 'file', name: 'parent.html', id:3,selected:false },
                { type: 'file', name: 'parent.js', id:4,selected:false }
            ]
        },
        {
            id:5, type: 'folder', name: 'child', children: [
                { type: 'file', name: 'child.css', id:8,selected:false },
                { type: 'file', name: 'child.html', id:6,selected:false },
                { type: 'file', name: 'child.js', id:7,selected:false },
                
            ]
        } 
    ];
  
    _internalFileState;
    get files() {
        return this._internalFileState;
    }
    @api
    set files(files) {
        this._internalFileState = normalizeFiles(files);
        this.prepareFileTree();
    }

    connected
    prepareFileTree(files) {

    }
    isrendered = false;
    renderedCallback() {
        
    }

    handleFileClick(eve){
        let selectedId = eve.detail;

        if(selectedId){
            this.selectId(selectedId);
        }

    }

    selectId(selectedId){

        this.prop = JSON.parse(JSON.stringify(this.prop));
        this.prop =changeProps(this.prop,{selected:true},{selected:false});
        this.prop =changeProps(this.prop,{id:selectedId},{selected:true});
        console.log(this.prop);
    }
    
}