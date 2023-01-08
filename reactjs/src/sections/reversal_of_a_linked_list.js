import {cc} from "../common/variables";
import LinkedList from "../utils/linked-list-reversal/linked_list";

export function reversalOfALinkedList(){
    let headToBeReversed = new LinkedList();
    //headToBeReversed.createLinkedList([1,-2,3,4,-5,4,3,-2,1]);
    headToBeReversed.createLinkedList([1,5,6,7,8]);
    //reverse(headToBeReversed.head);

    let linkedHeadToBeReversed = new LinkedList();
    linkedHeadToBeReversed.createLinkedList([3,4,5,6,2,8,7,7]);
    reverseLinkedList(linkedHeadToBeReversed.head, 3);
}


//--------------------------------------------------//
// I struggled with this one, partially because educative stated that a requirement was to do it *in place*.
// However, even their version does not modify the list in place. For the most part, my solution below is a copy of theirs.
// Given the PBR nature of objects, I'm surprised that the temp variable works the way it does.
//--------------------------------------------------//

function reverse(head) {
    let headCopy = {...head}
    let nextEntry = headCopy.next;
    let reversedList = {...headCopy}; // Sets the last accessible entry
    reversedList.next = null; // Ends the linked list

    while (nextEntry != null) {
        let temp = nextEntry;
        nextEntry = nextEntry.next;
        temp.next = reversedList; // Stacks the old reversedList entries on *top*, via being .next. Thus 1, then 5, etc. are on top.
        reversedList = temp;  // This assigns the current entry to the bottom of the stack.
    }

    return reversedList;
}



//--------------------------------------------------//
// I had no clue how to do this, I stole the code from Google and then spent time with it.
//--------------------------------------------------//

function reverseLinkedList(head, k){
    let n = 0;
    for (let i = head; i !== null; n++, i = i.next);

    let dummy = new LinkedList();
    dummy.next = head;

    for (let newHead = dummy, tail = head; n >= k; n -= k){
        for (let i = 1; i < k; i++){
            let next = tail.next.next;
            tail.next.next = newHead.next;
            newHead.next = tail.next;
            tail.next = next;
        }
        newHead = tail;
        tail = tail.next;
    }

    cc(dummy.next);
}


