PSEUDO-CODE

1. App Component:
    - Login Section:
        - import firebase authentication 
        - create state to hold if login is true or false 
        - pass down login information as props to Main component

2. Main Component:
    - Search bar:
        - create a state to hold search input (ex: [userQuery, setUserQuery] = useState("")) 
        - create a state to hold the radio button choice (ex: [branded, setBranded] = useState(false))
        - create a state to hold API results (ex: [items, setitems] = useState([]))

        - create input and assigned value to be search input (ex: value = {userQuery})
            - create two radio buttons (named generic and brand name) (generic is selected by default)

        - create event listener on text input (ex: onTextInput) -> to update the userQuery state variable [by setting state function to be the value of state variable -> ex: setUserQuery(e.target.value)]
        - create second event listener on radio input (ex: onRadioInput) -> if user selects brand name -> update the Branded state variable (by setting state function to be setBranded(true)) 

        - create search button with onClick event listener -> calls search function -> search function makes the axios API call to v2/search/instant endpoint (with userQuery as the query name [ex: query: userQuery])
            - create ternary 
                -> if (branded === true) -> setItems(response.branded)
                -> else -> setItems(response.common)

            - pass down items and branded state variables to result components 

3. Results Component:
    - create a state to hold props.items (ex: [resultsItems, setResultsItems] = useState(props.items)) 
    - create a state to hold chosen items to compare (ex: [compareItems, setCompareItems] = useState([]))

    - Items List:
        - loop through props.items 
            -> run a ternary
                -> if (props.branded === true) -> map through results -> for every item -> make axios API call to the search/items endpoint ("nix_item_id": {item.nix_item_id})
                    -> create an nutrition object -> loop through response.foods[0].full_nutrients -> use a switch statment to assign each attribute to known name and append name + value to the nutrition object  
                        -> ex: nutrition: {
                                    calories: 0,
                                    carbs: 6,
                                    protein: 7
                                }
                    -> append nutrition object as a property to the item (thus creating new array with nutrition object property)

                -> else -> forEach result (item) -> make axios API call to the natural/nutrients endpoint ("query": {item.food_name}) 
                    -> create an nutrition object -> loop through response -> use a switch statment to assign each attribute to known name and append name + value to the nutrition object  
                        -> ex: nutrition: {
                                    calories: 0,
                                    carbs: 6,
                                    protein: 7
                                }
                    -> append nutrition object as a property to the item (thus creating new array with nutrition object property)
            -> setResultsItems(newArray) 

        - map resultsItems to return 
            <li>
                <input type=checkbox>
                <h2>{]</h2>
                <img src={}>
                <button> ReadMore </button>
                    <div className=readMoreContent>
                        <ul>
                            This will have Nutrient Info
                        </ul>
                    </div>
            </li>
        - create Read More button (on each item) with onClick event listener -> displays .readMoreContent 
        - create checkbox with onClick event listener -> take that item and append to state variable compareItems 
        - if compareItems has data -> render compareComponent and pass down compareItems to compare component as props

4. Compare Component:
    - *This Component is collapsed by default*
    - create slide-out function (expanding width or compare component)

    - map through props.compareItems -> append each value to table and add a remove button -> onClick event listenr that removes item from table     
    - create slide-out button -> with onClick event listener that calls slide-out function
            