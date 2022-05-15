const mongoose = require("mongoose");
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = async ()=>{
    try{
        connection = await mongoose.connect(url);
        console.log('connect to mongo');
        
    }catch(err){
        console.log(err);
    }

    var Dish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    
    try{
        let newDish = await Dish.save();
        console.log(newDish);
        let documents = await Dishes.find({});
        console.log(documents);
        await Dishes.remove({});
        await mongoose.connection.close();
    }catch(err){
        console.log(err);
    }
}

connect();