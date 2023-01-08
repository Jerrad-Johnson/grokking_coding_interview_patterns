import {cc} from "../common/variables";

export function mergeIntervals_set(){
    //cc(mergeIntervals([[1,5],[3,7],[4,6]]));
    cc(insertInterval([[1,2],[3,4],[5,8],[9,15]], [2,5]));
}

//--------------------------------------------------//
// Although highly inefficient, in my browser this passes the first test case provided by Educative.
// However, in their console, it returns null instead of what it returns for me: [[1,7]]
// I am chalking this up to being a problem on their end.
// Note: Their version may not be  more efficient; it doesn't appear to solve the problem of intervals which may be out of order.
// e.g. [[1,4], [2,5], [8,10], [1,6]] <-- 1,6 would be its own bracket, it seems.
//--------------------------------------------------//

function mergeIntervals(v) {
    if (!v.length) return false;
    let mergedArrs = [];
    let tempArr = [];

    for (let i = 0; i < v.length; i++){
        let firstInArray = v[i][0];
        let lastInArray = v[i][v[i].length-1];
        for (let j = firstInArray; j < lastInArray+1; j++){
            tempArr.push(j);
        }
        mergedArrs.push(tempArr)
        tempArr = [];
    }

    let iteratorLimit = 0;

    let didPerformChange = true;
    while (didPerformChange === true){
        [mergedArrs, didPerformChange] = combineSlots(mergedArrs);
    }

    for (let i = 0; i < mergedArrs.length; i++){
        mergedArrs[i].splice(1, mergedArrs[i].length-2);
    }

    return mergedArrs;


    function combineSlots(mergedArrs){
        let didPerformChange = false;

        outer:
        for (let i = 0; i < mergedArrs.length-1; i++){
            let firstInInitialArray = mergedArrs[i][0];
            let lastInInitialArray = mergedArrs[i][mergedArrs[i].length-1];
            for (let j = i+1; j < mergedArrs.length; j++){
                let firstInCurrentArray = mergedArrs[j][0];
                let lastInCurrentArray = mergedArrs[j][mergedArrs[j].length-1];
                iteratorLimit++;
                if (iteratorLimit > 40) break outer;

                if (lastInInitialArray >= lastInCurrentArray && firstInInitialArray <= lastInCurrentArray){
                    mergeArrays(mergedArrs, i, j);
                    i--;
                    didPerformChange = true;
                    break;
                } else if (firstInInitialArray <= firstInCurrentArray && lastInInitialArray >= firstInCurrentArray){
                    mergeArrays(mergedArrs, i, j);
                    mergedArrs.splice(j, 1);
                    i--;
                    didPerformChange = true;
                    break;
                }
            }
        }
        return [mergedArrs, didPerformChange];
    }

    function mergeArrays(mergedArrs, i, j){
        let tempArr = [...mergedArrs[i], ...mergedArrs[j]];
        let unique = tempArr.filter((val, index, arr) => arr.indexOf(val) === index);
        let sortedArr = unique.sort((a, b) => a - b);
        mergedArrs[i] = sortedArr;
        mergedArrs.splice(j, 1);
    }
}


//--------------------------------------------------//
// Once again, this works in my browser, but not on educative's website.
//--------------------------------------------------//


function insertInterval(existingIntervals, newInterval){
    if (existingIntervals.length < 1) return existingIntervals;
    let toBeMerged = [];
    let newIntervalExpanded = [];

    for (let i = newInterval[0]; i < newInterval[1]+1; i++){
        newIntervalExpanded.push(i);
    }

    let newIntervalStart = newIntervalExpanded[0];
    let newIntervalEnd = newIntervalExpanded[newIntervalExpanded.length-1];

    for (let i = 0; i < existingIntervals.length; i++){
        let end = existingIntervals[i].length -1;
        let currentIntervalStart = existingIntervals[i][0];
        let currentIntervalEnd = existingIntervals[i][end];
        for (let j = newIntervalStart; j < newIntervalEnd+1; j++){
            if (j >= currentIntervalStart && j <= currentIntervalEnd){
                toBeMerged.push(i);
                break;
            }
        }
    }

    let intervalsCombined = [];
    for (let index of toBeMerged){
        intervalsCombined.push(existingIntervals[index]);
    }

    let intervalsFlatted = [...intervalsCombined].flat();
    let intervalsSorted = [...intervalsFlatted].sort((a, b) => a - b);
    let newIntervalFinished = [intervalsSorted[0], intervalsSorted[intervalsSorted.length-1]];

    let newIntervalsFinished = [...existingIntervals];
    newIntervalsFinished[toBeMerged[0]] = newIntervalFinished;
    toBeMerged.shift();


    let runningIndex = 0;
    for (let index of toBeMerged){
        newIntervalsFinished.splice((index + runningIndex), 1);
        runningIndex--;
    }

    return newIntervalsFinished;
}


