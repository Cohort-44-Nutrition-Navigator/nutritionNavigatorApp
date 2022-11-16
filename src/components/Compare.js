// import state functions
import { useEffect, useState } from "react";

// Compare component
const Compare = (props) => {

    // initial compare state
    const [compareItems, setCompareItems] = useState(props.items);

    // state for Compare slider button
    const [compareOpen, setCompareOpen] = useState(false);

    // uncompare function
    const handleUncompare = props.remove;

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
                                            <td key={index + "name"} className="tableItem">{item.food_name}<button title="Remove from compare" onClick={() => handleUncompare(item, index, "compare")}><i className="fa fa-minus-circle minusButton" aria-hidden="true"></i></button></td>
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
            <button title="Show items added to compare" onClick={handleOpenCompare}>
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