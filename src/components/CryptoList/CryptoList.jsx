import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './CryptoList.css';
import { Link } from 'react-router-dom';


function CryptoList() {

    const [cryptoList, setCryptoList] = useState({});
    
    const getCryptoList = async () => {
        const response = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
            params: {
                fsyms: 'BTC,ETH,USDT,BNB,SOL,XRP,USDC,ADA,DOGE,SHIB,AVAX,DOT,TRX,LINK,MATIC,TON,UNI,BCH,ICP,LTC',
                tsyms: 'USD'
            }
        });

        // console.log(response);
        setCryptoList(response.data);
    }

    useEffect(() => {
        getCryptoList();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(interval);
            getCryptoList();
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

  return (
    <div className='cryptoListMainCont'>
        <h2 style={{textAlign: 'center', marginBottom: '20px', minWidth: '550px'}}>Some cryptocurrencies are listed below</h2>
        {
            Object.keys(cryptoList).length > 0 && 
            <table>
                <thead>
                    <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>1h %</th>
                    <th>24h %</th>
                    <th>7d %</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(cryptoList.RAW).map((ele, ind) => (
                            <tr key={`ele${ind}`}>
                                <td><Link to={`/dashboard/${ele}`}>{ele}</Link></td>
                                <td>{cryptoList.DISPLAY[ele].USD.PRICE}</td>
                                <td>
                                    {
                                        cryptoList.DISPLAY[ele].USD.CHANGEPCTHOUR >=0 ? <span style={{color: '#16c784'}}>↑ {cryptoList.DISPLAY[ele].USD.CHANGEPCTHOUR}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(cryptoList.DISPLAY[ele].USD.CHANGEPCTHOUR)}%</span>
                                    }
                                </td>
                                <td>
                                    {
                                        cryptoList.DISPLAY[ele].USD.CHANGEPCT24HOUR >=0 ? <span style={{color: '#16c784'}}>↑ {cryptoList.DISPLAY[ele].USD.CHANGEPCT24HOUR}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(cryptoList.DISPLAY[ele].USD.CHANGEPCT24HOUR)}%</span>
                                    }
                                </td>
                                <td>
                                    {
                                        cryptoList.DISPLAY[ele].USD.CHANGEPCTDAY >=0 ? <span style={{color: '#16c784'}}>↑ {cryptoList.DISPLAY[ele].USD.CHANGEPCTDAY}%</span> : <span style={{color: '#ea3943'}}>↓ {Math.abs(cryptoList.DISPLAY[ele].USD.CHANGEPCTDAY)}%</span>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
        
    </div>
  )
}

export default CryptoList;