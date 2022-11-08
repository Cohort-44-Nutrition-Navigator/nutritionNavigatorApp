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
        States:
        - create a state to hold search input (ex: [userQuery, setUserQuery] = useState("")) 
        - create a state to hold the radio button choice (ex: [resultsType, setResultsType] = useState("generic"))
        - create a state to hold API list items (ex: [resultsItems, setResultsItems])
        - create a state to hold API results (ex: [items, setitems] = useState([]))


        - create input and assigned value to be search input (ex: value = {userQuery})
            - create two radio buttons (named generic and brand name) (generic is selected by default)

        - create event listener on text input (ex: e) -> to update the userQuery state variable [by setting state function to be the value of state variable -> ex: setUserQuery(e.target.value)]
        - create second event listener on radio input (ex: e) -> if user selects brand name or generic -> update the resultsType state variable to value of selection (by setting state function to be setResultsType(e.target.value)) 

        - create search button with onClick event listener -> calls search function -> search function makes the axios API call to v2/search/instant endpoint (with userQuery as the query name [ex: query: userQuery])
            - create if statement within .then()
                - if (resultsType === 'generic') 
                    -> setResultsItems(results.data.common)
                    -> create new array (ex: const newArray =[])
                    -> run a resultsItems.forEach, for every result: 
                        -> make axios API call to the v2/natural/nutrients endpoint ("query": {result.food_name}) 
                            -> create an empty nutrition object
                            -> const nutrientData = response.data.foods[0].full_nutrients
                            -> loop through response.data.foods[0].full_nutrients -> use a switch statment to assign each attribute to known name 
                                -> append name + value to the nutrition object  
                                    -> ex: nutrition: {
                                                calories: 0,
                                                carbs: 6,
                                                protein: 7
                                            }
                        -> append nutrition object as a property to the result (thus creating new array with nutrition object property)
                    -> setItem(newArray)
                - else (resultsType === 'branded') 
                    -> create new array (ex: const newArray =[])
                    -> run a resultsItems.forEach, for every result: 
                        -> make axios API call to the search/items endpoint ("nix_item_id": {result.nix_item_id}) 
                            -> create an empty nutrition object
                            -> const nutrientData = response.data.foods[0].full_nutrients
                            -> loop through response.data.foods[0].full_nutrients -> use a switch statment to assign each attribute to known name 
                                -> append name + value to the nutrition object  
                                    -> ex: nutrition: {
                                                calories: 0,
                                                carbs: 6,
                                                protein: 7
                                            }
                        -> append nutrition object as a property to the result (thus creating new array with nutrition object property)
                    -> setItem(newArray)
            - pass down items state variable to results component

3. Results Component:
    - create a state to hold props.items (ex: [resultsItems, setResultsItems] = useState(props.items)) 
    - create a state to hold chosen items to compare (ex: [compareItems, setCompareItems] = useState([]))

    - Items List:
        - map resultsItems to return 
            <li>
                <div>
                    <img src={}>
                    <h2>{]</h2>
                    <input type="checkbox" id="favourite">
                    <input type="checkbox" id="compare">
                </div>
                <ul>
                    {
                        resultsItems.map((result) => {
                            return (
                                <li><p>result.nutrition</p></li>
                            )
                        })
                    }
                </ul>
                <button> Micronutrients </button>
                <button className=readMore> Read More </button>
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
     
            