import { LightningElement, api } from 'lwc';
import { normalizeFiles } from '../../helper/util';
import $ from "jquery";
import 'jquery.fancytree/dist/skin-bootstrap/ui.fancytree.css';  // CSS or LESS
import { createTree } from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';

export default class Explorer extends LightningElement {
    @api property;
    prop = [
        {
            type: 'file', name: 'index.js',id:"1"
        },
        {
            id:"2", type: 'folder', name: 'lib', children: [
                { type: 'file', name: 'utils.js', id:"3" }
            ]
        },
        {
            type: 'folder', name: 'lib',id:"4"
        },
        { type: 'file', name: 'main.js',id:"5" }
    ];
    $ = $;
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
        let tree = this.template.querySelector(".fancytree");

        if (tree && $) {

            $(function () {
                const fancytree = require('jquery.fancytree');
                $('#tree-7').fancytree({

                    source: [
                        { title: "Node 1", key: "1" },
                        {
                            title: "Folder 2", key: "2", folder: true, children: [
                                { title: "Node 2.1", key: "3" },
                                { title: "Node 2.2", key: "4" }
                            ]
                        }
                    ],

                });
            });
            const tree = createTree('.tree', {

                source: [
                    { title: "Node 1", key: "1" },
                    {
                        title: "Folder 2", key: "2", folder: true, children: [
                            { title: "Node 2.1", key: "3" },
                            { title: "Node 2.2", key: "4" }
                        ]
                    }
                ]
            });
            $(".tree").fancytree();
            // console.log(createTree.getTree('#tree'));
            this.isrendered = true;
        }
    }
}