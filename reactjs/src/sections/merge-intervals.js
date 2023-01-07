import {cc} from "../common/variables";

export function mergeIntervals_set(){
cc(mergeIntervals([[1,5],[3,7],[4,6]]));

}

//--------------------------------------------------//
// Although highly inefficient, in my browser this passes the first test case provided by Educative.
// However, in their console, it returns null instead of what it returns for me: [[1,7]]
// I am chalking this up to being a problem on their end.
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
                    let tempArr = [...mergedArrs[i], ...mergedArrs[j]];
                    let unique = tempArr.filter((val, index, arr) => arr.indexOf(val) === index);
                    let sortedArr = unique.sort((a, b) => a - b);
                    mergedArrs[i] = sortedArr;
                    mergedArrs.splice(j, 1);
                    i--;
                    didPerformChange = true;
                    break;
                } else if (firstInInitialArray <= firstInCurrentArray && lastInInitialArray >= firstInCurrentArray){
                    let tempArr = [...mergedArrs[i], ...mergedArrs[j]];
                    let unique = tempArr.filter((val, index, arr) => arr.indexOf(val) === index);
                    let sortedArr = unique.sort((a, b) => a - b);
                    mergedArrs[i] = sortedArr;
                    mergedArrs.splice(j, 1);
                    i--;
                    didPerformChange = true;
                    break;
                }
            }
        }

        return [mergedArrs, didPerformChange];
    }

    let didPerformChange = true;
    while (didPerformChange === true){
        [mergedArrs, didPerformChange] = combineSlots(mergedArrs);
    }

    for (let i = 0; i < mergedArrs.length; i++){
        mergedArrs[i].splice(1, mergedArrs[i].length-2);
    }

    return mergedArrs;
}


