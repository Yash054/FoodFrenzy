const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Yash:Nevergiveup0054@cluster0.ycb21g4.mongodb.net/Yomato?retryWrites=true&w=majority';
const mongoDB = async() => {
   
        await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
            if (err) console.log("---", err)
            else {
                console.log("connected successfuly");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(async function( err, data){
                    const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function( err, catData){
                    if(err ) console.log(err);
                    else{ //console.log(data);
                        global.food_items = data;
                        //console.log(global.food_items)
                        global.foodCategory = catData;
                    }
                })           
             })
        }
    });

    }
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

module.exports = mongoDB;