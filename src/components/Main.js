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
import Results from './Results';

// Main component
const Main = (props) => {

  // initial stateful variable

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
        
        // when data comes back
        }).then((results) => {

          let updatedResults = '';

          // if results are generic
          if (resultsType === 'generic') {

            // update results
            updatedResults = results.data.common;

          // if the results are branded
          } else {

            // update results
            updatedResults = results.data.branded;
          }

          // for each result add the type
          updatedResults.forEach((updatedResult) => {
            updatedResult.type = resultsType
          })

          // set the results items state
          setResultsItems(updatedResults)
        })
  }

  // Main component return
  return(

      // wrapper
      <main className='wrapper'>

        {/* instructions */}
        <div className='instructions'>
        {
          // if logged in
          loggedIn
            // display the user id
            ? <p>Search for a food item (either brand name or generic)</p>
            : null
        }
        </div>

        {/* search bar */}
        <div className='userSearch'>
          <div className="searchBar">
          {/* search input */}
            <input type="text" placeholder="Enter a food item" value={userQuery} onInput={e => setUserQuery(e.target.value)} />
            <button onClick={search}>Search</button>
          </div>
          <div className="choices">
            <input type="radio" id="resultsType1" name="resultsType" value="generic" onChange={e => setResultsType(e.target.value)} defaultChecked /><label className='choice1' htmlFor="resultsType1">Generic Items</label>
            <input type="radio" id="resultsType2" name="resultsType" value="branded" onChange={e => setResultsType(e.target.value)} /><label htmlFor="resultsType2">Branded Items</label>
          </div>
        </div>

        {/* results component */}
        {
          resultsItems.length > 1
            ? <Results ID={user.ID} items={resultsItems} favouritesNumber={props.favouritesNumber}/>
            : null
        }
          
      </main>
  )

}

// export Main component
export default Main;