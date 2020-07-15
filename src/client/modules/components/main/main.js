import { LightningElement, api } from 'lwc';
import {
    registerListener,
    unregisterAllListeners,
    fireEvent
} from "../../helper/pubsub/pubsub";
import * as CONSTANTS from '../../helper/constant/constant';
import { changeProps, returnFound } from 'find-and';
const PLAYGROUND_FILES = [{
        id: "repl_js_output_example/helloWorld",
        root: true,
        hidden: true,
        name: "repl_js_output_example/helloWorld.js",
        content: '\n        import { createElement } from "lwc";\n        import Ctor from "example/helloWorld";\n        const element = createElement(\'repl-output\', { is: Ctor });\n        document.body.appendChild(element);\n    ',
    },
    {
        id: "example/helloWorld",
        name: "example/helloWorld/helloWorld.js",
        content: "import { LightningElement, api } from 'lwc';\n\nexport default class Example extends LightningElement {\n    @api name = 'World!';\n}\n",
    },
    {
        id: "./helloWorld.html",
        name: "example/helloWorld/helloWorld.html",
        content: "<template>\n    Hello, {name}\n</template>",
    },
    {
        id: "./helloWorld.css",
        name: "example/helloWorld/helloWorld.css",
        content: "",
    },
];


export default class Main extends LightningElement {
    @api property;
    files;
    // fileTree = [{
    //         id: 1,
    //         type: 'folder',
    //         name: 'parent',
    //         children: [
    //             { type: 'file', name: 'parent.css', id: 2, selected: true, content: "" },
    //             {
    //                 type: 'file',
    //                 name: 'parent.html',
    //                 id: 3,
    //                 selected: false,
    //                 content: `<template>
    //                 <example-todo-item item-name="Milk"></example-todo-item>
    //                 <example-todo-item item-name="Bread"></example-todo-item>
    //               </template>`
    //             },
    //             {
    //                 type: 'file',
    //                 name: 'parent.js',
    //                 id: 4,
    //                 selected: false,
    //                 content: `import { LightningElement, api } from 'lwc';
    //                 export default class TodoApp extends LightningElement { }
    //                 `
    //             }
    //         ]
    //     },
    //     {
    //         id: 5,
    //         type: 'folder',
    //         name: 'child',
    //         children: [
    //             { type: 'file', name: 'child.css', id: 8, selected: false, content: "" },
    //             {
    //                 type: 'file',
    //                 name: 'child.html',
    //                 id: 6,
    //                 selected: false,
    //                 content: `<template>
    //             <div>{itemName}</div>
    //           </template>`
    //             },
    //             {
    //                 type: 'file',
    //                 name: 'child.js',
    //                 id: 7,
    //                 selected: false,
    //                 content: `import { LightningElement, api } from 'lwc';
    //              export default class TodoItem extends LightningElement {
    //                @api itemName;
    //              }`
    //             },

    //         ]
    //     }
    // ];

