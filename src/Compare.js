// import state functions
import { useEffect, useState } from "react";

// Compare component
const Compare = (props) => {

    // initial compare state
    const [ compareItems, setCompareItems ] = useState([]);

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

    }, [props])

    // Compare component return
    return (
        <section>
            <h2>Compare Foods</h2>
            {
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
            }
        </section>
    )
}

export default Compare;