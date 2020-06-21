import { LightningElement, api } from "lwc";
import { PromiseWorker, createIframe, removeIframe } from "./util";

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
export default class Compiler extends LightningElement {
  @api property;
  frame;
  _internalFileState;
  compilerWorker;
  compilerReady = false;
  connectedCallback() {
    this.loadCompiler();
  }
  constructor() {
    super();
    this.files = PLAYGROUND_FILES;
  }

  WORKER_CALLBACK_QUEUE = [];
  SHARED_WORKER;
  loadSharedWorker(fn) {
    let SHARED_WORKER = this.SHARED_WORKER;
    let WORKER_CALLBACK_QUEUE = this.WORKER_CALLBACK_QUEUE;
    if (SHARED_WORKER) {
      return fn(SHARED_WORKER);
    }
    if (WORKER_CALLBACK_QUEUE.length === 0) {
      const worker = new Worker("/resources/compiler_worker_v111.js");
      const promiseWorker = new PromiseWorker(worker);
      promiseWorker
        .postMessage({
          operation: "ping",
        })
        .then(() => {
          SHARED_WORKER = promiseWorker;
          WORKER_CALLBACK_QUEUE.forEach((f) => {
            f(SHARED_WORKER);
          });
          WORKER_CALLBACK_QUEUE.length = 0;
        });
    }
    WORKER_CALLBACK_QUEUE.push(fn);
    this.SHARED_WORKER = SHARED_WORKER;
    this.WORKER_CALLBACK_QUEUE = WORKER_CALLBACK_QUEUE;
  }

  async loadCompiler() {
    this.loadSharedWorker((promiseWorker) => {
      this.compilerWorker = promiseWorker;
      this.compilerReady = true;
      if (this.files) {
        this.compileAndRun();
      }
    });
  }
  handleCompile() {
    this.compileAndRun();
  }

  get files() {
    return this._internalFileState;
  }
  set files(files) {
    this._internalFileState = this.normalizeFiles(files);
  }

  async compileAndRun() {
    if (!this.compilerReady) {
      return;
    }

    const virtualFileSystem = this.createVirtualFileSystem(this.files);
    const root = virtualFileSystem.find((f) => f.root);
    const options = {
      input: root.id,
      virtualFileSystem,
    };
    const operationPayload = {
      operation: "compile",
      options,
    };

    try {
      const code = await this.compilerWorker.postMessage(operationPayload);
      this.compilerWorker.onmessage = function (e) {
        result.textContent = e.data;
        console.log("Message received from worker" + e.data);
      };
      this.evaluate(code);
      console.log(code);
    } catch (e) {
      console.log(e);
    }
  }

  createVirtualFileSystem(files) {
    return files.reduce((files, { id, root, name, content }) => {
      files.push({
        root,
        id,
        name,
        content,
      });
      return files;
    }, []);
  }

  normalizeFiles(files) {
    return files.map((file) =>
      this.objectSpread({}, file, {
        ext: file.name.split(".").pop(),
      })
    );
  }
  objectSpread(target) {
    let thisInstance = this;
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          })
        );
      }
      ownKeys.forEach(function (key) {
        thisInstance.defineProperty(target, key, source[key]);
      });
    }
    return target;
  }

  defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  evaluate(code) {
    const frame = this.template.querySelector(".preview");
    removeIframe(frame);
    createIframe(frame, {
      code,
    });
  }
}