import { useEffect, useState } from 'react';

const Compare = (props) => {

    const [ items, setItems ] = useState(props.items);

    useEffect(() => {

        setItems(props.items);

    }, [props])

    return (
        <>
          <h2>This is Comparison Component</h2>
          <p>I have {items.length} items</p>
        </>
    )
}

export default Compare;