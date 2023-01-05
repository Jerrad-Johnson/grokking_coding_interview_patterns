

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
// This worked (passed) on educative, but did not work locally; the outputs don't match.
// It may be related to converting from import to <script>, but that seems wrong.
//--------------------------------------------------//

function detectCycle(head) {
    let slow = head;
    let fast = head.next;

    while (fast.data !== null && fast.next?.data !== null){
        slow = slow.next;
        if (!fast.next?.next) return false;
        fast = fast.next.next;

        if (fast.data === null) return false;
        if (fast === slow) return true;
    }
}


let linkedList = new LinkedList();
linkedList.createLinkedList([2, 2, 4, 5, 6, 3, 2, 4]);
cc(detectCycle(linkedList.head));
