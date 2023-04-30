
import { type } from '@testing-library/user-event/dist/type';
import {useState} from "react"
import{useEffect} from "react"
import './App.css';
import FoodEl from './modules/foodEl/foodEl.js';
import axios from "axios";


function App() {

  const[food, setFood] =useState([])

  //pieprasijums no serveri
  const fetchAllFood=()=>{
    axios.get('http://localhost:3004/').then((response)=>{
      setFood(response.data);
    });
  }
  const submitFunction=()=>{
    if(document.querySelector("#foodName").value){
      let foodElement={
        id:food.length+1,
        name: document.querySelector("#foodName").value,
        description: document.querySelector("#foodDescription").value,
        image:document.querySelector("#foodImage").value,
        price:parseFloat(document.querySelector("#foodPrice").value).toFixed(2)
      }
      setFood(prevFood => [...prevFood, foodElement]);
      
      axios.post('http://localhost:3004/', {    //sending to server
        name: document.querySelector("#foodName").value,
        description: document.querySelector("#foodDescription").value,
        image: document.querySelector("#foodImage").value,
        price: parseFloat(document.querySelector("#foodPrice").value).toFixed(2)
      })
      }else{
      alert("Please, enter food name")
      }
  }

  useEffect(()=>{
    fetchAllFood();
  },[])


  return(

  <div className="mainContainer">
        <h1>Restaraunt menu</h1>
        <form className="submitContainer">
            <button id="submit" type='button' onClick={()=>{submitFunction()}}>Submit</button>
            <input id="foodName" type="text" placeholder="Name" ></input>
            <input id="foodDescription" type="text" placeholder="Description"></input>
            <input id="foodImage" type="text" placeholder="Image link"></input>
            <input id="foodPrice" type="text" placeholder="Price"></input>
        </form>

        <div id="foodContainer">
           {food.map(food => (
            <FoodEl foodName={food.name} foodDescription={food.description} foodImage={food.image} foodPrice={food.price}></FoodEl>
           ))}
        </div>

  </div>
  );
}



export default App;
