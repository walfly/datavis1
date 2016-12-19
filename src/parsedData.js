import data from "./data/temperatureData";
import {Map, List} from "immutable";

let newData = data.reduce((memo, item) => {
    memo = memo.update('years', a => a.push(item.Year));
    memo = memo.update('24N-90N', a => a.push(item["24N-90N"]));
    memo = memo.update("24S-24N", a => a.push(item["24S-24N"]));
    memo = memo.update("90S-24S", a => a.push(item["90S-24S"]));
    memo = memo.update("64N-90N", a => a.push(item["64N-90N"]));
    memo = memo.update("44N-64N", a => a.push(item["44N-64N"]));
    memo = memo.update("24N-44N", a => a.push(item["24N-44N"]));
    memo = memo.update("EQU-24N", a => a.push(item["EQU-24N"]));
    memo = memo.update("24S-EQU", a => a.push(item["24S-EQU"]));
    memo = memo.update("44S-24S", a => a.push(item["44S-24S"]));
    memo = memo.update("64S-44S", a => a.push(item["64S-44S"]));
    return memo.update("90S-64S", a => a.push(item["90S-64S"]));
}, Map({
    'years': List(),
    "24N-90N": List(),
    "24S-24N": List(),
    "90S-24S": List(),
    "64N-90N": List(),
    "44N-64N": List(),
    "24N-44N": List(),
    "EQU-24N": List(),
    "24S-EQU": List(),
    "44S-24S": List(),
    "64S-44S": List(),
    "90S-64S": List()
}));

newData = newData.set('max', newData.reduce((memo, item, key) => {
    if (!item.max || key === "years") {
        return memo;
    }
    if (memo < item.max()) {
        return item.max();
    }
    return memo;
}, 0));

newData = newData.set('min', newData.reduce((memo, item, key) => {
    if (!item.min || key === "years") {
        return memo;
    }
    if (memo > item.min()) {
        return item.min();
    }
    return memo;
}, 0));


export default newData;
