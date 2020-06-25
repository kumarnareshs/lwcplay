/* eslint-disable no-restricted-globals */
import { LightningElement } from "lwc";
import Navigo from "navigo";
export default class App extends LightningElement {
  router = new Navigo(location.origin, false);
  view;
  constructor() {
    super();
    console.log('App is creating')
    this.router.on({
      "/dp": async () => {
        const ViewPodcasts = await import("view/playground");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/pagenotfound": async () => {
        const ViewPodcasts = await import("view/playground");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/compiler": async () => {
        const ViewPodcasts = await import("view/compiler");

        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/header": async () => {
        const ViewPodcasts = await import("components/header");

        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/login": async () => {
        const ViewPodcasts = await import("components/login");

        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/authcallback": async ({id}) => {
        const ViewPodcasts = await import("components/login");
        console.log(id);
        this.setView(ViewPodcasts.default, { pass: "value" });
      } 
    });

    const navigateToDefault = () => {
      this.router.navigate("/compiler");
    };
    const pagenotfound = () => {
      this.router.navigate("/pagenotfound");
    };
    this.router.notFound(pagenotfound);
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
