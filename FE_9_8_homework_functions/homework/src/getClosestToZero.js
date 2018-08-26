const two = 2;
const three = 3;
function getClosestToZero(){
    return [...arguments].sort((a, b) => Math.abs(a) - Math.abs(b))[0];
}
alert(getClosestToZero(two,three));