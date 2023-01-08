import {cc} from "../common/variables";
import LinkedList from "../utils/linked-list-reversal/linked_list";

export function reversalOfALinkedList(){
    let headToBeReversed = new LinkedList();
    //headToBeReversed.createLinkedList([1,-2,3,4,-5,4,3,-2,1]);
    headToBeReversed.createLinkedList([1,5,6,7,8]);
    reverse(headToBeReversed.head);
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
