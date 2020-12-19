export const sort = function(points, axis) {
    const sortCallbackDecorator = function(axis) {
        return function(previous, current) {
            if(previous[axis] > current[axis]) return 1;
            if(previous[axis] === current[axis]) return 0;
            if(previous[axis] < current[axis]) return -1;
        }
    }

    return points.slice().sort(sortCallbackDecorator(axis));
};