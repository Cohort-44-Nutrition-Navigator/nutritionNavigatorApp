// import firebase functions
import firebaseConfig from './firebase';
import {getDatabase, ref, onValue} from 'firebase/database'

// import state functions
import { useState, useEffect } from 'react';


// Favourites component
const Favourites = (props) => {

    // initial favourites state
    const [favouriteItems, setFavouriteItems] = useState([]);

    useEffect (() => {
        if (props.ID === 'guest') {
            setFavouriteItems(props.items)
            console.log(favouriteItems)
        } else {
            // set firebase endpoint
            const database = getDatabase(firebaseConfig)
            const databaseRef = ref(database, `/${props.ID}`)
            // when data is received
            onValue(databaseRef, (response) => {

                // create an empty array
                const newArray = [];

                // data variable
                const data = response.val();

                // push each item in data to new array
                for (let item in data) {
                    newArray.push({ key: item, name: data[item] })
                }

                // set favourite items state to new array
                setFavouriteItems(newArray);
                console.log(favouriteItems)
            })
        }
    }, [props])
    
    // // remove function
    // const handleRemove = (favouriteItemId) => {
    //     if (props.ID === 'guest') {
    //         favouriteItems.filter(() => {

    //         })
    //     } else {
    //         const database = getDatabase(firebaseConfig);
    //         const cartItemRef = ref(database, `cart/${favouriteItemId}`)
    //         remove(cartItemRef)
    //     }
    // }

    // // add to compare function
    // const handleAdd = () => {

    // }

    // Favourites component return
    return (
        <>
            <h2>Favourites</h2>
            {
                favouriteItems.length === 0
                ? <p>You can add Favourites here</p>
                : <ul>
                    {favouriteItems.map((favouriteItem) => {
                        return (
                            <li key={favouriteItem.food_name}>
                                <ul>
                                    <li>
                                        <img src={favouriteItem.photo.thumb} alt={favouriteItem.food_name} />
                                        <p>{favouriteItem.food_name}</p>
                                        <p>Serving Size: {favouriteItem.serving_qty} {favouriteItem.serving_unit}</p>
                                        <div>
                                            {/* <button onClick={() => (handleRemove(favouriteItem.food_name))}>Remove</button>
                                            <button onClick={handleAdd}>Add to Compare</button> */}
                                        </div>
                                    </li>
                                    <ul>
                                       
                                        {Object.keys(favouriteItem.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                            return (
                                                <li key={index}>{nutrient}: {favouriteItem.nutritionalInfo.macronutrients[nutrient]}</li>
                                            )
                                        })}
                                        
                                        {/* <li>Calories: {favouriteItem.nutritionalInfo.macronutrients.calories}</li>
                                        <li>Carbs: {favouriteItem.nutritionalInfo.macronutrients.carbohydrates}</li>
                                        <li>Fat: {favouriteItem.nutritionalInfo.macronutrients.fat}</li>
                                        <li>Fibre: {favouriteItem.nutritionalInfo.macronutrients.fibre}</li>
                                        <li>Protein: {favouriteItem.nutritionalInfo.macronutrients.protein}</li>
                                        <li>Saturated Fat: {favouriteItem.nutritionalInfo.macronutrients.saturatedFat}</li>
                                        <li>Sodium: {favouriteItem.nutritionalInfo.macronutrients.sodium}</li>
                                        <li>Sugar: {favouriteItem.nutritionalInfo.macronutrients.sugar}</li> */}
                                    </ul>
                                    <ul>
                                        <li>Vitamin A: {favouriteItem.nutritionalInfo.micronutrients.vitaminA}</li>
                                        <li>Vitamin B6: {favouriteItem.nutritionalInfo.micronutrients.vitaminB6}</li>
                                        <li>Vitamin C: {favouriteItem.nutritionalInfo.micronutrients.vitaminC}</li>
                                        <li>Vitamin D: {favouriteItem.nutritionalInfo.micronutrients.vitaminD}</li>
                                        <li>Vitamin E: {favouriteItem.nutritionalInfo.micronutrients.vitaminE}</li>
                                        <li>Iron: {favouriteItem.nutritionalInfo.micronutrients.iron}</li>
                                        <li>Magnesium: {favouriteItem.nutritionalInfo.micronutrients.magnesium}</li>
                                        <li>Zinc: {favouriteItem.nutritionalInfo.micronutrients.zinc}</li>
                                    </ul>
                                </ul>
                            </li>
                        )   
                    })}
                </ul>
            }
        </>
    )
}

// export Favourites component
export default Favourites;


    // if (ID === guest)
        // use props 
            // if (props.items.length = 0)
                // <p> You can add favourites here </p>
            // else (props.items.length >0)
                // setFavouriteItems(props.items)
                // show faviourite Items on page

    // else (ID === user.ID)
        // use firebase
            // if (props.ID.length = 0)
                // <p> You can add Favourites here </p>
            // else (props.ID.length >0)
                // grab info from firebase and save in new Array
                // setFavourite Items(newArray)
                // show faviourite Items on page