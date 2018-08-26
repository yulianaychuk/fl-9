const one =1;
const five =5;
function isBigger(a, b) {
    return a > b;
}
function isSmaller(a, b) {
    return !isBigger(a, b);
}
alert(isSmaller(one, five)); 