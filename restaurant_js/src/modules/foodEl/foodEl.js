import "./foodEl.css";

function FoodEl({foodName, foodDescription, foodImage, foodPrice}){

    return(
    <div className='foodElement'>
        <h1>{foodName}</h1>
        <img src={foodImage} alt={foodName+" image"} ></img>
        <p>{foodDescription}</p>
        <h2>{foodPrice+"$"}</h2>
    </div>
    )
}

export default FoodEl;