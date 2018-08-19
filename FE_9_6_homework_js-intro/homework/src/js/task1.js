const amount = parseFloat(prompt('Enter amount of money', '0'));
const discount = parseFloat(prompt('Enter discount', '0'));

if ( validateInputData(amount) || validateInputData(discount)) {
    console.log('Incorrect input data');
} else {
    const economy = amount* discount / 100 ;
    const priceWithDiscount = amount - economy;

    console.log(`
price without discount: ${+amount.toFixed(2)}
discount: ${+discount.toFixed(2)}%
price with discount: ${+priceWithDiscount.toFixed(2)}
economy:  ${+economy.toFixed(2)}
    `);
}

function validateInputData(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}