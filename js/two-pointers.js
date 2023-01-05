//--------------------------------------------------//

function isPalindrome(s) {
    let asArr = s.split("");

    let l = 0;
    let r = s.length-1;
    while (l <= r){
        if (asArr[l] !== asArr[r]) return false;
        l++;
        r--;
    }

    return true;
}

cc(isPalindrome("RACECAR"));


//--------------------------------------------------//

