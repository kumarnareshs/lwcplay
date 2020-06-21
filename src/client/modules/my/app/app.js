/* eslint-disable no-restricted-globals */
import { LightningElement } from "lwc";
import Navigo from "navigo";
export default class App extends LightningElement {
  router = new Navigo(location.origin, false);
  view;
  constructor() {
    super();

    this.router.on({
      "/dp": async () => {
        const ViewPodcasts = await import("view/playground");
        console.log("ViewPodcasts" + ViewPodcasts);
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/compiler": async () => {
        const ViewPodcasts = await import("view/compiler");
        console.log("ViewPodcasts" + ViewPodcasts);
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
    });

    const navigateToDefault = () => {
      this.router.navigate("/compiler");
    };

    this.router.notFound(navigateToDefault);
    this.router.on(navigateToDefault);

    this.router.resolve();
  }
  setView(component, property = {}) {
    this.view = {
      component,
      property,
    };
  }
  async handleCompiler() {
    const ViewPodcasts = await import("view/compiler");
    this.setView(ViewPodcasts.default, { pass: "value" });
  }
}
