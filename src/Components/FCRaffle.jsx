import { useEffect, useState } from "react";
import { CuisineTypes, Timer,foodPlaces } from "../Constants/food-places";
import AnimatedMulti from "./FCSelect"

const FoodRaffle = () => {

    const [food,setFood] = useState(foodPlaces);
    const [winner,setWinner] = useState('');
    const [currentFood,setCurrentFood] = useState('');
    const [showRoll,setShowRoll] = useState(true);
    const [checked,setChecked] = useState(false);
    const [valuesTypes,setValueTypes] = useState([]);
    const [time,setTime] = useState(200);

    useEffect(()=>{
        if (!showRoll) {
            if (food.length<5) {
                shuffle(100,3000);
            }
            else shuffle(300,6000);
        }
    },[showRoll])

    useEffect(()=>{
        order();
    },[valuesTypes,time,checked])

    const randomName=() => {
        const rand = Math.floor(Math.random() * food.length);
        const name = food[rand];
        return name;
    }
    const Roll = () =>{
        if (food?.length===0) {
                
        }
        else if (food?.length===1) {
            setCurrentFood('');
            setWinner(randomName());
            setShowRoll(true); 
        }
        else{
            setWinner('');
            setShowRoll(false);
        }

    }
    const shuffle = (shf,time) =>{
        let x = setInterval(() => {
            setCurrentFood(randomName());
        }, shf);

        setTimeout(() => {
            clearInterval(x);
            setCurrentFood('');
            setWinner(randomName());
            setShowRoll(true);
        }, time);
    }
    const changeCheckbox = (event) =>{
        setChecked(event.target.checked);
        if(event.target.checked){
            let temp_food = foodPlaces.filter((food)=>food.distanceFromUser<1000);
            setFood([...temp_food]);
        }
        else setFood([...food]);
    }
    const changeCuisine = (values) =>{
        let values_v = []
        if (values.length === 0) values_v = [];
        else values_v = values.map((v_f)=>v_f.Id);
        setValueTypes([...values_v])
    }
    const changeDeliveryTime = (value) =>{
        if (!value) value = 200;
        setTime(value.value);
    }
    const order = () =>{
        let temp_food = [...foodPlaces];
        let temp_food2 = [];
        if(checked){
            temp_food = temp_food.filter((food)=>food.distanceFromUser<1000);
        }
        if (time) {
            temp_food = temp_food.filter((food)=>food.deliveryTimeInMinutes<time);
        }
        if (valuesTypes?.length>0) {
            temp_food.forEach(food => {
                food.restaurantCuisineKeysList.map(f=>{
                    if(valuesTypes.includes(f)) temp_food2.push(food);
                });
            });
            setFood([...temp_food2]);
        }
        else setFood([...temp_food]);
    }
      
    return ( 
        <div className="container">
            <div className="select_options">
                <AnimatedMulti handleChange={changeCuisine} isMulti={true} headline="Cuisine Types" options={CuisineTypes}/>
                <AnimatedMulti handleChange={changeDeliveryTime} isMulti={false} headline="Delivery Time In Minutes" options={Timer}/>
                <div className="checkbox">
                    <input onChange={changeCheckbox} type="checkbox" id="scales" name="scales"/>
                    <label for="scales">Near Pico</label>
                </div>
            </div>
            {(showRoll)&&<div className="roll_button">
                <button onClick={Roll}>Roll</button>
            </div>}
            {currentFood!==''&&
                <div className="roll_div">                
                    <div className="pico_jobs">
                        Come eat lunch with us..
                        <br/>
                        Pico is hiring!
                    </div>
                    <span>{currentFood.restaurantName}</span>
                </div>}
            {winner!==''&&
            <div className="roll_div">
                <div>The winner is:</div>
                <div>{winner.restaurantName}</div>
                <a className="link" href="https://www.picogp.com/careers?utm_source=fb_lunch&utm_medium=game&utm_campaign=choose_a_place_to_eat">
                    work @ Pico: 
                    <span>  picogp.com/careers</span>
                </a>
            </div>}
        </div>
    );
}
 
export default FoodRaffle;