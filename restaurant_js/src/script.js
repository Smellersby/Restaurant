
let foodName
let foodDescription
let foodImage
let elementId=0

console.log("script is active");

function createElement(name,description,image){
    const food = document.createElement("div");
    food.id="element"+elementId
    food.className="gridEl"
    document.querySelector(".foodContainer").appendChild(food);
    let currentElement=document.querySelector("#element"+elementId);
    const elementHeader = document.createElement("h1");
    elementHeader.innerHTML=name;
    currentElement.appendChild(elementHeader)
    if(description){
        const elementDescription = document.createElement("p");
        elementDescription.innerHTML=description;
        currentElement.appendChild(elementDescription)
    }
    if(image){
        const elementImage = document.createElement("img");
        elementImage.innerHTML=image;
        currentElement.appendChild(elementImage)
    }
    elementId++
    let lastname=localStorage.getItem("name")
    console.log(lastname)
}
function submitFunction(event){
    event.preventDefault()
    if(nameArea.value){
    foodName=nameArea.value
    foodDescription=descriptionArea.value
    foodImage=imageArea.value
    createElement(foodName,foodDescription,foodImage)
    }else{
        alert("Please, enter name")
    }
}

let submitBut=document.querySelector("submit");
console.log(submitBut);
let nameArea=document.querySelector("#foodName");
let descriptionArea=document.querySelector("#foodDescription");
let imageArea=document.querySelector("#foodImage");
let foodContainer=document.querySelector(".foodContainer");

console.log(nameArea);

if(submitBut){
submitBut.addEventListener("click", submitFunction)
}

