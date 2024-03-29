/* eslint-disable no-restricted-globals */
import { LightningElement, wire } from "lwc";
import Navigo from "navigo";
import { connectStore, store } from 'my/store';
import {getQueryVariable} from '../../helper/util';
export default class App extends LightningElement {
  router = new Navigo(location.origin, false);
  view;
  @wire(connectStore, { store })
  storeChange({ application }) {
    console.log(application);
    this.renderCommonPath();
    if (application.user.type === 'authenticated-user') {
      this.renderUserpath();
    } else {
      this.renderGuestpath();
    }
  }

  renderGuestpath() {
    const navigateToDefault = () => {
      this.router.navigate("/home");
    };

    this.router.on(navigateToDefault);

    this.router.resolve();

  }
  renderUserpath() {
    console.log('App is creating')
    this.router.on({
      "/s": async (params, query) => {
        const ViewPodcasts = await import("components/main");
        let username =getQueryVariable(query,"username");
        let workspace =getQueryVariable(query,"workspace");
        this.setView(ViewPodcasts.default, { username:username,workspace:workspace });
      },
      "/profile": async () => {
        const ViewPodcasts = await import("view/profile");
        this.setView(ViewPodcasts.default, { pass: "value" });
      }
    });
    const navigateToDefault = () => {
      this.router.navigate("/home");
    };
    this.router.on(navigateToDefault);
    this.router.resolve();
    console.log('Constrector end');
  }

  renderCommonPath() {
    this.router.on({
      "/pagenotfound": async () => {
        const ViewPodcasts = await import("view/pagenotfound");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/home": async () => {
        const ViewPodcasts = await import("view/home");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/authcallback": async () => {
        const ViewPodcasts = await import("view/auth");
        this.setView(ViewPodcasts.default, { pass: "value" });
      }, "/s": async (params, query) => {
        const ViewPodcasts = await import("components/main");
        let username =getQueryVariable(query,"username");
        let workspace =getQueryVariable(query,"workspace");
        this.setView(ViewPodcasts.default, { username:'username',workspace:'workspace' });
      },
    });

    const pagenotfound = () => {
      this.router.navigate("/pagenotfound");
    };
    this.router.notFound(pagenotfound);
  }

  setView(component, property = {}) {
    this.view = {
      component,
      property,
    };
  }

}
