import '@lwc/synthetic-shadow';
import { createElement,register } from "lwc";
import MyApp from "my/app";
import { registerWireService } from '@lwc/wire-service';
registerWireService(register);
const app = createElement("my-app", { is: MyApp });
document.querySelector("#main").appendChild(app);
