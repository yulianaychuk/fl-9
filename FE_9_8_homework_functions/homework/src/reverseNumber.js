const testNum = 123;
function reverseNumber(n) {
    const revNum =+ Math.abs(n)
        .toString().split('').reverse().join('');

    return n > 0 ? revNum : -revNum;
}
reverseNumber(testNum);