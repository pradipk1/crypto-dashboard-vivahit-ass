
import './App.css';
import CryptoDashboard from './components/CrptoDashboard/CryptoDashboard';
import CryptoList from './components/CryptoList/CryptoList';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<CryptoList />} />
        <Route path='/dashboard/:symbol' element={<CryptoDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
