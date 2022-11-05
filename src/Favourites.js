// import firebase functions
import firebaseConfig from './firebase';
import {getDatabase, ref, onValue} from 'firebase/database'

// import state functions
import { useState, useEffect } from 'react';

// Favourites component
const Favourites = (props) => {

    // initial favourites state
    const [ favouriteItems, setFavouriteItems ] = useState([]);

    // when props.ID changes
    useEffect(() => {

        // set firebase endpoint
        const database = getDatabase(firebaseConfig)
        const databaseRef = ref(database, `/${props.ID}` )

        if(props.ID !== ''){
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
            })
        } else {
            setFavouriteItems([]);
        }

    }, [props.ID])

    // Favourites component return
    return (
        <>
            <h2>Favourites</h2>
            {
                favouriteItems.length !== 0
                ? <>
                    <p>Your favourites have loaded in the console.</p>
                    { console.log(favouriteItems) }
                </>
                : null
            }
        </>
    )
}

// export Favourites component
export default Favourites;