PSEUDO-CODE

1. App Component:
    - import firebase authentication 
    - create state called loggedIn to hold if login is true or false (default is false)

    - Login Section:
        - Three buttons: Login, Register, Continue as Guest
        - save loggedIn as true
            - if login or register
                -> save unique user information (email & ID) as state
            - if Continue as Guest
                -> save guest user information (guest@nutritionnavigator.com & 'guest') as state
        - if loggedIn is true
            -> render Main component
            -> pass down loggedIn state & user state to Main compomonent as props

2. Main Component:
    - if props.user.ID === 'guest'
        -> createContext to represent temporary favourites
    - if props.user.ID === 'unique ID'
        -> connect to specific firebase node (that equals user.ID)

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
        - create Favourites button with onClick event listener -> calls favourites function
        - Favorites function:
            - if props.user.ID === 'guest'
                -> add selected item to favouritesContext
            - if props.user.ID === 'unique user ID'
                -> push selected item to their firebase node

    
4. Compare Component:
    - *This Component is collapsed by default*
    - create slide-out function (expanding width or compare component)

    - map through props.compareItems -> append each value to table and add a remove button -> onClick event listener that removes item from table     
    - create slide-out button -> with onClick event listener that calls slide-out function

5. Favourites Component:
    - if the props.user.ID === 'guest'
        -> display favoritesContext as li on page
        -> add a remove button -> onClick event listener that removes item from favouritesContext
    - if the props.user.ID === 'unique user ID'
        -> retrieve data from specific user's firebase node and display as li on page
        -> add a remove button -> onClick event listener that removes item from user's firebase node
     
            