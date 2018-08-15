// const dbName = "TodoDB";
// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//     if(err){
//        return console.log("Can't connect to database", err);
//     }
//     console.log("Connected successfully to server");
   
//     const db = client.db(dbName);
    
//     const todosCol = db.collection('Todos');

//     todosCol.insertOne({ text: 'Clean the toilet', completed: false });
    
//     todosCol.find().toArray().then(data => {
//         console.log(JSON.stringify(data));
//     }, err => {
//         console.log(err);
//     });

//     client.close();
// });