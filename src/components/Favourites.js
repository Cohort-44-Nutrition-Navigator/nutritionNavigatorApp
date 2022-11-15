// import firebase functions
import firebaseConfig from '../firebase';
import {getDatabase, ref, onValue} from 'firebase/database'

// import state functions
import { useState, useEffect } from 'react';


// Favourites component
const Favourites = (props) => {

    // initial favourites state
    const [favouriteItems, setFavouriteItems] = useState([]);
    // state for favourites slider button
    const [favouritesOpen, setFavouritesOpen] = useState(false);

    const handleOpenFavourites = () => {
        setFavouritesOpen(!favouritesOpen)
    }

    const handleUnfavourite = props.remove

    useEffect (() => {

        // set firebase endpoint
        const database = getDatabase(firebaseConfig)
        const databaseRef = ref(database, `/${props.ID}`)

        if (props.unfavourited.length > 1){

            // when data is received
            onValue(databaseRef, (response) => {

                // create an empty array
                const newArray = [];

                // data variable
                const data = response.val();

                // push each item in data to new array
                for (let item in data) {
                    newArray.push(data[item])
                }

                // set favourite items state to new array
                setFavouriteItems(newArray);
                props.favouritesNumber(favouriteItems.length);
            })

        }

        if (props.ID === 'guest') {

            setFavouriteItems(props.items);
            props.favouritesNumber(favouriteItems.length);

        } else {

            // when data is received
            onValue(databaseRef, (response) => {

                // create an empty array
                const newArray = [];

                // data variable
                const data = response.val();

                // push each item in data to new array
                for (let item in data) {
                    newArray.push(data[item])
                }

                // set favourite items state to new array
                setFavouriteItems(newArray);
                props.favouritesNumber(favouriteItems.length);
            })
            
        }

    }, [props, favouriteItems])
    
    // Favourites component return
    return (
    
        <section className=
            {
                favouritesOpen
                    ? "favourites open"
                    : "favourites"
            }
        >
            <div className="favouritesSliderTab">
                <div className="heartIcon">
                    <i className=
                        {
                            favouriteItems.length === 0
                                ? "fa fa-heart-o emptyHeart"
                                : "fa fa-heart fullHeart"
                        }
                        aria-hidden="true"></i>
                    <span>{favouriteItems.length}</span>
                </div>
                <button onClick={handleOpenFavourites}>
                    <i className={
                        favouritesOpen
                            ? "favouritesSliderButton fa fa-chevron-circle-left"
                            : "favouritesSliderButton fa fa-chevron-circle-right"
                    }
                        aria-hidden="true"></i>
                </button>
            </div>
            <div className={
                favouritesOpen
                    ? "favouritesComponent showFavourites"
                    : "hideFavourites"
            }>
                <h2>Favourites</h2>
                {
                    favouriteItems.length > 0
                        ? <ul className='favouritesItems'>
                            {favouriteItems.map((favouriteItem, index) => {
                                return (
                                    <li className='favouritesListItem' key={favouriteItem.food_name}>
                                        <ul className='itemDisplay'>
                                            <li className='displayTitle'>
                                                <div className="imgBox">
                                                    <img src={favouriteItem.photo.thumb} alt={favouriteItem.food_name} />
                                                </div>
                                                <p className='name'>{favouriteItem.food_name}</p>
                                                <p className='serving'>Serving Size: </p>
                                                <p className='servingSize'>{favouriteItem.serving_qty} {favouriteItem.serving_unit}</p>
                                                <button onClick={() => handleUnfavourite(favouriteItem, index, "favourites")}><i className="fa fa-heart fullHeart" aria-hidden="true"></i></button>
                                            </li>
                                            {
                                                favouriteItem.nutritionalInfo
                                                    ? <li className='displayNutrients'>
                                                        <ul className='macroNutrients'>

                                                            {Object.keys(favouriteItem.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                                                return (
                                                                    <li key={index}>{nutrient}: {favouriteItem.nutritionalInfo.macronutrients[nutrient]}</li>
                                                                )
                                                            })}
                                                        </ul>
                                                        <ul className='microNutrients'>

                                                            {Object.keys(favouriteItem.nutritionalInfo.micronutrients).map((nutrient, index) => {
                                                                return (
                                                                    <li key={index}>{nutrient}: {favouriteItem.nutritionalInfo.micronutrients[nutrient]}</li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li> 
                                                    : null
                                            }
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                        : <p>Add items from search results with the heart icon to keep in your favourites!</p>
                }
            </div>
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