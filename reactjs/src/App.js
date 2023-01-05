import logo from './logo.svg';
import './App.css';
import {cc} from "./common/variables";
import {slidingWindows} from "./sections/sliding";
import {twoPointers} from "./sections/two-pointers";
import {fastAndSlowPointers} from "./sections/fast-and-slow-pointers";


slidingWindows();
twoPointers();
fastAndSlowPointers();


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;




