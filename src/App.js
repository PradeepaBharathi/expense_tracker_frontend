import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/home/Home';
import Transactions from './components/transactions/Transactions';
import Nav from './components/Nav/Navbar';
import AddExpense from './components/add/AddExpense';
import Charts from './components/charts/Charts';
import Account from './components/account/Account';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/*" element={
            <>
              <Nav />
              <Routes>
                <Route path='home' element={<Home />} />
                <Route path="addExpense" element={<AddExpense />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="charts" element={<Charts />} />
                <Route path="account" element={<Account />} />
              </Routes>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
