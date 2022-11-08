//API KEYS
  // First Account:
    // 'x-app-id': 'ee0fb754',
    // 'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d',
  // Second Account:
    // 'x-app-id': '0eb5f22d',
    // 'x-app-key': 'd6fd704a091aeaa5c06a629aa96a56d0'

// import state functions
import { useState, useEffect } from 'react';

// import axios function
import axios from 'axios';

// import components
import Favourites from './Favourites';

// Main component
const Main = (props) => {

  // initial state variable
    // state variables for login
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    // state variables for api call & api data
    const [ userQuery, setUserQuery ] = useState('');
    const [resultsType, setResultsType] = useState("generic")
    const [resultsItems, setResultsItems] = useState([])

  // when props.loggedIn changes
  useEffect(() => {

    // if logged in
    if (props.loggedIn === true){

      // set login states
      setLoggedIn(true);
      setUser(props.user);

    // else
    } else {

      // empty login states
      setLoggedIn(false);
      setUser({});
    }
  }, [props.loggedIn, props.user])

  

  // search function
  const search = () => {

    console.log(userQuery)

    // nutritionix api docs (https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit)

    // axios call for search/instant endpoint
        axios({
          url: 'https://trackapi.nutritionix.com/v2/search/instant',
          headers: {
            'x-remote-user-id': 0,
            // API KEY 1
              // 'x-app-id': 'ee0fb754',
              // 'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d',
            // API KEY 2
            'x-app-id': '0eb5f22d',
            'x-app-key': 'd6fd704a091aeaa5c06a629aa96a56d0'
          },
          params: {
            query: userQuery,
          }
        }).then((results) => {
          // created nutrition object to hold nutritional info
          const nutrition = {
            macronutrients: {
              calories: "",
              carbohydrates: "",
              fibre: "",
              protein: "",
              sodium: "",
              sugar: "",
              fat: "",
              saturatedFat: "",
            },
            micronutrients: {
              vitaminA: "",
              vitaminD: "",
              vitaminB6: "",
              vitaminC: "",
              vitaminE: "",
              magnesium: "",
              zinc: "",
              iron: "",
            }
          };
          // create switch function to switch attr_id number with corresponding values
          const switchFunction = ((nutrient) => {
            switch (nutrient.attr_id) {
              case 208:
                nutrition.macronutrients.calories = nutrient.value
                break;
              case 205:
                nutrition.macronutrients.carbohydrates = nutrient.value
                break;
              case 291:
                nutrition.macronutrients.fibre = nutrient.value
                break;
              case 203:
                nutrition.macronutrients.protein = nutrient.value
                break;
              case 307:
                nutrition.macronutrients.sodium = nutrient.value
                break;
              case 269:
                nutrition.macronutrients.sugar = nutrient.value
                break;
              case 204:
                nutrition.macronutrients.fat = nutrient.value
                break;
              case 606:
                nutrition.macronutrients.saturatedFat = nutrient.value
                break;
              case 318:
                nutrition.micronutrients.vitaminA = nutrient.value
                break;
              case 324:
                nutrition.micronutrients.vitaminD = nutrient.value
                break;
              case 415:
                nutrition.micronutrients.vitaminB6 = nutrient.value
                break;
              case 401:
                nutrition.micronutrients.vitaminC = nutrient.value
                break;
              case 323:
                nutrition.micronutrients.vitaminE = nutrient.value
                break;
              case 304:
                nutrition.micronutrients.magnesium = nutrient.value
                break;
              case 309:
                nutrition.micronutrients.zinc = nutrient.value
                break;
              case 303:
                nutrition.micronutrients.iron = nutrient.value
                break;
              default:
                break;
            }
          })
          if (resultsType === 'generic') {
            setResultsItems(results.data.common.slice(0, 3));
            // **NOTE** : added.slice(0, 3) to limit our API Call to 2 results (just during the testing phase)
            resultsItems.forEach((result) => {
              axios({
                  method: "post",
                  url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                  headers: {
                      // API KEY 1
                        // "x-app-id": "ee0fb754",
                        // "x-app-key": "14612cd5ce51f2bdb3034857e382ee9d",
                      // API KEY 2
                      "x-app-id": "0eb5f22d",
                      "x-app-key": "d6fd704a091aeaa5c06a629aa96a56d0",
                      "x-remote-user-id": "0",
                  },
                  data: {
                      "query": result.food_name
                  }
              }).then((response) => {
                  // created nutrientData variable to store array of nutrient codes
                  const nutrientData = response.data.foods[0].full_nutrients
                  // loop through nutrient codes and call switch function on each one
                  nutrientData.forEach((nutrient) => {
                    switchFunction(nutrient);
                  })
              // added an extra .then (to wait until all the nutrient names and values are added to the nutrition object)
              }).then(() => {
                // add propery called "nutritionalInfo" with value of nutrition object to each result 
                result.nutritionalInfo = nutrition;
              })
            })
            // now the resultsItems state variable has the updated array with foods + their nutritional information
            console.log(resultsItems)
          } else {
            setResultsItems(results.data.branded.slice(0, 2))
            // **NOTE** : added.slice(0, 2) to limit our API Call to 2 results (just during the testing phase)
            resultsItems.forEach((result) => {
              axios({
                method: "get",
                url: 'https://trackapi.nutritionix.com/v2/search/item',
                headers: {
                  'x-remote-user-id': '0',
                  // API KEY 1
                  'x-app-id': 'ee0fb754',
                  'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
                  // API KEY 2
                  // 'x-app-id': '0eb5f22d',
                  // 'x-app-key': 'd6fd704a091aeaa5c06a629aa96a56d0'
                },
                params: {
                  'nix_item_id': result.nix_item_id
                }
              }).then((response) => {
                // created nutrientData variable to store array of nutrient codes
                const nutrientData = response.data.foods[0].full_nutrients;
                // loop through nutrient codes and call switch function on each one
                nutrientData.forEach((nutrient) => {
                  switchFunction(nutrient);
                })
              // added an extra .then (to wait until all the nutrient names and values are added to the nutrition object)
              }).then(() => {
                // add propery called "nutritionalInfo" with value of nutrition object to each result 
                result.nutritionalInfo = nutrition;
              })
            })
            // now the resultsItems state variable has the updated array with foods + their nutritional information
            console.log(resultsItems)
          }
        })

    // axios call for search/item endpoint
        // axios({
        //   url: 'https://trackapi.nutritionix.com/v2/search/item',
        //   headers: {
        //     'x-remote-user-id': 0,
        //     'x-app-id': 'ee0fb754',
        //     'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
        //   },
        //   params: {
        //     'nix_item_id': 'd3ea6413efc0dacf7aafd8f9',
        //   }
        // }).then((results) => {
        //   console.log(results.data);
        // })

        // returns full nutrient breakdown with attr_ids (https://docs.google.com/spreadsheets/d/14ssR3_vFYrVAidDLJoio07guZM80SMR5nxdGpAX-1-A/edit#gid=0)

    // axios call for natural/nutrients endpoint
        // axios({
        //     method: "post",
        //     url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        //     headers: {
        //         "x-app-id": "ee0fb754",
        //         "x-app-key": "14612cd5ce51f2bdb3034857e382ee9d",
        //         "x-remote-user-id": "0",
        //     },
        //     data: {
        //         "query": "hot dog"
        //     }
        // }).then((response) => {
        //     console.log(response.data.foods[0].full_nutrients);
        // })
  }

  // Main component return
  return(
      <main>

          {/* search input */}
          <input type="text" placeholder="Enter a query" value={userQuery} onInput={e => setUserQuery(e.target.value)} />
          <button onClick={search}>Search</button>
          <input type="radio" id="resultsType1" name="resultsType" value="generic" onChange={e => setResultsType(e.target.value)} defaultChecked/><label htmlFor="resultsType1">Generic Items</label>
          <input type="radio" id="resultsType2" name="resultsType" value="branded" onChange={e => setResultsType(e.target.value)}/><label htmlFor="resultsType2">Branded Items</label>

          {
              // if logged in
              loggedIn
              // display the user id
              ? <>
                  <p>Welcome to the page, {user.email}. Your unique ID is {user.ID}.</p>
                  <Favourites ID={user.ID} />
                </>
              : <p>Please log in.</p>
          }
      </main>
  )

}

// export Main component
export default Main;