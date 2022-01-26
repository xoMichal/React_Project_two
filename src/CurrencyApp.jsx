import {useEffect, useState} from "react";
import './App.css';

const CurrencyApp = () => {
  // wartości początkowe
  const initChosenAmount = 0;
  const initChosenCurrency = "EUR";
  const initCurrencies = [];
  // uaktualnianie wartości początkowych
  const [chosenAmount, setChosenAmount] =  useState(initChosenAmount);
  const [chosenCurrency, setChosenCurrency] = useState(initChosenCurrency);
  const [currencies, setCurrencies] = useState(initCurrencies);
  // URL do ściągania informacji a API
  const NBP_API_URL = "http://api.nbp.pl/api/exchangerates/tables/a/?format=json";

useEffect(() => {
  fetch(NBP_API_URL)
  .then((response) => response.json())
  .then((data) => setCurrencies(data[0].rates.filter(({ code }) => ["EUR", "USD", "CHF"].includes(code))
  ))
  .catch((err) => console.log(err))
  
}, []);

// function

const calculatedCurrency = () =>{
  const chosenCurrencyValue = currencies.find(
    ({ code }) => code === chosenCurrency
  )?.mid;
  return ( chosenAmount * chosenCurrencyValue).toFixed(2);
};

// events
const changeChosenAmount = (e) => setChosenAmount(e.target.value);
  const changeChosenCurrency = (e) => setChosenCurrency(e.target.value);


  return (
    <div class="cointainer">
      <div class = "top"> 
        <div class = "logo">  </div>
         <div class = "name"> Przelicznik walut </div>
      </div>
      <div class = "bottom">
      <input type="number" class="value" onChange={changeChosenAmount} value={chosenAmount} />
      <select class="choose" onChange={changeChosenCurrency} value={chosenCurrency}>
        {currencies.map(({ code }) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <span class = "result"> {chosenAmount} {chosenCurrency} wynosi {calculatedCurrency()} zł </span>
      </div>
    </div>
  );

};

export default CurrencyApp;