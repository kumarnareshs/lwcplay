let configObj= {
    dev:{
        baseurl:"http://localhost:3002/api/v1",
        github:{
            client_id: '030263d37b91cadbb7f8',
            client_secret: '4ed816d8275c960fb3f8e5286e87d9cbf7e5a603',
            redirect_uri: 'http://localhost:3000/authcallback',
            scope: 'user'
        },
        s3:"https://s3.us-east-2.amazonaws.com/force.dev"
    },
    prod:{
        baseurl:"https://forcedev.herokuapp.com/api/v1",
        github:{
            client_id: '6e2a9fedf66ea4fc3a5e',
            client_secret: '5fded0367ece4217cf1576ab6383af93c0ea3c82',
            redirect_uri: 'https://www.force.dev/authcallback',
            scope: 'user'
        },
        s3:"https://s3.us-east-2.amazonaws.com/force.dev"
    }
}


//export default configObj.prod;
export default configObj.dev;