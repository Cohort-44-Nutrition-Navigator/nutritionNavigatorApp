// import styles
import './App.scss';

// import components
import Login from './Login';

// App Component
function App() {

  return (
    <div className="App">
      <header>
        <h1>Nutrition Navigator</h1>
      </header>
      <Login/>
      <footer>
        <p>Built by Anjalee Benedict, Dana Teagle, and Joel Nash at Juno College in 2022.</p>
      </footer>
    </div>
  );
}

// export App component
export default App;
