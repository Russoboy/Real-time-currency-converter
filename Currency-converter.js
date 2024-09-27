const apiKey = ''; // Replace with your API key from ExchangeRate-API

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');


// Fetch the list of currencies
// https://v6.exchangerate-api.com/v6/bd172210e4f99a824979c437/latest/USD
fetch(`https://open.er-api.com/v6/latest/USD`)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        populateCurrencyDropdown(currencies);
    }); 

// Populate the dropdowns with currency options
function populateCurrencyDropdown(currencies) {
    currencies.forEach(currency => {
        let optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        
        fromCurrency.add(optionFrom);

        let optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrency.add(optionTo);
    });

    // Set default values
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Handle currency conversion
convertBtn.addEventListener('click', () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    fetch(`https://open.er-api.com/v6/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.innerHTML = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        })
        .catch(error => {
            result.innerHTML = 'Error fetching data!';
        });
});
