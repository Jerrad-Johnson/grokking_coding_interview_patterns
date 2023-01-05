import LinkedList from "../utils/linked-list/linked_list";
import {cc} from "../common/variables";

export function fastAndSlowPointers(){
    //isHappyNumber(7);

    let cycleInput = [
        [2, 2, 4, 5, 6, 3, 2, 4],
    ];

    // This is basically a copy-paste from Educative, for running test(s).
    for (var i = 0; i < cycleInput.length; i++) {
        let inputLinkedList = new LinkedList()
        inputLinkedList.createLinkedList(cycleInput[i])
        if (i % 2 === 0) {
            inputLinkedList.head.next.next.next.next.next.next =
                inputLinkedList.head.next
        }
        //cc(detectCycle(inputLinkedList.head));
    }

    let inputMiddleNode = [1,2,3,4,5];
    let middleNodeSet = new LinkedList();
    middleNodeSet.createLinkedList(inputMiddleNode);
    cc(getMiddleNode(middleNodeSet.head));

}

//--------------------------------------------------//

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


//--------------------------------------------------//

function getMiddleNode(head){
    if (!head.next) return head.data;
    let slow = head;
    let fast = head;

    while (fast.data !== null && fast.next?.data !== null){
        if (!fast.next) return slow.data;
        if (!fast.next?.next) return slow.next.data;

        slow = slow.next;
        fast = fast.next.next;
    }
}
