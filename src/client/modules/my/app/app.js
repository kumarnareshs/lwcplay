/* eslint-disable no-restricted-globals */
import { LightningElement,wire } from "lwc";
import Navigo from "navigo";
import { connectStore, store } from 'my/store';

export default class App extends LightningElement {
  router = new Navigo(location.origin, false);
  view;
  @wire(connectStore, { store })
  storeChange({application}) {
     console.log(application);
     this.renderCommonPath();
     if(application.user.type==='guest'){
      this.renderUserpath();
     }else{
      this.renderUserpath();
     }
    
     
  }
  constructor() {
    super();
  }
  renderGuestpath(){
    this.router.on({
      "/pagenotfound": async () => {
        const ViewPodcasts = await import("view/pagenotfound");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/login": async () => {
        const ViewPodcasts = await import("components/login");

        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/home": async () => {
        const ViewPodcasts = await import("view/home");

        this.setView(ViewPodcasts.default, { pass: "value" });
      }
    });

    const navigateToDefault = () => {
      this.router.navigate("/home");
    };
    
    this.router.on(navigateToDefault);

    this.router.resolve();

  }
  renderUserpath(){
    console.log('App is creating')
    this.router.on({
      "/pagenotfound": async () => {
        const ViewPodcasts = await import("view/pagenotfound");
        this.setView(ViewPodcasts.default, { pass: "value" });
      },
      "/login": async () => {
        const ViewPodcasts = await import("components/login");

        this.setView(ViewPodcasts.default, { pass: "value" });
      }, 
      "/main": async () => {
        const ViewPodcasts = await import("components/main");

        this.setView(ViewPodcasts.default, { pass: "value" });
      }, 
      "/home": async () => {
        const ViewPodcasts = await import("view/home");
       
        this.setView(ViewPodcasts.default, { pass: "value" });
      }, 
      "/authcallback": async () => {
        const ViewPodcasts = await import("view/auth");
       
        this.setView(ViewPodcasts.default, { pass: "value" });
      }
    });
    const navigateToDefault = () => {
      console.log('/')
      this.router.navigate("/home");
    };
    
    this.router.on(navigateToDefault);

    this.router.resolve();

    console.log('Constrector end');
  }

  renderCommonPath(){
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
