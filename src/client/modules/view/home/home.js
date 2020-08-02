
import BaseElement from "base/baseelement";
import { store, userLoggedOut } from 'my/store';
import * as CONSTANTS from 'helper/constant';
import{logoutUser} from 'base/functions'
export default class Home extends BaseElement {
    logoutUser() {
        logoutUser();
    }
}