// import state functions
import { useEffect } from "react";

const Table = (props) => {

    // when props changes
    useEffect(() => {
        const micros = props.items[0].nutritionalInfo.micronutrients
        console.log(micros);


    }, [props])

    // get table row headings
    //const rowMacros = Object.keys(props.items[0].nutritionalInfo.macronutrients);

    /*
    micros.map(micro => {
                        return (
                            <li>{micro}</li>
                        )
                    }) 
    
    */


    /*
    // get table heading data
    const tableHeadingData =()=>{

        return rowMacros.map((data)=>{
            return <th key={data}>{data}</th>
        })

    }
    
    // get table column data
    const tableColumnData =() =>{

        return macros.map((data)=>{
            return(
                <tr>
                        {
                        rowMacros.map((v)=>{
                            return <td>{data[v]}</td>
                        })
                        }
                </tr>
            )
        })
    }

    */

    
    return (
        <section>
            <ul>
                {
                    
                }
            </ul>
        </section>
        // <table className="table">
        //     <thead>
        //         <tr>{tableHeadingData()}</tr>
        //     </thead>
        //     <tbody>
        //         {tableColumnData()}
        //     </tbody>
        // </table>
    )
}

export default Table;