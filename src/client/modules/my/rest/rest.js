import * as CONSTANTS from '../../helper/constant/constant';
import { store } from 'my/store';
async function getTemplates(){
    let url = CONSTANTS.BASE_URL + '/s3/template';
    let response = await fetch(url,{credentials: 'include'});
    let data = await response.json();
    return data;
}

async function createProject(params){
    let url = CONSTANTS.BASE_URL + '/s3/createproject?type='+params.type+'&path='+params.path;
    let response = await fetch(url,{credentials: 'include'});
    let data = await response.json();
    return data;
}

async function getSignedURL(workspace){
    let url = CONSTANTS.BASE_URL + '/s3/getsignedurl?workspace='+workspace;
    let response = await fetch(url,{credentials: 'include'});
    let data = await response.json();
    return data;
}

async function getS3File(workspace,getURL){
    let state = store.getState();
    if(getURL==null)
    getURL = state.application.signedurl[workspace].getURL;
    let response = await fetch(getURL);
    let data = await response.json();
    return data;
}

export {getTemplates,createProject,getSignedURL,getS3File}