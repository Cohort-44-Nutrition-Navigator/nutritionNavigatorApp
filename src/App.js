// import styles
import './App.scss';

// import components
import Login from './components/Login';

// App component
function App() {

  // App component return
  return (

    // App div
    <div className="App">

      {/* Login component */}
      <Login />

      {/* footer */}
      <footer>
        <p>Built by <a href="https://anjaleebenedict.com/" target="_blank" rel="noreferrer">Anjalee Benedict</a>, <a href="https://danateagle.com" target="_blank" rel="noreferrer">Dana Teagle</a>, and <a href="https://www.joelnash.ca/" target="_blank" rel="noreferrer">Joel Nash</a> using the <a href="https://www.nutritionix.com/business/api" target="_blank" rel="noreferrer">Nutritionix API</a> at <a href="https://junocollege.com" target="_blank" rel="noreferrer">Juno College</a> in 2022.</p>
      </footer>
      
    </div>
  );
}

// export App component
export default App;
