//import { sort } from '../sort';

// @params  array<object>: points - array of points
// @desc    create preprocess object
// @return  object: { matrix, sortPoints, time }
const preprocessing = function(points = []) {

    // @params  int: len - length of arrays
    // @desc    create empty matrix
    // @return  int: array[len][len]
    const createMatrix = (len) => [...Array(len)].map(() => [...Array(len).keys()].map(i => 0));

    // @params  array<object>: points - array of points, string: axis
    // @desc    sort points by axis
    // @return  array<{object>: points - sort points
    const sort = function(points, axis) {

        // @params  string: axis
        // @desc    high order fn for create sort callback
        // @return  fn: callback
        const sortCallbackDecorator = function(axis) {

            // @params  object: previous - previous point, object: current - current point
            // @desc    sort callback
            // @return  1 or 0 or -1
            return function(previous, current) {
                if(previous[axis] > current[axis]) return 1;
                if(previous[axis] === current[axis]) return 0;
                if(previous[axis] < current[axis]) return -1;
            }
        }
    
        return points.slice().sort(sortCallbackDecorator(axis));
    };

    // create start time var and sort array of points
    const time = performance.now();
    const sortPointsX = sort(points, 'x');
    const sortPointsY = sort(points, 'y');

    // create empty MVD
    const matrix = createMatrix(points.length + 1);

    for(let i = 1; i < matrix.length; i++) {
        const pointY = sortPointsY[i - 1];
    
        for(let j = 1; j < matrix.length; j++) {

            const pointX = sortPointsX[j - 1];

            // if are points to the right of the intersection
            if(pointX.x >= pointY.x) {
                // current cell assign buttom cell plus 1
                matrix[i][j] = matrix[i - 1][j] + 1;
            } else {
                // current cell assign buttom cell
                matrix[i][j] = matrix[i - 1][j];
            }
        }
    }

    return {
        matrix: matrix,
        sortPoints: {
            x: sortPointsX,
            y: sortPointsY
        },
        time: performance.now() - time
    };
};

export default preprocessing;