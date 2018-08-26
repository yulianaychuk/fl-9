const eleven = 11;
function isPrime(n) {
    let isPrime = true;
    let minPrime = 2;
    const two = 2; 
    const dividedPerTwo = n / two;
    if(n < minPrime) {
        return false
    }    
    for(let i = minPrime; i <= dividedPerTwo; i++) {
        if(n % i === 0) {
            isPrime = false;
            
            break;
        }
    }
    return isPrime;
}
isPrime(eleven);