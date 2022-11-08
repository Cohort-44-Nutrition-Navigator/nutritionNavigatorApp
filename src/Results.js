// import axios function
import axios from 'axios';
// import state functions
import { useState } from 'react';

// import components
import Compare from './Compare';
import Favourites from './Favourites';

const Results = (props) => {

    const [items, setItems] = useState(props.items)
    const [ userID, setUserID ] = useState(props.ID) 
    const [favouriteItems, setFavouriteItems] = useState([])
    const [ compareItems, setCompareItems ] = useState([])

    // function to call second API endpoint 
    const nutrientApiSearch = ((foodItem) => {
        // created nutrition object to hold nutritional info
        const nutrition = {
            macronutrients: {
                calories: "",
                carbohydrates: "",
                fibre: "",
                protein: "",
                sodium: "",
                sugar: "",
                fat: "",
                saturatedFat: "",
            },
            micronutrients: {
                vitaminA: "",
                vitaminD: "",
                vitaminB6: "",
                vitaminC: "",
                vitaminE: "",
                magnesium: "",
                zinc: "",
                iron: "",
            }
        };

        // create switch function to switch attr_id number with corresponding values
        const switchFunction = ((nutrient) => {
            switch (nutrient.attr_id) {
                case 208:
                    nutrition.macronutrients.calories = nutrient.value
                    break;
                case 205:
                    nutrition.macronutrients.carbohydrates = nutrient.value
                    break;
                case 291:
                    nutrition.macronutrients.fibre = nutrient.value
                    break;
                case 203:
                    nutrition.macronutrients.protein = nutrient.value
                    break;
                case 307:
                    nutrition.macronutrients.sodium = nutrient.value
                    break;
                case 269:
                    nutrition.macronutrients.sugar = nutrient.value
                    break;
                case 204:
                    nutrition.macronutrients.fat = nutrient.value
                    break;
                case 606:
                    nutrition.macronutrients.saturatedFat = nutrient.value
                    break;
                case 318:
                    nutrition.micronutrients.vitaminA = nutrient.value
                    break;
                case 324:
                    nutrition.micronutrients.vitaminD = nutrient.value
                    break;
                case 415:
                    nutrition.micronutrients.vitaminB6 = nutrient.value
                    break;
                case 401:
                    nutrition.micronutrients.vitaminC = nutrient.value
                    break;
                case 323:
                    nutrition.micronutrients.vitaminE = nutrient.value
                    break;
                case 304:
                    nutrition.micronutrients.magnesium = nutrient.value
                    break;
                case 309:
                    nutrition.micronutrients.zinc = nutrient.value
                    break;
                case 303:
                    nutrition.micronutrients.iron = nutrient.value
                    break;
                default:
                    break;
            }
        })

        if (foodItem.type === 'generic') {
            // **NOTE** : added.slice(0, 3) to limit our API Call to 2 results (just during the testing phase)
            axios({
                method: "post",
                url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                headers: {
                    // API KEY 1
                    // "x-app-id": "ee0fb754",
                    // "x-app-key": "14612cd5ce51f2bdb3034857e382ee9d",
                    // API KEY 2
                    "x-app-id": "0eb5f22d",
                    "x-app-key": "d6fd704a091aeaa5c06a629aa96a56d0",
                    "x-remote-user-id": "0",
                },
                data: {
                    "query": foodItem.food_name
                }
            }).then((response) => {
                // created nutrientData variable to store array of nutrient codes
                const nutrientData = response.data.foods[0].full_nutrients
                // loop through nutrient codes and call switch function on each one
                nutrientData.forEach((nutrient) => {
                    switchFunction(nutrient);
                })
                // added an extra .then (to wait until all the nutrient names and values are added to the nutrition object)
            }).then(() => {
                // add propery called "nutritionalInfo" with value of nutrition object to each result 
                foodItem.nutritionalInfo = nutrition;
            })
        } else {
            // **NOTE** : added.slice(0, 2) to limit our API Call to 2 results (just during the testing phase)
            axios({
                method: "get",
                url: 'https://trackapi.nutritionix.com/v2/search/item',
                headers: {
                    'x-remote-user-id': '0',
                    // API KEY 1
                    'x-app-id': 'ee0fb754',
                    'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
                    // API KEY 2
                    // 'x-app-id': '0eb5f22d',
                    // 'x-app-key': 'd6fd704a091aeaa5c06a629aa96a56d0'
                },
                params: {
                    'nix_item_id': foodItem.nix_item_id
                }
            }).then((response) => {
                // created nutrientData variable to store array of nutrient codes
                const nutrientData = response.data.foods[0].full_nutrients;
                // loop through nutrient codes and call switch function on each one
                nutrientData.forEach((nutrient) => {
                    switchFunction(nutrient);
                })
                // added an extra .then (to wait until all the nutrient names and values are added to the nutrition object)
            }).then(() => {
                // add propery called "nutritionalInfo" with value of nutrition object to each result 
                foodItem.nutritionalInfo = nutrition;
            })
        }
    })

    const handleClick = () => {
        const newItems = items
        const firstItem = newItems[0]
        nutrientApiSearch(firstItem)
        newItems[0] = firstItem
        console.log(newItems)
        setItems(newItems)
        setFavouriteItems([newItems[0]])
        setCompareItems([newItems[0]])
    }

    return (
        <div>
            <h2>Results</h2>
            <button onClick={handleClick}>
                Click here for Nutrition
            </button>
            <Compare items={compareItems} />
            <Favourites items={favouriteItems}/>
        </div>
    )
}

export default Results;