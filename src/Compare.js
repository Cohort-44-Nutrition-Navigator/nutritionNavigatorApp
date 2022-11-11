// import state functions
import { useEffect, useState } from "react";

// Compare component
const Compare = (props) => {

    const testArray= [
        {
            food_name: "peach",
            nutritionalInfo: {
                macronutrients: {
                    "Calories": "68.25 kcal",
                    "Carbohydrates": "16.7 g",
                    "Fat": "0.44 g",
                    "Fibre": "2.63 g",
                    "Protein": "1.59 g",
                    "Saturated Fat": "0.03 g",
                    "Sodium": "0 mg",
                    "Sugar": "14.68 g"
                },
                micronutrients: {
                    "Iron": "0.44 mg",
                    "Magnesium": "15.75 mg",
                    "Vitamin A": "570.5 IU",
                    "Vitamin B6": "0.04 mg",
                    "Vitamin C": "11.55 mg",
                    "Vitamin D": "0 IU",
                    "Vitamin E": "1.28 mg",
                    "Zinc": "0.3 mg"
                }
            },
            serving_qty: 1,
            serving_unit: "large (2-3/4\" dia)",
            tag_id: "225",
            tag_name: "peach",
            type: "generic"
        },
        {
            food_name: "grilled peaches",
            nutritionalInfo: {
                macronutrients: {
                    "Calories": "251.36 kcal",
                    "Carbohydrates": "53.2 g",
                    "Fat": "2.85 g",
                    "Fibre": "3.21 g",
                    "Protein": "2.3 g",
                    "Saturated Fat": "0.22 g",
                    "Sodium": "22.64 mg",
                    "Sugar": "47.71 g"
                },
                micronutrients: {
                    "Iron": "1.36 mg",
                    "Magnesium": "31.16 mg",
                    "Vitamin A": "583.08 IU",
                    "Vitamin B6": "0.05 mg",
                    "Vitamin C": "11.55 mg",
                    "Vitamin D": "0 IU",
                    "Vitamin E": "1.81 mg",
                    "Zinc": "0.4 mg"
                }
            },
            serving_qty: 1,
            serving_unit: "whole peach",
            tag_id: "6612",
            tag_name: "grilled peach",
            type: "generic"
        },
        {
            food_name: "applejuice",
            nutritionalInfo: {
                macronutrients: {
                    "Calories": "114.08 kcal",
                    "Carbohydrates": "28.02 g",
                    "Fat": "0.32 g",
                    "Fibre": "0.5 g",
                    "Protein": "0.25 g",
                    "Saturated Fat": "0.05 g",
                    "Sodium": "9.92 mg",
                    "Sugar": "23.86 g"
                },
                micronutrients: {
                    "Iron": "0.3 mg",
                    "Magnesium": "12.4 mg",
                    "Vitamin A": "2.48 IU",
                    "Vitamin B6": "0.04 mg",
                    "Vitamin C": "95.48 mg",
                    "Vitamin D": "0 IU",
                    "Vitamin E": "0.02 mg",
                    "Zinc": "0.05 mg"
                }
            },
            serving_qty: 1,
            serving_unit: "cup",
            tag_id: "385",
            tag_name: "apple juice",
            type: "generic"
        }
    ]


    // initial compare state
    const [ compareItems, setCompareItems ] = useState([]);

    const micros = testArray[0].nutritionalInfo.micronutrients;

    // when props changes
    useEffect(() => {

        // set compareItems to the array passed down from Results through props
        setCompareItems(props.items);

        /*
        // create comparison table
        renderTable() {
            compareItems.map((item) => {
                console.log(item);
            })
        }
        */

    }, [props.items])

    // Compare component return
    return (
        <section>
            <h2>Compare Foods</h2>

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Serving Size</th>
                        {Object.keys(testArray[0].nutritionalInfo.macronutrients).map((nutrient, index) => {
                            return (
                                <th key={index}>{nutrient}</th>
                            )
                        })}
                        {Object.keys(testArray[0].nutritionalInfo.micronutrients).map((nutrient, index) => {
                            return (
                                <th key={index}>{nutrient}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    
                        {testArray.map((item, index) => {
                           return(
                                <tr>
                                    <td key={index+"name"}>{item.food_name}</td>
                                    <td key={index+"serving"}>{item.serving_unit}</td>
                                    {Object.keys(item.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                        return (
                                            <td key={index}>{item.nutritionalInfo.macronutrients[nutrient]}</td>
                                        )
                                    })}
                                    {Object.keys(item.nutritionalInfo.micronutrients).map((nutrient, index) => {
                                        return (
                                            <td key={index}>{item.nutritionalInfo.micronutrients[nutrient]}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>




            {/* {
                compareItems.length !== 0
                ? <ul>

                    {compareItems.map((compareItem) => {
                        return(
                            <li key={compareItem.food_name}>
                                <p>{compareItem.food_name}</p>
                            </li>
                        )
                    })}

                </ul>
                : <p>Click the compare icon on food items to add them to the compare table!</p> 
            } */}




            
        </section>
    )
}

export default Compare;