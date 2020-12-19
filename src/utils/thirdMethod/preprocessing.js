const sort = function(points, axis) {
    const sortCallbackDecorator = function(axis) {
        return function(previous, current) {
            if(previous[axis] > current[axis]) return 1;
            if(previous[axis] === current[axis]) return 0;
            if(previous[axis] < current[axis]) return -1;
        }
    }

    return points.slice().sort(sortCallbackDecorator(axis));
};

const drawer = (ctx) => ({
    vertical: ({ x, y }, n) => {
        ctx.beginPath();
        ctx.moveTo(x, n[0]);
        ctx.lineTo(x, n[1]);
        ctx.stroke();          
    },
    horizontal: ({ x, y }, n) => {
        ctx.beginPath();
        ctx.moveTo(n[0], y);
        ctx.lineTo(n[1], y);
        ctx.stroke();
    }
});

const preprocessing = function(points = []) {
    // sorted.x.forEach((e, i) => revers.x[e.index] = i);
    // sorted.y.forEach((e, i) => revers.y[e.index] = i);

    const time = performance.now();
    debugger;

    const tree = (function recurce(points, len = 0, depth = 0) {
        if(len < 1) return null;

        const middle = Math.floor((len - 1) / 2);
        const axis = depth % 2 ? 'y' : 'x';

        const sorted = sort(points, axis);

        const current = {
            point: sorted[middle]
        };

        const leftPoints = sorted.slice(0, middle);
        const rightPoints = sorted.slice(middle + 1, points.length);

        current.left = recurce(leftPoints, leftPoints.length, depth + 1, current.point, 'left');
        current.right = recurce(rightPoints, rightPoints.length, depth + 1, current.point, 'right');

        return current;
    })(points, points.length, 0, null, null);

    return {
        tree,
        time: performance.now() - time,
        points
    };
};

export default preprocessing;