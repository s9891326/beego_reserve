import logo from './logo.svg';
import Calendar from './calendar/Calendar';
import './App.css';

function App() {
  return (
    <div className="App">
    <Calendar />
    <span>123456</span>
    <h1>預約日曆</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
