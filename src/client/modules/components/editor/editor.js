import { LightningElement, api } from "lwc";
import {
    registerListener,
    unregisterAllListeners,
    fireEvent
} from "../../helper/pubsub/pubsub";
import { changeProps, returnFound } from 'find-and';
export default class Editor extends LightningElement {
    @api
    fileTree;


    isEditorCreated = false;
    editor;
    theIframe;

    get fullUrl() {
        return `resources/inner.html`;
    }

    isReloaded = false;
    connectedCallback() {
        registerListener("fileSelected", this.handleFileSelected, this);
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    renderedCallback() {
            console.log("rendred callback called" + this.theIframe);
            if (this.theIframe === undefined) {
                this.theIframe = this.template.querySelector("iframe");
                this.theIframe.onload = () => {
                    console.log("Onload called" + this.isReloaded);
                    if (!this.isReloaded) {
                        this.isReloaded = true;
                        this.theIframe.src = this.theIframe.src;
                    }
                    let file = returnFound(this.fileTree, { selected: true });
                    this.handleFileSelected({ detail: file });
                };

                // Listen to message from child window
                this.bindEvent(window, "message", function(e) {
                    let data = e.data;
                    try {
                        let fileObj = JSON.parse(e.data);
                        if (fileObj && fileObj.lwclink) {

                            fireEvent(null, 'fileChanged', {
                                detail: {
                                    content: fileObj.content,
                                    fileId: fileObj.fileId
                                }
                            })
                        }
                    } catch (e) {}
                });
            }
        }
        // addEventListener support for IE8
    bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, eventHandler);
        }
    }

    handleFileSelected(eve) {
        let file = eve.detail;
        let send = {
            lwclink: true,
            fileContent: file.content,
            fileName: file.name,
            id: file.id
        };
        this.sendMessage(JSON.stringify(send));
    }

    sendMessage(msg) {
        // Make sure you are sending a string, and to stringify JSON
        this.theIframe.contentWindow.postMessage(msg, "*");
    }
}