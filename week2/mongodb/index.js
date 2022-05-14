const MongoClient = require('mongodb').MongoClient;
const dbOper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion'; 

MongoClient.connect(url).then( async (client) => {
    
    console.log('connected to server');
    const db = client.db(dbname);
    
    try{
        const inserted = await dbOper.insertDocuments(db, { name: "Vadonut", description: "Test"}, 'dishes');
        console.log(`a document is inserted:\n ${inserted}`);
    }catch(err){
        console.log(`an erorr accured at insetion E : ${err}`);
    }
    try{
        const find = await dbOper.findDocuments(db, 'dishes');
        console.log(`found document`);
    }catch(err){
        console.log(`an erorr accured at find E : ${err}`);
    }
    try{
        const updated = await dbOper.updateDocuments(db, { name: "Vadonut"},
        {description: "update Test"}, 'dishes');
        console.log(`the document update`);
    }catch(err){
        console.log(`an erorr accured at update E : ${err}`);
    }   
    

})

