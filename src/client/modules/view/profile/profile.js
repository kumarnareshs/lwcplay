import BaseElement from "base/baseelement";
import { getTemplates } from '../../my/rest/rest';
import { track } from 'lwc'
export default class Profile extends BaseElement {


    @track templateList = [];
    connectedCallback() {
        this.getTemplatesJson();
    }
    getTemplatesJson() {
        getTemplates().then((data) => {
            if (data.status === 'success') {
                data.template.Contents.forEach((item) => {
                    let key = item.Key
                    if (key != 'template/') {
                        let name = key.substr(key.indexOf('/') + 1).split('.')[0];
                        this.templateList.push({ name: name, path: key });
                    }

                })
            }
            console.log(this.templateList);
        }).catch(error => {

        })
    }

    createProjectFromTemplate(eve){
        let data = eve.currentTarget.getAttribute('data-path');
    }

}