    fileTree = [{ "id": 1, "type": "folder", "name": "parent", "children": [{ "type": "file", "name": "parent.css", "id": 2, "selected": false, "content": "h1 {\n    color: rgb(0, 112, 210);\n}\np {\n    font-family: 'Salesforce Sans', Arial, sans-serif;\n    color: rgb(62, 62, 60);\n}\n.app {\n    background-color: #fafaf9;\n    height: 100vh;\n    overflow: scroll;\n}\n" }, { "type": "file", "name": "parent.html", "id": 3, "selected": false, "content": "<template>\n    <div class=\"app slds-p-around_x-large\">\n        <h1 class=\"slds-text-heading_large\">{title}</h1>\n        <h3> Write JavaScript, HTML, and CSS code, and preview the output in the interactive code editor.</h3>\n        \n        <!-- Using an if statement -->\n        <template if:true={showFeatures}>\n            <div class=\"slds-p-top_large\">\n                <h2 class=\"slds-text-heading_medium\">Features</h2>\n\n                <!-- Using a for statement -->\n                <template for:each={features} for:item='feature'>\n                    <c-child label={feature.label} key={feature.label}>\n                        \n                        <!-- Specifying the 'icon' slot for c-child -->\n                        <lightning-icon icon-name={feature.icon} size=\"x-small\" slot=\"icon\"></lightning-icon>\n                    </c-child>\n                </template>\n            </div>\n        </template>\n\n        <h2 class=\"slds-text-heading_medium slds-p-top_large\">\n            Considerations\n        </h2>\n        <ul class=\"slds-list_dotted\">\n            <li class=\"slds-m-horizontal_xx-small slds-m-bottom_x-small\">All playgrounds have a publicly accessible URL.</li>\n            <li class=\"slds-m-horizontal_xx-small slds-m-bottom_x-small\">When you save a new playground, bookmark the URL or save it elsewhere so you can access it later.</li>\n            <li class=\"slds-m-horizontal_xx-small slds-m-bottom_x-small\">You can't delete a playground.</li>\n        </ul>\n\n        <h2 class=\"slds-text-heading_medium slds-p-top_large\">Resources</h2>\n        <a href=\"https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.install_playground\">\n            Playground in the Lightning Web Components Developer Guide\n        </a><br/>\n\n    </div>\n</template>\n" }, { "type": "file", "name": "parent.js", "id": 4, "selected": false, "content": "import { LightningElement, track } from 'lwc';\n\nexport default class App extends LightningElement {\n    /**\n     * @track indicates that if this object changes,\n     * the UI should update to reflect those changes.\n     */\n    @track\n    title = 'Welcome to Lightning Web Components Playground!';\n\n    @track\n    showFeatures = true;\n\n    /**\n     * Getter for the features property\n     */\n    get features() {\n        return [\n            {\n                label: 'Edit the name and description of your component.',\n                icon: 'utility:edit',\n            },\n            {\n                label:\n                    'Create permanent, shareable URLs that anyone can view within your org.',\n                icon: 'utility:save',\n            },\n            {\n                label: 'View changes to code instantly with Live Compilation.',\n                icon: 'utility:refresh',\n            },\n            {\n                label: 'Style your components with SLDS.',\n                icon: 'utility:brush',\n            },\n            {\n                label: 'Download and upload components as zip files.',\n                icon: 'utility:download',\n            },\n        ];\n    }\n}\n\n" }] }, { "id": 5, "type": "folder", "name": "child", "children": [{ "type": "file", "name": "child.css", "id": 8, "selected": false, "content": "" }, { "type": "file", "name": "child.html", "id": 6, "selected": false, "content": "<template>\n    <div class=\"slds-m-horizontal_xx-small slds-m-bottom_x-small\">\n        <slot name=\"icon\"></slot> <span class=\"slds-p-left_small\">{label}</span>\n    </div>\n</template>\n" }, { "type": "file", "name": "child.js", "id": 7, "selected": true, "content": "import { LightningElement, api } from 'lwc';\n\n/**\n * Show an item\n */\nexport default class Child extends LightningElement {\n    @api\n    label = '';\n}\n\n" }] }]
    constructor() {
        super();
        this.files = PLAYGROUND_FILES;
    }
    connectedCallback() {
        registerListener("fileChanged", this.handleFileChanged, this);
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    handleFileChanged(eve) {
        let data = eve.detail;
        if (data && data.content && data.fileId) {
            this.fileTree = changeProps(this.fileTree, { id: data.fileId }, { content: data.content });
        }
    }

    handleFileClick(eve) {
        let selectedId = eve.detail;

        if (selectedId) {
            this.selectId(selectedId);
        }

    }

    selectId(selectedId) {

        this.fileTree = JSON.parse(JSON.stringify(this.fileTree));
        this.fileTree = changeProps(this.fileTree, { selected: true }, { selected: false });
        this.fileTree = changeProps(this.fileTree, { id: selectedId }, { selected: true });
        let file = returnFound(this.fileTree, { id: selectedId });
        fireEvent(null, 'fileSelected', { detail: file });
    }

    async handleSaveFiles() {
        // const { getURL, putURL  } =
        this.getSignedURL();
        // this.putDataTos3(putURL, this.fileTree);
    }

    getSignedURL() {


        //check in cokkie 
        let url = CONSTANTS.BASE_URL + '/s3/getsignedurl';
        fetch(url)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                if (data) {

                    this.putDataTos3(data.putURL, this.fileTree);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    putDataTos3(url, file) {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ "file": file }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            response => response.text()
        ).then(data => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}