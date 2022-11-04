import './App.css';
import Main from './Main';
import Favourites from './Favourites';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Nutrition Navigator</h1>
      </header>
      <Main />
      <Favourites />
      <footer>
        <p>Built by Anjalee Benedict, Dana Teagle, and Joel Nash at Juno College in 2022.</p>
      </footer>
    </div>
  );
}

export default App;
