import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import './CryptoDashboard.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function CryptoDashboard() {

    const [crypto, setCrypto] = useState({});
    const [historicalData, setHistoricalData] = useState([]);

    const {symbol} = useParams();

    const getCrypto = async () => {
        const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
            params: {
                fsyms: symbol,
                tsyms: 'USD'
            }
        });

        console.log(response);
        setCrypto(response.data);
    }

    const getHistoricalData = async () => {
        const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
            params: {
                fsym: symbol,
                tsym: 'USD',
                limit: 100
            }
        });

        setHistoricalData(response.data.Data.Data);
        // console.log(response.data.Data.Data);
    }

    const chartData = {
        labels: historicalData.map(point => point.time),
        datasets: [
          {
            label: symbol,
            data: historicalData.map(point => point.close),
            borderColor: 'green',
          },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
        },
    }

    useEffect(() => {
        getCrypto();
        getHistoricalData();
    }, []);

  return (
    <div className='cryptoDashboardMainCont'>
        {
            Object.keys(crypto).length > 0 && 
            <div className='cryptoInfCont'>
                <p style={{fontWeight: '600'}}>{symbol}</p>
                <p>{crypto.DISPLAY[symbol].USD.PRICE}</p>
                {
                    crypto.DISPLAY[symbol].USD.CHANGEPCTHOUR >=0 ? <span style={{color: '#16c784'}}>↑ {crypto.DISPLAY[symbol].USD.CHANGEPCTHOUR}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(crypto.DISPLAY[symbol].USD.CHANGEPCTHOUR)}%</span>
                }
                {
                    crypto.DISPLAY[symbol].USD.CHANGEPCT24HOUR >=0 ? <span style={{color: '#16c784'}}>↑ {crypto.DISPLAY[symbol].USD.CHANGEPCT24HOUR}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(crypto.DISPLAY[symbol].USD.CHANGEPCT24HOUR)}%</span>
                }
                {
                    crypto.DISPLAY[symbol].USD.CHANGEPCTDAY >=0 ? <span style={{color: '#16c784'}}>↑ {crypto.DISPLAY[symbol].USD.CHANGEPCTDAY}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(crypto.DISPLAY[symbol].USD.CHANGEPCTDAY)}%</span>
                }
            </div>
        }
        
        <h2 style={{marginBottom: '20px', minWidth: '700px'}}>{symbol} Price Chart</h2>
        <div>
            {
                historicalData.length > 0 && <Line style={{minWidth: '700px', margin: 'auto', maxHeight: '300px'}} data={chartData} options={options} />
            }
        </div>
    </div>
  )
}

export default CryptoDashboard;