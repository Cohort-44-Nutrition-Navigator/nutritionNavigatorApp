// import state functions
import { useState, useEffect } from 'react';

// import axios function
import axios from 'axios';

// import components
import Favourites from './Favourites';

// Main component
const Main = (props) => {

  // initial state variable
  const [ userQuery, setUserQuery ] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState({})

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
            'x-app-id': 'ee0fb754',
            'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
          },
          params: {
            query: userQuery,
          }
        }).then((results) => {
          console.log(results.data);
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