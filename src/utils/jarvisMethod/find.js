const findBottomPoint = (points = []) => {
    return points.reduce((prev, curr) => {
        return curr.y < prev.y || (curr.y === prev.y && curr.x < prev.x) ? curr : prev;
    });
}

class Vector {
    static scalar(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static abs(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static angle(v1, v2) {
        return Math.acos(this.scalar(v1, v2) / (this.abs(v1) * this.abs(v2))) * (180 / Math.PI);
    }

    static cos(v1, v2) {
        return this.scalar(v1, v2) / (this.abs(v1) * this.abs(v2));
    }
}

export default function (points = []) {

    const time = performance.now();
    const P = points.slice();
    const S = [ findBottomPoint(P) ];
    let k = 0;

    do {
        k++;
        let index = 0;
        let a = 360;

        for (let i = 0; i < P.length; i++) {

            const ca = Vector.angle(
                k === 1 ? { x: P[i].x - S[0].x, y: P[i].y - S[0].y } : { x: S[k - 1].x - S[k - 2].x, y: S[k - 1].y - S[k - 2].y },
                k === 1 ? { x: 1, y: 0 } : { x: P[i].x - S[k - 1].x, y: P[i].y - S[k - 1].y }
            );

            if (a >= ca && !isNaN(a)) {
                a = ca;
                index = i;
            }
        }

        S.push(P[index]);
        P.splice(index, 1);

    } while (S[k].x !== S[0].x && S[k].y !== S[0].y);

    return { shell: S, time: performance.now() - time };
}