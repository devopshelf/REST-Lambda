module.exports = {
    getPlaylist: ()=> {
        return new Promise((fulfill,reject)=>{
            const AWS = require('aws-sdk')
            const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
            var params = {
                TableName: 'playlists'
            }
            dynamodb.scan(params,function(err,data){
                if (err) {
                    reject(err)
                } else {
                    fulfill(JSON.stringify(data.Items))
                }
            })
        })
    },

    //Getting Items based on ID get?id=best-song-ever

    getItemsById:(id) => {
        return new Promise((fulfill,reject)=>{
            const AWS = require('aws-sdk')
            const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
            const params = {
                TableName: 'playlists',
                KeyConditionExpression: 'id = :id',
                ExpressionAttributeValues: {
                  ':id': { 'S': id }
                }
              };
            dynamodb.query(params,function(err,data){
                if (err) {
                    reject(err)
                } else {
                    fulfill(JSON.stringify(data.Items))
                }
            }) 
        })
    },

    //add New Post , method = POST
    addNewItem: (body) => {
        return new Promise((fulfill,reject)=>{
            const AWS = require('aws-sdk')
            const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
            var tableItems = {
                "id": {
                    S: body.id
                },
                "name":{
                    S: body.name
                },
                "tagline":{
                    S: body.tagline
                },
                "items":{
                    SS: body.items
                },
                "stars":{
                    N: body.stars
                }
            }
            dynamodb.putItem({
                TableName: "playlists",
                Item: tableItems
            }, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    fulfill(JSON.stringify(data.Items))
                }
            })

        })
    },

    //Update Item,  method PUT

    updateItem: (body) => {
        return new Promise((fulfill,reject)=>{
            const AWS = require('aws-sdk');
            var docClient = new AWS.DynamoDB.DocumentClient();
            var table = "playlists";
            var id = body.id;
            // Update the item, unconditionally,
            var params = {
                TableName:table,
                Key:{
                    "id":id
                },
                UpdateExpression: "set #myname=:n, tagline=:t, stars=:s, #myitems=:i",
                ExpressionAttributeValues:{
                    ":n":body.name,
                    ":t":body.tagline,
                    ":s":body.stars,
                    ":i":body.items
                },
                ExpressionAttributeNames:{
                    "#myname": "name",
                    "#myitems": "items"
                },
                ReturnValues:"UPDATED_NEW"
            };
            docClient.update(params, function(err, data) {
                if (err) {
                    reject(err)
                } else {
                    fulfill(JSON.stringify(data.Items))
                }
            });

        })
    }
}