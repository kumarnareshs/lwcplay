import * as CONSTANTS from '../../helper/constant/constant';
async function getTemplates(){
    let url = CONSTANTS.BASE_URL + '/s3/template';
    let response = await fetch(url,{credentials: 'include'});
    let data = await response.json();
    return data;
}

export {getTemplates}