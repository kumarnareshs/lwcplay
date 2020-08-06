import { LightningElement, api ,wire} from "lwc";
import { connectStore, store } from 'my/store';
export default class  BaseElement extends LightningElement{
   @api property;
   application;
   isGuest=true;
   username;
   profilePic;
   profileName;
   signedUrl;
   file;
    @wire(connectStore, { store })
    storeChange({ application }) {
        console.log('store change');

        if(application!=null){
            console.log('this.application.user.type'+application.user.type);
            if(application.user!=null&&application.user.type==='guest'){
                this.isGuest = true;
            }else {
                this.isGuest = false;
                this.username = application.user.user.user.username;
                this.profilePic = application.user.user.user.profilePicture;
                this.profileName = application.user.user.user.name;
                this.signedUrl = application.signedUrl;
                this.file = application.file;
            }
        }
    }


}