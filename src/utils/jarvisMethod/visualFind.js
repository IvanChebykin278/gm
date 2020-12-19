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

class Screen {
    constructor(ctx) {
        this.ctx = ctx;

        this.lineTypes = {
            stroke: [4, 2],
            default: [0, 0]
        };

        this.pointTypes = {
            default: 'black',
            regular: 'blue',
            current: 'green',
            shell: 'red'
        }
    }

    _clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, 800, 400);

        return this;
    }

    _drawLine(i1, i2, type) {
        this.ctx.setLineDash(this.lineTypes[type]);
        this.ctx.beginPath();
        this.ctx.moveTo(i1.x, i1.y);
        this.ctx.lineTo(i2.x, i2.y);
        this.ctx.stroke();
        this.ctx.setLineDash(this.lineTypes.default);
    }

    _drawPoint(i, type) {
        this.ctx.strokeStyle = this.pointTypes[type];
        this.ctx.beginPath();
        this.ctx.arc(i.x, i.y, 1, 0, 2 * Math.PI, false);
        this.ctx.stroke();
        this.ctx.strokeStyle = this.pointTypes.default;
    }

    init(points = [], shell = []) {
        this.P = points;
        this.S = shell;

        this._clear();

        this.P.forEach(p => this._drawPoint(p, 'regular'));
        this.S.forEach(s => this._drawPoint(s, 'shell'));


        return this;
    }

    update(S, p) {
        this._clear();

        this.P.forEach(p => this._drawPoint(p, 'regular'));
        this.S = S;
        this.S.forEach(s => this._drawPoint(s, 'shell'));

        this.S.forEach(
            (_, i) => i <   this.S.length - 1 ? 
                            this._drawLine(this.S[i], this.S[i + 1], 'default') :
                            null
        );

        this._drawPoint(p, 'current');
        this._drawLine(p, this.S[this.S.length - 1], 'stroke');
    }
}

export default function (points = [], ctx) {

    const screen = new Screen(ctx);

    const time = performance.now();
    const P = points.slice();
    const S = [ findBottomPoint(P) ];
    let k = 0;

    screen.init(points, S);

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

            for(let m = 0; m < 100000; m++) {
                const a = Math.sin(2000);
            }

            screen.update(S, P[i]);
        }

        S.push(P[index]);
        P.splice(index, 1);

    } while (S[k].x !== S[0].x && S[k].y !== S[0].y);

    return { shell: S, time: performance.now() - time };
}