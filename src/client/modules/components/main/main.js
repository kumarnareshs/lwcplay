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
const compilerFiles = [{ "root": true, "id": "repl_js_output_example/helloWorld", "name": "repl_js_output_example/helloWorld.js", "content": "\n        import { createElement } from \"lwc\";\n        import Ctor from \"example/helloWorld\";\n        const element = createElement('repl-output', { is: Ctor });\n        document.body.appendChild(element);\n    " }, { "id": "example/helloWorld", "name": "example/helloWorld/helloWorld.js", "content": "import { LightningElement, api } from 'lwc';\n\nexport default class Example extends LightningElement {\n    @api name = 'Worsld!';\n}\n" }, { "id": "./helloWorld.html", "name": "example/helloWorld/helloWorld.html", "content": "<template>\n    Hello, {name}\n</template>" }, { "id": "./helloWorld.css", "name": "example/helloWorld/helloWorld.css", "content": "" }];


export default class Main extends LightningElement {
    @api property;
    files;
    fileTree = [{
        id: 1,
        name: 'lwc',
        children: [{
                id: 11,
                name: 'parent',
                children: [
                    {
                        name: 'parent.html',
                        id: 3,
                        selected: false,
                        content: `<template>
                    <example-todo-item item-name="Milk"></example-todo-item>
                    <example-todo-item item-name="Bread"></example-todo-item>
                  </template>`
                    },
                    {
                        
                        name: 'parent.js',
                        id: 4,
                        selected: false,
                        content: `import { LightningElement, api } from 'lwc';
                    export default class TodoApp extends LightningElement { }
                    `
                    },
                    {   name: 'parent.css', id: 2, selected: true, content: "" }
                    
                ]
            },
            {
                id: 5,
                 
                name: 'child',
                children: [
                    
                    {
                        
                        name: 'child.js',
                        id: 7,
                        selected: false,
                        content: `import { LightningElement, api } from 'lwc';
                 export default class TodoItem extends LightningElement {
                   @api itemName;
                 }`
                    },
                    {   name: 'child.css', id: 8, selected: false, content: "" },
                    {
                        
                        name: 'child.html',
                        id: 6,
                        selected: false,
                        content: `<template>
                <div>{itemName}</div>
              </template>`
                    }

                ]
            }
        ]
    }];


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