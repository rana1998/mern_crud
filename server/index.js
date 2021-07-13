const express  = require('express');
const mongoose = require('mongoose');
const app = express();


const cors = require('cors');
//npm install cors frontend to backend data send

const FoodModel = require("./modals/Food");

app.use(express.json());

app.use(cors());




mongoose.connect('mongodb+srv://kshitij_crud14:kshitij_crud14@cluster0.bhmq3.mongodb.net/food?retryWrites=true&w=majority',{
	useNewUrlParser:true,
	useUnifiedTopology: true
});


// app.get('/',async (req,res) =>{
    
//     const food = new FoodModel({
//           foodName:"Apple",
//           daysSinceIAte:3
//     });

//     try
//     {
//       await food.save();
//     }
//     catch
//     {
//        console.log(err);
//     }
// });

app.post('/insert',async (req,res) =>{
    

    const foodName = req.body.foodName;
    const days     = req.body.days;

    console.log(foodName);
    console.log(days);
    const food = new FoodModel({
          foodName:foodName,
         daysSinceIAte:days
    });

    try
    {
      await food.save();
    }
    catch
    {
       console.log('error');
    }
});


app.get('/read',async (req,res) =>{
    FoodModel.find({},(err,result) =>
    {
    	if(err)
    	{
    		res.send(err)
    	}

    	res.send(result);
    })
});


app.put('/update',async (req,res) =>{
    

    const newfoodName = req.body.newFoodName;
    const id          = req.body.id;

    console.log(newfoodName);
    console.log(id);
    try
    {
      await FoodModel.findById(id, (err,updatedFood) =>{
      	updatedFood.foodName = newfoodName;
      	updatedFood.save();
      	res.send('update');
      })
    }
    catch
    {
       console.log('error');
    }
});

app.delete("/delete/:id", async (req,res) =>{
     const id = req.params.id; 
     await FoodModel.findByIdAndRemove(id).exec();
     res.send("deleted");

});


app.listen(3001,()=>{
	console.log('sever running on port 3001')
})