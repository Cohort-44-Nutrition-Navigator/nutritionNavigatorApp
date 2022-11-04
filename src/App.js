// import CSS styles
import './App.css';
// import Components
import Main from './Main';
// import Hooks
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Nutrition Navigator</h1>
      </header>
      <Main />
      <footer>
        <p>Built by Anjalee Benedict, Dana Teagle, and Joel Nash at Juno College in 2022.</p>
      </footer>
    </div>
  );
}

export default App;
