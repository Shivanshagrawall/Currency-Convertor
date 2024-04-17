const inputAmount=document.querySelector('#inputAmount');
const outputAmount=document.querySelector('#outputAmount');
const fromCurrency=document.querySelector('#fromCurrency');
const toCurrency=document.querySelector('#toCurrency');
const result=document.querySelector('.result');
const container=document.querySelector('.container');

const countries = [
    { code: 'INR', name: 'Indian Rupee (INR)' },
    { code: 'USD', name: 'United States Dollar (USD)' },
    { code: 'EUR', name: 'Euro (EUR)' },
    { code: 'GBP', name: 'Pound Sterling (GBP)' },
    { code: 'JPY', name: 'Japanese Yen (JPY)' },
    { code: 'AUD', name: 'Australian Dollar (AUD)' },
];


countries.forEach(country=>{
    
    const option1=document.createElement('option');
    const option2=document.createElement('option');

    option1.value=option2.value=country.code;
    option1.textContent=option2.textContent=`${country.code}(${country.name})`;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);

    fromCurrency.value="USD";
    toCurrency.value="INR";
    
})


const getExchangeRate=async()=>{
    console.log(inputAmount);
    const amount=parseFloat(inputAmount.value);
    const fromCurrencyElement=fromCurrency.value;
    const toCurrencyElement=toCurrency.value;

    result.textContent=`Loading...`

    try {
    const response=await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyElement}`);
    const data=await response.json();

    const convertedRates=data.rates[toCurrencyElement];
    const convertedAmount=(amount*convertedRates).toFixed(5);

    outputAmount.value=convertedAmount;
    result.innerHTML=`${amount} ${fromCurrencyElement} = ${convertedAmount} ${toCurrencyElement}`;
    
    console.log(data);
    }catch (error) {
        container.innerHTML=`<h2>Error While Fetching the Data</h2>`
    }
}

inputAmount.addEventListener('input',getExchangeRate);
fromCurrency.addEventListener('change',getExchangeRate);
toCurrency.addEventListener('change',getExchangeRate);
window.addEventListener('load',getExchangeRate);