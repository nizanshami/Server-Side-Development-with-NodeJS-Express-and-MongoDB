const mongoose = require("mongoose");
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = async ()=>{
    try{
        connection = await mongoose.connect(url);
        console.log('connect to mongodb at ', url);
        
    }catch(err){
        console.log(err);
    }

    try{
        let Dish = await Dishes.create({
            name: 'Uthappizza',
            description: 'test'
        });    
        console.log(Dish);
        let documents = await Dishes.findByIdAndUpdate(Dish._id,{
            $set: {description: 'update test'}
        },{
            new: true
        }).exec();
        console.log(documents);
        documents.comments.push({
            rating: 5,
            comments: "comment exmple",
            author: "nizan shami"
        })
        documents = await documents.save();
        console.log(documents);
        await Dishes.remove({});
        await mongoose.connection.close();
    }catch(err){
        console.log(err);
    }
}

connect();