const two =2;
const five =5;
function getMin() {
    let min = arguments[0];

    for(let i = 1; i < arguments.length; i++) {
        if(min > arguments[i]) {
            min = arguments[i];
        }
    }
    return min;
}
alert(getMin(two, five));