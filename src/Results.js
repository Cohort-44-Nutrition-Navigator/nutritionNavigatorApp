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
    const [items, setItems] = useState(props.items);
    const [ID, setID] = useState(props.ID);
    const [favouriteItems, setFavouriteItems] = useState([]);
    const [compareItems, setCompareItems] = useState([]);

    // reset items and ID state whenever props causes a re-render
    useEffect(() => {

        setItems(props.items);
        setID(props.ID);

    }, [props])

    // favourite item function
    const handleFavourite = (item, index) => {

        // if the user is a guest
        if (ID === 'guest') {

            // create a new favourite items array
            const newFavouriteItems = favouriteItems;

            // if the item has nutritional info already
            if (item.nutritionalInfo) {

                // push the item to the new favourite items array
                newFavouriteItems.push(item);

                // set the favourite items state to new array
                setFavouriteItems(newFavouriteItems);

                // if the item does not have nutritional info
            } else {

                const updatedItem = item;

                // run the second API call on the item
                nutrientApiSearch(updatedItem, index);

                // push the updated item to the new favourite items array
                newFavouriteItems.push(updatedItem);

                // set the favourite items state to new array
                setFavouriteItems(newFavouriteItems);

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
        if (item.nutritionalInfo) {

            // push the item to the new compare items array
            newCompareItems.push(item);
            // set the compare items state to new array
            setCompareItems(newCompareItems);

            // if the item does not have nutritional info
        } else {

            const updatedItem = item;

            // run the second API call on the item
            nutrientApiSearch(updatedItem, index);

            // push the updated item to the new compare items array
            newCompareItems.push(updatedItem);

            // set the compare items state to new array
            setCompareItems(newCompareItems);

        }
    }

    // function to call second API endpoint 
    const nutrientApiSearch = ((item, index) => {

        // create nutrition object to hold nutritional info
        const nutrition = {
            macronutrients: {
                'Calories': "",
                'Carbohydrates': "",
                'Fibre': "",
                'Protein': "",
                'Sodium': "",
                'Sugar': "",
                'Fat': "",
                'Saturated Fat': "",
            },
            micronutrients: {
                'Vitamin A': "",
                'Vitamin D': "",
                'Vitamin B6': "",
                'Vitamin C': "",
                'Vitamin E': "",
                'Magnesium': "",
                'Zinc': "",
                'Iron': "",
            }
        };

        // switch function to match attr_id number with corresponding values
        const switchFunction = ((nutrient) => {
            switch (nutrient.attr_id) {
                case 208:
                    nutrition.macronutrients['Calories'] = (Math.round(nutrient.value * 100) / 100) + ' kcal'
                    break;
                case 205:
                    nutrition.macronutrients['Carbohydrates'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 291:
                    nutrition.macronutrients['Fibre'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 203:
                    nutrition.macronutrients['Protein'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 307:
                    nutrition.macronutrients['Sodium'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 269:
                    nutrition.macronutrients['Sugar'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 204:
                    nutrition.macronutrients['Fat'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 606:
                    nutrition.macronutrients['Saturated Fat'] = (Math.round(nutrient.value * 100) / 100) + ' g'
                    break;
                case 318:
                    nutrition.micronutrients['Vitamin A'] = (Math.round(nutrient.value * 100) / 100) + ' IU'
                    break;
                case 324:
                    nutrition.micronutrients['Vitamin D'] = (Math.round(nutrient.value * 100) / 100) + ' IU'
                    break;
                case 415:
                    nutrition.micronutrients['Vitamin B6'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 401:
                    nutrition.micronutrients['Vitamin C'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 323:
                    nutrition.micronutrients['Vitamin E'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 304:
                    nutrition.micronutrients['Magnesium'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 309:
                    nutrition.micronutrients['Zinc'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                case 303:
                    nutrition.micronutrients['Iron'] = (Math.round(nutrient.value * 100) / 100) + ' mg'
                    break;
                default:
                    break;
            }
        })

        // if the food type is 'generic'
        if (item.type === 'generic') {

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
                    "query": item.food_name
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
                item.nutritionalInfo = nutrition;

                const updatedItems = items;

                updatedItems[{ index }] = item;

                setItems(updatedItems);

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
                    'nix_item_id': item.nix_item_id
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
                item.nutritionalInfo = nutrition;

                const updatedItems = items;

                updatedItems[{ index }] = item;

                setItems(updatedItems);

            })
        }
    })

    // individual Result component (takes item, index, and showNutrients as props)
    const Result = (props) => {

        // iniitial state variables
        const [showNutrients, setShowNutrients] = useState(props.showNutrients);
        const [showMacro, setShowMacro] = useState(true);

        // initial props variables
        const item = props.item;
        const index = props.index;

        // hide or show nutrients function
        const handleHideShowNutrients = (item, index) => {

            const updatedItem = item;

            // if nutrients are showing
            if (showNutrients) {

                // hide the nutrients
                setShowNutrients(false);

            } else {

                // if item doesn't already have nutritional info
                if (!updatedItem.nutritionalInfo) {

                    nutrientApiSearch(item, index)

                    setTimeout(() => {

                        setShowNutrients(true);

                    }, 500)

                } else {

                    setShowNutrients(true);

                }
            }
        }

        // on click of the macro/micronutrients button
        const handleMacroMicro = () => {

            // if macronutrients are showing
            if (showMacro) {

                // show micronutrients
                setShowMacro(false);
            } else {

                // else show macronutrients
                setShowMacro(true);
            }
        }

        // individual Result component return
        return (

            // create a list item
            <li>

                {/* insert image */}
                <img src={item.photo.thumb} alt="" />

                {/* insert item name */}
                <p>{item.food_name}</p>

                {/* nutrient div */}
                <div style={

                    // if nutrients are supposed to show
                    showNutrients

                        // display nutrients
                        ? { display: "initial" }

                        // else hide nutrients
                        : { display: "none" }

                }>
                    {
                        item.nutritionalInfo
                            ? <>
                                {
                                    // if the macronutrients are supposed to show
                                    showMacro

                                        // display macronutrients
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

                                        // else display micronutrients
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

                                {/* macronutrient/micronutrient button */}
                                <button className='macroMicro button' onClick={handleMacroMicro}>{
                                    showMacro
                                        ? 'Micronutrients'
                                        : 'Macronutrients'
                                }</button>
                            </>

                            // if the item doesn't have nutrient data, show error message
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
                    <>
                        <Result key={

                            // if the type is 'generic'
                            item.type === 'generic'

                                // make the key the food name
                                ? item.food_name

                                // else make the key the item ID
                                : item.nix_item_id

                        } item={item} index={index} showNutrients={false} nutrients={item.nutritionalInfo} />

                        {/* favourite button */}
                        <button className='button favouriteButton' onClick={() => handleFavourite(item, index)}>Favourite</button>

                        {/* compare button */}
                        <button className='button compareButton' onClick={() => handleCompare(item, index)}>Compare</button>
                    </>
                ))}
            </ul>

            {/* compare and favourites component */}
            <Compare items={compareItems} />
            <Favourites items={favouriteItems} />
        </div>
    )
}

export default Results;