import { LightningElement, api } from 'lwc';
import { normalizeFiles } from '../../helper/util';
import { changeProps, returnFound } from 'find-and';
import { fireEvent } from '../../helper/pubsub/pubsub';
export default class Explorer extends LightningElement {
    @api fileTree;

}