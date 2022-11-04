import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    console.log('side effect is running')

  // nutritionix api docs (https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit)

  // axios call for search/instant endpoint
    // axios({
    //   url: 'https://trackapi.nutritionix.com/v2/search/instant',
    //   headers: {
    //     'x-remote-user-id': 0,
    //     'x-app-id': 'ee0fb754',
    //     'x-app-key': '14612cd5ce51f2bdb3034857e382ee9d'
    //   },
    //   params: {
    //     query: 'hot dog',
    //   }
    // }).then((results) => {
    //   console.log(results.data);
    // })

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

  }, [])

  return (
    <div className="App">
      <header>
        <h1>Nutrition Navigator</h1>
      </header>
      <main>
      </main>
      <footer>
        <p>Built by Anjalee Benedict, Dana Teagle, and Joel Nash at Juno College in 2022.</p>
      </footer>
    </div>
  );
}

export default App;
