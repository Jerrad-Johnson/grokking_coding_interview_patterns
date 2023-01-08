import {cc} from "../common/variables";

export function mergeIntervals_set(){
    //cc(mergeIntervals([[1,5],[3,7],[4,6]]));
    //cc(insertInterval([[1,2],[3,4],[5,8],[9,15]], [2,5]));
    //cc(employeeFreeTime([[[1,2],[5,6]],[[1,3]],[[4,10]]]))
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

//--------------------------------------------------//
// Given the problems with Educative's site, this isn't complete. But it solves the immediate test case.
// A better version would solve for multiple free hours in a series, and also for multiple series of free hours.
// e.g when the expected result is [[1, 4], [6, 7]].
//--------------------------------------------------//

function employeeFreeTime(schedules){

    let thisSchedule = [];
    let allHoursCombined = [];
    for (let employee of schedules){
        for (let schedule of employee){
            thisSchedule = expandHours(schedule);
        }
        allHoursCombined.push(thisSchedule);
    }
    let allHoursCombinedFlattened = allHoursCombined.flat();
    let allHoursSorted = allHoursCombinedFlattened.sort((a, b) => a - b);
    let allHoursFiltered = allHoursSorted.filter((e, i, a) => e !== a[i - 1]);

    let lastEntry = allHoursSorted[0];
    let missingEntries = [];

    for (let entry of allHoursFiltered.slice(1)){
        if (entry !== lastEntry+1) missingEntries.push(lastEntry);
        lastEntry = entry;
    }

    missingEntries.push(missingEntries[0]+1);

    return missingEntries;


    function expandHours(schedule){
        let expandedHours = [];

        for (let i = schedule[0]+1; i < schedule[schedule.length-1]+1; i++){
            expandedHours.push(i);
        }

        return expandedHours;
    }
}

// They suggest doing MeetingRoomsII, but I'm going to skip it -- at least for now. Note: They also don't explain the problem.
