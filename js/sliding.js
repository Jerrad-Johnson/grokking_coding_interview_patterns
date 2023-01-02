let findMaxInputs = [
    [[1,2,3,4,5,6,7,8,9,10], 3],
    [[3,3,3,3,3,3,3,3,3,3], 4],
    [[10,6,9,-3,23,-1,34,56,67,-1,-4,-8,-2,9,10,34,67], 2],
    [[4,5,6,1,2,3], 1],
    [[9,5,3,1,6,3], 2],
    [[1,2], 2],
];

function findMaxSlidingWindow(nums, w) {
    let results = [];
    let window = [];
    let pointer = 0;

    for (; pointer < w; pointer++){
        window[pointer] = nums[pointer];
    }

    results.push(Math.max(...window));

    for (; pointer < nums.length; pointer++){
        window.shift();
        window.push(nums[pointer]);
        results.push(Math.max(...window));
    }

    return results;
}

/*for (let set of findMaxInputs){
    cc(findMaxSlidingWindow(set[0], set[1]));
}*/


//--------------------------------------------------//
// This does not need the requirements: It will not necessarily find the shorted substring.
// It passed Grokking's sample tests, but should not have.
//--------------------------------------------------//

let minWindowInputs = [
    ["abcdebdde", "bde"],
    ["fgrqsqsnodwmxzkzxwqegkndaa", "kzed"],
    ["michmznaitnjdnjkdsnmichmznait", "michmznait"],
    ["afgegrwgwga", "aa"],
    ["abababa", "ba"],
];

function minWindow(str1, str2){
    let workingWindow = [];
    let result = [];
    let entryCount = str2.length;
    let workingOnEntryNumber = 0;
    let goalAchieved = false;
    let splitStr1 = str1.split("");
    let splitStr2 = str2.split("");

    for (let entry of splitStr1){
        if (workingOnEntryNumber > entryCount-1) break;
        if (result[0]) workingWindow.push(entry);

        if (entry === splitStr2[workingOnEntryNumber]){
            if (result[0]) {
                result = workingWindow;
            } else if (entry === splitStr2[workingOnEntryNumber]) {
                result[0] = entry;
                workingWindow.push(entry);
            }
            workingOnEntryNumber++;
        }
    }

    return (goalAchieved ? "" : result.join(""));
}

/*for (let entry of minWindowInputs){
    cc(minWindow(entry[0], entry[1]));
}*/


//--------------------------------------------------//
// The Grokking preferred version is shorter than mine, but its loops are nested two levels deeper.
// I believe that mine is better because it's easier to understand.
// Also, the grokking version does not appear to solve the challenge.
// For example, their version (going by the diagrams) will fail this challenge: "saaaaaaaaasazaaaaaaaasz", "sz"
// Once it finds the first z, theirs will reverse the loop, and find the second-shortest substring of "saz."
// But it will never move forward to the end, to find "sz."
//--------------------------------------------------//

function minWindowTwoPointer(str1, str2){
    let leftmost,
        rightmost = 0,
        finds = 0,
        splitStr1 = str1.split(""),
        splitStr2 = str2.split(""),
        currentWindow = [],
        bestWindowLength = Number.POSITIVE_INFINITY,
        bestWindow = [];

    for (let i = 0; i < splitStr1.length+1; i++){
        if (finds === splitStr2.length){
            currentWindow = splitStr1.slice(leftmost, rightmost+1);

            if (currentWindow.length < bestWindowLength){
                bestWindow = [...currentWindow];
                bestWindowLength = currentWindow.length;
            }

            i = leftmost;
            leftmost = undefined;
            rightmost = 0;
            currentWindow = [];
            finds = 0;
            continue;
        }

        if (leftmost === undefined && splitStr2[rightmost] === splitStr1[i]) leftmost = i;

        if (splitStr1[i] === splitStr2[finds]){
            rightmost = i;
            finds++;
        }
    }

    return bestWindow.join("");
}

/*for (let entry of minWindowInputs){
    cc(minWindowTwoPointer(entry[0], entry[1]));
}*/

//--------------------------------------------------//

function findRepeatedSequences(s, k) {
    let position = 0;
    let map = {}
    let sAsArray = s.split("");
    let results = [];

    while (position < s.length - k){
        let currentWindow = sAsArray.slice(position, position+k).join("");
        map[currentWindow] ? map[currentWindow]++ : map[currentWindow] = 1;
        position++;
    }

    for (let entry in map){
        if (map[entry] === 1){
            delete map[entry];
        } else {
            results.push(entry);
        }
    }

    return results;
}

/*cc(findRepeatedSequences("AAAAACCCCCAAAAACCCCCC" , 8));*/

//--------------------------------------------------//

function minWindowV2(s, t) {
    let map = {};
    let leftmost = undefined;
    let catches = 0;
    let currentWindow = [];
    let bestWindow = [];
    let bestWindowLength = Number.POSITIVE_INFINITY;

    for (let entry of t){
        map[entry] ? map[entry]++ : map[entry] = 1;
    }
    let tempMap = {...map};

    for (let i = 0; i < s.length+1; i++){
        if (catches === t.length){
            i = leftmost;
            leftmost = undefined;
            catches = 0;
            tempMap = {...map};

            if (currentWindow.length < bestWindowLength){
                bestWindow = [...currentWindow];
                bestWindowLength = currentWindow.length;
            }

            currentWindow = [];
            continue;
        }

        if (s[i] in tempMap){
            if (leftmost === undefined) leftmost = i;

            currentWindow.push(s[i]);
            tempMap[s[i]]--;
            catches++;

            if (tempMap[s[i]] === 0) delete tempMap[s[i]];
        } else if (leftmost !== undefined){
            currentWindow.push(s[i]);
        }
    }

    return bestWindow.join("");
}

cc(minWindowV2("ABXYZJKLSNFC" , "ABC"));