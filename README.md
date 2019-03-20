# REST API Lambda Function 

### The code is for Nodejs based Lambda function for doing REST operations. 

#### Database: DynamoDB
#### API Provider: API Gateway

It consist of controller folder `/controller/res`, where all the rest logic
is written as follows:

1. getPlaylist Method:  It will respond to Method GET and when path is `/`.
2. getItemById Method: It will respond to GET ,path `/lists` and queryString `/?id=`.
3. updateItem Method: Respond to PUT request.
4. addNewItem Method: Response to POST request.

##### Note: We are returning response in the form of Promise i.e,

```
return new Promise((fulfill,reject)=>{
    if(err) reject(err)
    else fullfill(data)
})

```

#### API Gateway Notes

For accepting queryString do the following:

1. In Method Request: Under Query String Parameters add your queryString for example : 
if you want `/?id=` then add id.
2. In Integration Request: Uncheck the "Use Proxy Integration" and open Mapping Templates and add "application/json" Content-Type and add below template:

```

{
    "id":"$input.params('id')"    
}
   
```

##### If you have any query, feel free to send your query on shubham.devops08@gmail.com