// import styles
import './App.scss';

// import components
import Login from './Login';

// App Component
function App() {

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Nutrition Navigator</h1>
        </div>
      </header>
      <Login/>
      <footer>
        <div className="wrapper">
          <p>Built by Anjalee Benedict, Dana Teagle, and Joel Nash at Juno College in 2022.</p>
        </div>
      </footer>
    </div>
  );
}

// export App component
export default App;
