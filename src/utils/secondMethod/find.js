// @params  object: preprocess, object: rect, array<point>: points
// @desc    find count points in rect
// @return  object: { finded, time }
export default function(preprocess, rect = { start: null, end: null }, points) {

    // @params  int: value, string: axis, array<point>: array
    // @desc    find index point in MVD
    // @return  int: index
    const searchIndex = function(value, axis, array) {
        let first = 0;
        let last = array.length - 1;
    
        try {
            if(array[first][axis] > value) {
                return first;
            }
        } catch (error) {
            debugger;
        }

        if(array[last] < value) {
            return last + 1;
        }
    
        while(last - first > 1) {
            let middle = Math.floor((first + last)/2);
    
            if(array[middle][axis] > value) {
                last = middle - 1;
            } else {
                first = middle;
            }
        }

        if(array[last][axis] >= value) {
            return last;
        } else {
            return last + 1;
        }
    };

    const time = performance.now();
    const { matrix, sortPoints } = preprocess;
    const { start, end } = rect;
    const rectPoints = [end, {x: start.x, y: end.y}, start, {x: end.x, y: start.y}];
    const vectorDaminations = [];

    for(let i = 0; i < rectPoints.length; i++) {
        const x = searchIndex(rectPoints[i].x, 'x', sortPoints.x);
        const y = searchIndex(rectPoints[i].y, 'y', sortPoints.y);

        vectorDaminations.push(matrix[y][x]);
    }

    return {
        finded: vectorDaminations[0] - vectorDaminations[1] - vectorDaminations[3] + vectorDaminations[2],
        time: performance.now() - time
    };
}