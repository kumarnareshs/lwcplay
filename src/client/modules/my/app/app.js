/* eslint-disable no-restricted-globals */
import { LightningElement } from 'lwc';
import Navigo from 'navigo';
export default class App extends LightningElement {
    router = new Navigo(location.origin, false);
    constructor() {
        super();


        this.router.on({
            '/playground': async () => {
                const { default: ViewPodcasts } = await import('view/playground');
                this.setView(ViewPodcasts);
             },
            // '/playground/:id': async ({ id }) => {
            //     const { default: ViewPodcast } = await import('view/podcast');
            //     this.setView(ViewPodcast, {
            //         podcastId: parseInt(id, 10),
            //     });
            // },
            // '/settings': async () => {
            //     const { default: ViewSettings } = await import('view/settings');
            //     this.setView(ViewSettings);
            // }
        });

        const navigateToDefault = () => {
            this.router.navigate('/playground');
        };

        this.router.notFound(navigateToDefault);
        this.router.on(navigateToDefault);

        this.router.resolve();
    }
    setView(component, props = {}) {
        this.view = {
            component,
            props,
        };
    }
}
