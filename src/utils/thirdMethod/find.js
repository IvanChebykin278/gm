import { isInside } from '../is-inside';

export default function(preprocess, region) {
    // const points = preprocess.points.map(point => ({
    //     ...point,
    //     isInside: isInside(point, region)
    // }));

    const splitRegion = (region, point, axis) => {
        const { start, end } = region;
        let leftRegion;
        let rightRegion;
    
        if(axis === 'x') {
            leftRegion = {
                start,
                end: {
                    ...region.end,
                    x: point.x
                }
            };
    
            rightRegion = {
                start: {
                    ...region.start,
                    x: point.x
                },
                end
            };
        } else {
            rightRegion = {
                start: {
                    ...region.start,
                    y: point.y
                },
                end
            };
    
            leftRegion = {
                start,
                end: {
                    ...region.end,
                    y: point.y
                }
            };
        }
    
        return { leftRegion, rightRegion };
    }

    let finded = 0;
    const time = performance.now();

    (function recurce(tree, region, depth) {
        if(!tree) return;

        const { start, end } = region;
        const { point, left, right } = tree;
        const axis = depth % 2 ? 'y' : 'x';

        // const validResult = points.find(p => p.x === point.x && p.y === point.y).isInside;

        if(isInside(point, region)) {
            finded++;
        } else {
            // if(validResult) debugger;
        }

        if(!left && !right)
            return;

        if(point[axis] > start[axis] && point[axis] < end[axis]) {
            const { leftRegion, rightRegion } = splitRegion(region, point, axis);

            recurce(left, leftRegion, depth + 1);
            recurce(right, rightRegion, depth + 1);

            return;
        }

        if(axis === 'x') {
            if(end.x <= point.x && start.x < point.x) 
                recurce(left, region, depth + 1);
            else 
                recurce(right, region, depth + 1);
        } else {
            if(end.y <= point.y && start.y < point.y) 
                recurce(left, region, depth + 1);
            else
                recurce(right, region, depth + 1);
        }
        
    })(preprocess.tree, region, 0);

    return {
        finded,
        time: performance.now() - time
    };
}