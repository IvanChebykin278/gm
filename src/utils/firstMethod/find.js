const { isInside } = require("../is-inside");

export default function(points = [], rectangle) {
    let finded = 0;
    let time = performance.now();

    for(let i = 0; i < points.length; i++) {
        finded = isInside(points[i], rectangle) ? finded + 1 : finded;
    }

    return {
        finded,
        time: performance.now() - time
    };
};