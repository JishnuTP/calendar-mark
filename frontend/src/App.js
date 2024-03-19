import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register';
import UserRoute from './Routes/route';


function App() {
  return (
    
    <div className="App">
    
        <BrowserRouter>
        <Routes>
        {UserRoute()}

        </Routes>
          </BrowserRouter>
          </div>
            


         

     
       
  );
}

export default App;
