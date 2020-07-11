import {LightningElement,api}from 'lwc';
const PLAYGROUND_FILES = [
    {
      id: "repl_js_output_example/helloWorld",
      root: true,
      hidden: true,
      name: "repl_js_output_example/helloWorld.js",
      content:
        '\n        import { createElement } from "lwc";\n        import Ctor from "example/helloWorld";\n        const element = createElement(\'repl-output\', { is: Ctor });\n        document.body.appendChild(element);\n    ',
    },
    {
      id: "example/helloWorld",
      name: "example/helloWorld/helloWorld.js",
      content:
        "import { LightningElement, api } from 'lwc';\n\nexport default class Example extends LightningElement {\n    @api name = 'World!';\n}\n",
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
export default class Main extends LightningElement{
    @api property;
    files;
    constructor(){
        super();
        this.files = PLAYGROUND_FILES;
    }
    handlemyevent(){
      console.log('myevent');
    }
}