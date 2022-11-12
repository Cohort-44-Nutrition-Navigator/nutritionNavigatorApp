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

        setFavouriteItems(props.items);

        if (props.ID !== 'guest') {

            // set firebase endpoint
            const database = getDatabase(firebaseConfig)
            const databaseRef = ref(database, `/${props.ID}`)

            // when data is received
            onValue(databaseRef, (response) => {

                // create an empty array
                const newArray = [ ...favouriteItems ];

                // data variable
                const data = response.val();

                // push each item in data to new array
                for (let item in data) {
                    newArray.push(data[item])
                }

                // set favourite items state to new array
                setFavouriteItems(newArray);
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
    
        <section className='favourites'>

            <h2>Favourites</h2>
            {
                favouriteItems.length > 0
                ? <ul>
                    { favouriteItems.map((favouriteItem) => {
                        return (
                            <li key={favouriteItem.food_name}>
                                <ul>
                                    <li>
                                        <img src={favouriteItem.photo.thumb} alt={favouriteItem.food_name} />
                                        <p>{favouriteItem.food_name}</p>
                                        <p>Serving Size: {favouriteItem.serving_qty} {favouriteItem.serving_unit}</p>
                                    </li>
                                    <ul>
                                       
                                        {Object.keys(favouriteItem.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                            return (
                                                <li key={index}>{nutrient}: {favouriteItem.nutritionalInfo.macronutrients[nutrient]}</li>
                                            )
                                        })}
                                    </ul>
                                </ul>
                            </li>
                        )   
                    })}
                </ul>
                : <p>You can add Favourites here</p>
            }
        </section>
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