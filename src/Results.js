// import axios
import axios from 'axios';

// import state functions
import { useState, useEffect } from 'react';

// import components
import Compare from './Compare';
import Favourites from './Favourites';

// Results component (takes ID and items as props)
const Results = (props) => {

    // initial state variables
    const [ items, setItems ] = useState(props.items);
    const [ ID, setID ] = useState(props.ID);
    const [ favouriteItems, setFavouriteItems ] = useState([]);
    const [ compareItems, setCompareItems ] = useState([]);

    // reset items and ID state whenever props causes a re-render
    useEffect(() => {

        setItems(props.items);
        setID(props.ID);

    }, [props])

    // individual Result component (takes item, index, and showNutrients as props)
    const Result = (props) => {

        // function to call second API endpoint 
        const nutrientApiSearch = ((foodItem) => {

            // create nutrition object to hold nutritional info
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

            // if the food type is 'generic'
            if (foodItem.type === 'generic') {
                
                // make an axios call to the natural/nutrients endpoint for nutritional data
                axios({
                    method: "post",
                    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                    headers: {
                        // API KEY 1
                        "x-app-id": "ee0fb754",
                        "x-app-key": "14612cd5ce51f2bdb3034857e382ee9d",
                        // API KEY 2
                        // "x-app-id": "0eb5f22d",
                        // "x-app-key": "d6fd704a091aeaa5c06a629aa96a56d0",
                        "x-remote-user-id": "0",
                    },
                    data: {
                        "query": foodItem.food_name
                    }

                // when we get the data back
                }).then((response) => {

                    // create nutrientData variable to store array of nutrient codes
                    const nutrientData = response.data.foods[0].full_nutrients

                    // loop through nutrient codes and call switch function on each one
                    nutrientData.forEach((nutrient) => {
                        switchFunction(nutrient);
                    })

                // once until all the nutrient names and values are added to the nutrition object
                }).then(() => {

                    // add propery called "nutritionalInfo" with value of nutrition object to each result 
                    foodItem.nutritionalInfo = nutrition;

                    setLoading(false);

                })
            
            // if the food type is 'branded'
            } else {

                // make an axios call to the search/item endpoint for nutritional data
                axios({
                    method: "get",
                    url: 'https://trackapi.nutritionix.com/v2/search/item',
                    headers: {
                        'x-remote-user-id': '0',
                        // API KEY 1
                        // 'x-app-id': 'ee0fb754',
                        // 'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
                        // API KEY 2
                        // 'x-app-id': '0eb5f22d',
                        // 'x-app-key': 'd6fd704a091aeaa5c06a629aa96a56d0'
                    },
                    params: {
                        'nix_item_id': foodItem.nix_item_id
                    }
                
                // when we get the data back 
                }).then((response) => {

                    // create nutrientData variable to store array of nutrient codes
                    const nutrientData = response.data.foods[0].full_nutrients;

                    // loop through nutrient codes and call switch function on each one
                    nutrientData.forEach((nutrient) => {
                        switchFunction(nutrient);
                    })

                // once until all the nutrient names and values are added to the nutrition object
                }).then(() => {

                    // add propery called "nutritionalInfo" with value of nutrition object to each result 
                    foodItem.nutritionalInfo = nutrition;

                    setLoading(false);

                })
            }
        })

        const [ showNutrients, setShowNutrients ] = useState(props.showNutrients);
        const [ showMacro, setShowMacro ] = useState(true);
        const [ loading, setLoading ] = useState(props.loading);

        const item = props.item;
        const index = props.index;

        // favourite item function
        const handleFavourite = (item, index) => {

            // if the user is a guest
            if (ID === 'guest'){

                // create a new favourite items array
                const newFavouriteItems = favouriteItems;

                // if the item has nutritional info already
                if (item.nutritionalInfo){

                    // push the item to the new favourite items array
                    newFavouriteItems.push(item);

                    // set the favourite items state to new array
                    setFavouriteItems(newFavouriteItems);

                // if the item does not have nutritional info
                } else {

                    // copy items and item
                    const updatedItems = items;
                    const updatedItem = item;

                    // run the second API call on the item
                    nutrientApiSearch(updatedItem);
                    
                    // push the updated item to the new favourite items array
                    newFavouriteItems.push(updatedItem);

                    // set the favourite items state to new array
                    setFavouriteItems(newFavouriteItems);

                    // update items array to have the updated item
                    updatedItems[{index}] = updatedItem;

                    // set the items state to the new array with the updated item
                    setItems(updatedItems);

                }

            // if the user not a guest
            } else {

                // console log the user's ID
                console.log(ID);

            }
        }

        // compare function
        const handleCompare = (item, index) => {

            // create a new compare items array
            const newCompareItems = compareItems;

            // if the item has nutritional info already
            if (item.nutritionalInfo){

                // push the item to the new compare items array
                newCompareItems.push(item);
                // set the compare items state to new array
                setCompareItems(newCompareItems);

            // if the item does not have nutritional info
            } else {

                // copy items and item
                const updatedItems = items;
                const updatedItem = item;

                // run the second API call on the item
                nutrientApiSearch(updatedItem);

                // push the updated item to the new compare items array
                newCompareItems.push(updatedItem);

                // set the compare items state to new array
                setCompareItems(newCompareItems);

                // update items array to have the updated item
                updatedItems[{index}] = updatedItem;

                // set the items state to the new array with the updated item
                setItems(updatedItems);

            }
        }

        // hide or show nutrients function
        const handleHideShowNutrients = (item, index) => {
            
            const updatedItems = items;
            const updatedItem = item;

            // if nutrients are showing
            if (showNutrients){

                // hide the nutrients
                setShowNutrients(false);

            } else {
                
                // if item doesn't already have nutritional info
                if (!updatedItem.nutritionalInfo){

                    setLoading(true);

                    // run the second API call on the item
                    nutrientApiSearch(updatedItem);

                    // update items array to have the updated item
                    updatedItems[{index}] = updatedItem;

                    // set the items state to the new array with the updated item
                    setItems(updatedItems);

                }

                // show the nutrients
                setShowNutrients(true);

            }
        }

        const handleMacroMicro = () => {
            if(showMacro){
                setShowMacro(false);
            } else {
                setShowMacro(true);
            }
        }

        // individual Result component return
        return(

            // create a list item
            <li>

                {/* insert image */}
                <img src={item.photo.thumb} alt="" />

                {/* insert item name */}
                <p>{item.food_name}</p>

                
                <div style={

                    // if nutrients are supposed to show
                    showNutrients

                    // display nutrients
                    ? {display: "initial"}

                    // else hide nutrients
                    : {display: "none"}

                    }>
                        {
                            loading
                            ? <p>Loading nutrients</p>
                            : item.nutritionalInfo
                                ? <>
                                    {
                                        showMacro
                                        ? <>
                                            <h3>Macronutrients</h3>
                                            <ul>
                                                {Object.keys(item.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                                    return (
                                                        <li key={index}>{nutrient}: {item.nutritionalInfo.macronutrients[nutrient]}</li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                        : <>
                                            <h3>Micronutrients</h3>
                                            <ul>
                                                {Object.keys(item.nutritionalInfo.micronutrients).map((nutrient, index) => {
                                                    return (
                                                        <li key={index}>{nutrient}: {item.nutritionalInfo.micronutrients[nutrient]}</li>
                                                    )
                                                })}
                                            </ul>
                                        </>
                                    }
                                    <button className='macroMicro button' onClick={handleMacroMicro}>{
                                        showMacro
                                        ? 'Micronutrients'
                                        : 'Macronutrients'
                                    }</button>
                                </>
                                : <p>Oops, no nutrients</p>
                        }
                </div>

                {/* show or hide nutrients button */}
                <button className="button" onClick={() => handleHideShowNutrients(item, index)}>
                    {
                        showNutrients
                            ? "Hide "
                            : "Show "
                    }
                    Nutrients</button>

                {/* favourite button */}
                <button className='button favouriteButton' onClick={() => handleFavourite(item, index)}>Favourite</button>

                {/* compare button */}
                <button className='button compareButton' onClick={() => handleCompare(item, index)}>Compare</button>

            </li>
        )
    }

    // Results component return
    return (
        <div>

            {/* heading */}
            <h2>Results</h2>

            {/* unordered list of items */}
            <ul>

                {/* map each item to a Result component */}
                {items.map((item, index) => (
                    <Result key={

                        // if the type is 'generic'
                        item.type === 'generic'

                        // make the key the food name
                        ? item.food_name

                        // else make the key the item ID
                        : item.nix_item_id

                    } item={item} index={index} showNutrients={false} loading={false} nutrients={item.nutritionalInfo}/>

                ))}
            </ul>

            {/* compare and favourites component */}
            <Compare items={compareItems} />
            <Favourites items={favouriteItems}/>
        </div>
    )
}

export default Results;