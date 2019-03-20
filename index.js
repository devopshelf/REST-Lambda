console.log('function starts')
var rest = require('./controllers/rest');

function createResponse(statusCode,body){
    return {
        statusCode: statusCode,
        body: body,
        headers:{ 'Access-Control-Allow-Origin' : '*' }
    }
}

exports.handler = function(event,context,callback){
    console.log('processing event: ' + JSON.stringify(event, null, 2));
    if(event.httpMethod === "POST"){

        var body = JSON.parse(event.body);
        rest.addNewItem(body)
        .then(data =>{
            callback(null,createResponse('200',data));
        })
        .catch(err =>{
            callback(null,createResponse('500',err));
        })

    }else if(event.httpMethod === 'GET' && event.path === '/'){

        rest.getPlaylist()
        .then(data =>{
            callback(null,createResponse('200',data));
        })
        .catch(err =>{
            callback(null,createResponse('500',err));
        })

    }else if(event.httpMethod === 'PUT' && event.path === '/lists'){

        var body = JSON.parse(event.body);
        rest.updateItem(body)
        .then(data =>{
            callback(null,createResponse('200',data));
        })
        .catch(err =>{
            callback(null,createResponse('500',err));
        })

    }else{

        rest.getItemsById(event.id)
        .then(data =>{
            callback(null,createResponse('200',data));
        })
        .catch(err =>{
            callback(null,createResponse('500',err));
        })  
        
    }
}