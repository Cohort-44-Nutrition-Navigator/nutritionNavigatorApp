// import state functions
import { useEffect, useState } from "react";

// Compare component
const Compare = (props) => {

    // const testArray= [
    //     {
    //         food_name: "peach",
    //         nutritionalInfo: {
    //             macronutrients: {
    //                 "Calories": "68.25 kcal",
    //                 "Carbohydrates": "16.7 g",
    //                 "Fat": "0.44 g",
    //                 "Fibre": "2.63 g",
    //                 "Protein": "1.59 g",
    //                 "Saturated Fat": "0.03 g",
    //                 "Sodium": "0 mg",
    //                 "Sugar": "14.68 g"
    //             },
    //             micronutrients: {
    //                 "Iron": "0.44 mg",
    //                 "Magnesium": "15.75 mg",
    //                 "Vitamin A": "570.5 IU",
    //                 "Vitamin B6": "0.04 mg",
    //                 "Vitamin C": "11.55 mg",
    //                 "Vitamin D": "0 IU",
    //                 "Vitamin E": "1.28 mg",
    //                 "Zinc": "0.3 mg"
    //             }
    //         },
    //         serving_qty: 1,
    //         serving_unit: "large (2-3/4\" dia)",
    //         tag_id: "225",
    //         tag_name: "peach",
    //         type: "generic"
    //     },
    //     {
    //         food_name: "grilled peaches",
    //         nutritionalInfo: {
    //             macronutrients: {
    //                 "Calories": "251.36 kcal",
    //                 "Carbohydrates": "53.2 g",
    //                 "Fat": "2.85 g",
    //                 "Fibre": "3.21 g",
    //                 "Protein": "2.3 g",
    //                 "Saturated Fat": "0.22 g",
    //                 "Sodium": "22.64 mg",
    //                 "Sugar": "47.71 g"
    //             },
    //             micronutrients: {
    //                 "Iron": "1.36 mg",
    //                 "Magnesium": "31.16 mg",
    //                 "Vitamin A": "583.08 IU",
    //                 "Vitamin B6": "0.05 mg",
    //                 "Vitamin C": "11.55 mg",
    //                 "Vitamin D": "0 IU",
    //                 "Vitamin E": "1.81 mg",
    //                 "Zinc": "0.4 mg"
    //             }
    //         },
    //         serving_qty: 1,
    //         serving_unit: "whole peach",
    //         tag_id: "6612",
    //         tag_name: "grilled peach",
    //         type: "generic"
    //     },
    //     {
    //         food_name: "applejuice",
    //         nutritionalInfo: {
    //             macronutrients: {
    //                 "Calories": "114.08 kcal",
    //                 "Carbohydrates": "28.02 g",
    //                 "Fat": "0.32 g",
    //                 "Fibre": "0.5 g",
    //                 "Protein": "0.25 g",
    //                 "Saturated Fat": "0.05 g",
    //                 "Sodium": "9.92 mg",
    //                 "Sugar": "23.86 g"
    //             },
    //             micronutrients: {
    //                 "Iron": "0.3 mg",
    //                 "Magnesium": "12.4 mg",
    //                 "Vitamin A": "2.48 IU",
    //                 "Vitamin B6": "0.04 mg",
    //                 "Vitamin C": "95.48 mg",
    //                 "Vitamin D": "0 IU",
    //                 "Vitamin E": "0.02 mg",
    //                 "Zinc": "0.05 mg"
    //             }
    //         },
    //         serving_qty: 1,
    //         serving_unit: "cup",
    //         tag_id: "385",
    //         tag_name: "apple juice",
    //         type: "generic"
    //     }
    // ]

    // initial compare state
    const [compareItems, setCompareItems] = useState(props.items);

    // state for Compare slider button
    const [compareOpen, setCompareOpen] = useState(false);

    const handleUncompare = props.remove;

    // const micros = testArray[0].nutritionalInfo.micronutrients;

    // when props changes
    useEffect(() => {

        // set compareItems to the array passed down from Results through props
        setCompareItems(props.items);

    }, [props])

    const handleOpenCompare = () => {
        setCompareOpen(!compareOpen)
    }

    const nutrientTable = (
        compareItems.length > 0
            ? <table>
                <thead>
                    <tr>
                        <th className="tableItem">Item</th>
                        <th className="tableServing">Serving Size</th>
                        <th className="tableMacros">Macronutrients</th>
                        {Object.keys(compareItems[0].nutritionalInfo.macronutrients).map((nutrient, index) => {
                            return (
                                <th key={index}>{nutrient}:</th>
                            )
                        })}
                        <th className="tableMicros">Micronutrients</th>
                        {Object.keys(compareItems[0].nutritionalInfo.micronutrients).map((nutrient, index) => {
                            return (
                                <th key={index}>{nutrient}:</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>

                    {compareItems.map((item, index) => {
                        return (
                            <>
                                {
                                    item.nutritionalInfo
                                        ? <tr>
                                            <td key={index + "name"} className="tableItem">{item.food_name}<button onClick={() => handleUncompare(item, index, "compare")}><i className="fa fa-minus-circle minusButton" aria-hidden="true"></i></button></td>
                                            <td key={index + "serving"} className="tableServing">{item.serving_unit}</td>
                                            {Object.keys(item.nutritionalInfo.macronutrients).map((nutrient, index) => {
                                                return (
                                                    <td key={index}>{item.nutritionalInfo.macronutrients[nutrient]}</td>
                                                )
                                            })}
                                            <td className="tableFiller"></td>
                                            {Object.keys(item.nutritionalInfo.micronutrients).map((nutrient, index) => {
                                                return (
                                                    <td key={index}>{item.nutritionalInfo.micronutrients[nutrient]}</td>
                                                )
                                            })}
                                        </tr>
                                        : null
                                }
                            </>
                        )
                    })}
            </tbody >
        </table >
        : <p>Add items from search results with the scale icon to compare nutrients!</p>
    )

// Compare component return
return (
    <section className=
        {
            compareOpen
                ? "compare open"
                : "compare"
        }

    >
        <div className="compareSliderTab">
            <div className="scaleIcon">
                <i className=
                    {
                        compareItems.length === 0
                            ? "fa fa-balance-scale"
                            : "fa fa-balance-scale compareHighlighted"
                    }
                    aria-hidden="true"></i>
                <span>{compareItems.length}</span>
            </div>
            <button onClick={handleOpenCompare}>
                <i className={
                    compareOpen
                        ? "compareSliderButton fa fa-chevron-circle-right"
                        : "compareSliderButton fa fa-chevron-circle-left"
                }
                    aria-hidden="true"></i>
            </button>
        </div>
        <div className={
            compareOpen
                ? "compareContent showCompare"
                : "compareContent"
        }>
            <h2>Compare Foods</h2>
            {nutrientTable}
        </div>

    </section>
)
}

export default Compare;