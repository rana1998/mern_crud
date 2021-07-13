import React,{useState,useEffect} from 'react';

//npm install axios frontend to backend data send
import Axios from 'axios';
import './App.css';





function App() {

  const [foodName,setFoodName] = useState('');

  const [days,setDays] = useState(0);

  const [newFoodName,setNewFoodName] = useState('');

  const [foodList,setFoodlist] = useState([]);

  useEffect(() =>{
       Axios.get("http://localhost:3001/read").then((response) =>
        {
          console.log(response.data);
          setFoodlist(response.data);
        });
  },[])

  const addToList = () =>
  {
     console.log(foodName + days);
     Axios.post("http://localhost:3001/insert",{foodName:foodName,
         days:days,
     });

     window.location.reload();
  };

  const updateFood = (id) =>
  {
    Axios.put("http://localhost:3001/update",{id:id,
         newFoodName: newFoodName,
     });
  }

  const deleteFood = (id) =>
  {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
        <h1>Crud App with mern</h1>

        <label htmlFor="">Food Name</label>

        <input type="text" onChange={(event) =>{
          setFoodName(event.target.value)
        }}/>

        <label htmlFor="">Days since You eat it</label>
        <input type="number" onChange={(event) =>{
          setDays(event.target.value)
        }}
        />
        <button onClick = {addToList}>Add to List</button>

        <h1>Food List</h1>

        <div className="foodDiv">
        {foodList.map((val,key) =>{
            return <div key = {key} className="food">
            <h1> {val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1>
            <input type="text" placeholder="New Food name"  onChange={(event) =>{
          setNewFoodName(event.target.value)
        }} />
            <button onClick={() => updateFood(val._id)}>update</button>
            <button onClick={() =>  deleteFood(val._id)}>Delete</button>
            </div>
        } )}

        </div>

    </div>
  );
}

export default App;
