import { LightningElement, api } from 'lwc';
import { normalizeFiles } from '../../helper/util';
import $ from "jquery";
//import 'jquery.fancytree/dist/skin-bootstrap/ui.fancytree.css';  // CSS or LESS
import { createTree } from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';

export default class Explorer extends LightningElement {
    @api property;

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
        if (this.isrendered) {
            return;
        }

        if (createTree) {

            const tree = createTree('.fancytree', {
                extensions: ['edit', 'filter'],
                source: [
                    { title: "Node 1", key: "1" },
                    {
                        title: "Folder 2", key: "2", folder: true, children: [
                            { title: "Node 2.1", key: "3", myOwnAttr: "abc" },
                            { title: "Node 2.2", key: "4" }
                        ]
                    }
                ],

            });
            this.isrendered = true;
        }
    }
}