import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Job Quest
        </p>
        <a
          className="App-link"
          href="https://github.com/BakshiShubhali/JobQuest/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          Welcome to Job Quest - a job tracker app created by and for jobseekers! Click here to check our repo!
        </a>
      </header>
      
    </div>
  );
}

export default App;
