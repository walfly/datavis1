const scaledHeight = (item, mid, height, min, max) => {
    const scalar = Math.max(Math.abs(min), max);
    if (item > 0) {
        return (mid - ((item/scalar) * mid)) + 2;
    } else if (item < 0) {
        return (mid + ((Math.abs(item)/scalar) * mid)) -2;
    } else if (item === 0) {
        return mid;
    }
};

export default (list, width, height, min, max, start) => {
    const mid = (height/2);
    const xstep = (width - start)/list.size;
    return list.reduce((memo, item, index) => {
        const y = scaledHeight(item, mid, height, min, max);
        const x1 = start + (index * xstep);
        const x2 = start + ((index + 1) * xstep);
        return memo === 'M' ? `${memo} ${x1},${y},${x2},${y}` : `${memo},${x1},${y},${x2},${y}`;
    }, 'M')
};
