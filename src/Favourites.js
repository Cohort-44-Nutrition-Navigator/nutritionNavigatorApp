import firebaseConfig from './firebase';
import {getDatabase, ref, onValue} from 'firebase/database'
import { useEffect } from 'react';



const Favourites = () => {
    useEffect(() => {
        const database = getDatabase(firebaseConfig)
        const databaseRef = ref(database)
        onValue(databaseRef, (response) => {
            const newArray = [];
            const data = response.val();
            for (let item in data) {

                newArray.push({ key: item, name: data[item] })
            }
            console.log(newArray)
        })
    })

    return (
        <h2>Favourites</h2>
        
    )
}

export default Favourites;