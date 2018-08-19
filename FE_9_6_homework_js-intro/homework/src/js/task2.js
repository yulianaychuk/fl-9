// read input data
const a = parseFloat(prompt('a length', '0'));
const b = parseFloat(prompt('b length', '0'));
const angle = parseFloat(prompt('angle degrees', '0'));

// validate input data 

if(validateInputData(a) || validateInputData(b) || validateInputData(angle)){
    console.log('Incorrect input')
}else{
    // Input data valid
    const c = getSideC(a, b, angle);
    const perimeter = getP(a, b, c);
    const area = getS(a, b, c);

    console.log(`c length = ${+c.toFixed(2)} 
        triangle square = ${+area.toFixed(2)} 
        triangle perimeter = ${+perimeter.toFixed(2)}`);
}

function validateInputData(number) {
    return isNaN(number) || typeof number !== 'number' || number < 0;
}

function getSideC(sideA, sideB, angle){
    const sum_angle = 180;
    const alpha = Math.PI/sum_angle * parseFloat(angle);
    return Math.sqrt(a*a + b*b - 2 * a * b * Math.cos(alpha));
}

function getP(a, b, c) {
    return a + b + c;
}

function getS(a, b, c){
    const p = getP(a, b, c)/2
    return Math.sqrt(p * ((p - a) * (p - b) * (p - c)));
}