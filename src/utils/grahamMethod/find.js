import margeSort from '../margeSort';

const random = function(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const findBottomPoint = (points = []) => {
    return points.reduce((prev, curr) => {
        return curr.y < prev.y || (curr.y === prev.y && curr.x < prev.x) ? curr : prev;
    });
}

const isInline = (p = []) => {
    return !((p[1].x - p[0].x)*(p[2].y - p[0].y) - (p[2].x - p[0].x)*(p[2].y - p[0].y));
}

const findInsidePoint = (points = []) => {
    return Object.entries(
        [...Array(3).keys()]
            .reduce((p, c, i) => {
                if(i === 0) {
                    return [...p, points[random(0, points.length - 1)]]
                } else if(i === 1) {
                    let rp = points[random(0, points.length - 1)];

                    while(rp.x === p[0].x && rp.y === p[0].y) {
                        rp = points[random(0, points.length - 1)];
                    }

                    return [...p, rp];
                } else {
                    let rp = points[random(0, points.length - 1)];
                    let n = 0;

                    while(isInline([...p, rp]) && n < points.length) {
                        rp = points[random(0, points.length - 1)];
                        n++;
                    }

                    return [...p, rp];
                }
            }, [])
            .reduce((p, c, i) => ({
                x: p.x + c.x,
                y: p.y + c.y
            }))
        ).reduce((p, c, i) => ({
            ...p,
            [c[0]]: Math.floor(c[1] / 3)
        }), {});
}

class Vector {
    static scalar(v1, v2) {
        return v1.x*v2.x + v1.y*v2.y;
    }

    static abs(v) {
        return Math.sqrt(v.x*v.x + v.y*v.y);
    }

    static angle(v1, v2) {
        return Math.acos(this.scalar(v1, v2) / (this.abs(v1) * this.abs(v2))) * (180/Math.PI)
    }
}

const sort = (points = [], insidePoint, bottomPoint) => {
    return margeSort(points.map(point => {
        const v1 = { x: insidePoint.x - bottomPoint.x, y: insidePoint.y - bottomPoint.y };
        const v2 = { x: point.x - insidePoint.x, y: point.y - insidePoint.y };

        const t = {
            ...point,
            angle: Vector.angle(v1, v2),
            abs: Vector.abs()
        }

        return t;
    }), 'angle');
}

const _sort = (points = [], bottomPoint) => {
    return margeSort(points.map(point => {
        const v1 = { x: point.x - bottomPoint.x, y: point.y - bottomPoint.y };
        const v2 = { x: 1, y: 0 };

        const angle = Vector.angle(v1, v2);

        return {
            ...point,
            angle: isNaN(angle) ? 0 : angle,
            abs: Vector.abs(v1)
        }
    }), 'angle', 'abs');
}

export default function(points) {
    const time = performance.now();

    // ищем минимальную точку
    const bottomPoint = findBottomPoint(points);

    // сортируем точки вокруг внутренней
    const sorted = _sort(points, bottomPoint);
    const shell = [];

    shell.push(sorted[0]);
    shell.push(sorted[1]);

    for(let i = 2; i < sorted.length; i++) {

        while(
            (shell[shell.length - 1].x - shell[shell.length - 2].x)*
            (sorted[i].y - shell[shell.length - 1].y) - 
            (shell[shell.length - 1].y - shell[shell.length - 2].y)*
            (sorted[i].x - shell[shell.length - 1].x) < 0
        ) {
            shell.pop();
        }

        shell.push(sorted[i]);

    }



    return { shell, time: performance.now() - time };
}