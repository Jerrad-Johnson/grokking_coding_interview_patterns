function isHappyNumber(n){
    let slowNumbers = n;
    let fastNumbers = n;

    for(;;){
        slowNumbers = getSum(slowNumbers);
        fastNumbers = getSum(getSum(fastNumbers));
        if (fastNumbers === 1) return true;
        if (slowNumbers === fastNumbers) return false;
    }

    function getSum(numbers){
        numbers = numbers.toString();
        let sum = 0;

        for (let entry of numbers){
            sum += +entry * +entry;
        }

        return sum;
    }
}

/*cc(isHappyNumber(7));*/


//--------------------------------------------------//

