import {cc} from "../common/variables";

export function twoPointers(){
    //cc(isPalindrome("RACECAR"));

    //cc(findSumOfThree([-1,2,1,-4,5,-3] , -8));

    //cc(findSumOfThreeImproved([-1,2,1,-4,5,-3] , -8));

    //cc(findSumOfThreeImprovedV2([-1,2,1,-4,5,-3] , -8));

    //cc(reverseWords("Hello     World"));

    //cc(isPalindrome2("RACECARR"));
}

//--------------------------------------------------//

function isPalindrome(s) {
    let l = 0;
    let r = s.length-1;

    while (l <= r){
        if (s[l] !== s[r]) return false;
        l++;
        r--;
    }

    return true;
}


//--------------------------------------------------//
// Inefficient, but works. First attempt.
//--------------------------------------------------//

function findSumOfThree(nums, target) {
    if (nums.length < 3) return false;
    let numsSorted = nums.sort();

    for (let i = 0; i < numsSorted.length-2; i++){
        for (let j = i+1; j < numsSorted.length-1; j++){
            let remaining = numsSorted.slice(j+1);
            let result = remaining.find((num) => num === (target - numsSorted[i] - numsSorted[j]));
            if (result) return true;
        }
    }
    return false;
}


//--------------------------------------------------//
// More efficient, but I want to improve it further.
//--------------------------------------------------//

function findSumOfThreeImproved(nums, target) {
    if (nums.length < 3) return false;
    let numsSorted = nums.sort();

    for (let i = 0; i < numsSorted.length-2; i++){
        let j = i+1;
        let remaining = numsSorted.slice(j+1);
        let result = remaining.find((num) => num === (target - numsSorted[i] - numsSorted[j]));
        if (result) return true;
    }

    return false;
}


//--------------------------------------------------//

function findSumOfThreeImprovedV2(nums, target) {
    if (nums.length < 3) return false;
    let numsSorted = nums.sort((a, b) => a - b);

    for (let i = 0; i < numsSorted.length-2; i++){
        let low = i+1;
        let high = numsSorted.length-1;
        while (low < high){
            if (numsSorted[i] + numsSorted[low] + numsSorted[high] === target) return true;
            if (numsSorted[i] + numsSorted[low] + numsSorted[high] > target){
                high--;
            } else {
                low++;
            }
        }
    }

    return false;
}


//--------------------------------------------------//

function reverseWords(sentence) {
    let sentenceAsArr = sentence.split(" ");
    sentenceAsArr = sentenceAsArr.filter((word) => word !== "");
    let right = sentenceAsArr.length-1;

    for (let left = 0; left < right; left++){
        [sentenceAsArr[left], sentenceAsArr[right]] = [sentenceAsArr[right], sentenceAsArr[left]];
        right--;
    }

    return sentenceAsArr.join(" ");
}


//--------------------------------------------------//

function isPalindrome2(s) {
    let misses = 0;
    let right = s.length-1;

    for (let left = 0; left <= right; left++){
        if (misses > 1) return false;
        if (s[left] === s[right]){
            right--;
        } else {
            misses++;
            left--;
            right--;
        }
    }

    return misses < 2;
}


