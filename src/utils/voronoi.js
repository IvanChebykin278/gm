export default function foo(points = [], ctx) {

    const clearCanvas = () => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 800, 400);
    };

    const drawPoint = (x, y, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.strokeStyle = 'black';
    };

    const drawLine = (x1, y1, x2, y2, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    const drawPoints = () => {
        points.forEach(i => {
            drawPoint(i.x, i.y, 'blue');
        });
    };

    const MAX_WIDTH = 800;
    const MAX_HEIGHT = 400;

    const voronoi = [];

    clearCanvas();
    drawPoints();

    i: for (let i = 0; i < 1; i++) {

        const n_lines = [];
        const ip = points[i];

        j1: for (let j = 0; j < points.length; j++) {
            const jp = points[j];

            if (ip.x === jp.x && ip.y === jp.y) continue j1;

            const mp = {
                x: (ip.x + jp.x) / 2,
                y: (ip.y + jp.y) / 2
            };

            //drawPoint(mp.x, mp.y, 'red');
            drawLine(ip.x, ip.y, jp.x, jp.y, 'green');

            const slope = (jp.y - ip.y) / (jp.x - ip.x);
            const a = - 1 / slope;
            const b = mp.y - a * mp.x;

            drawLine(0, b, 800, a * 800 + b, 'black');

            n_lines.push({ a, b });
        }

        n_lines.push({ a: 0, b: 0 });
        n_lines.push({ a: 0, b: 400 });

        const i_points = [];

        j2: for (let j = 0; j < n_lines.length; j++) {

            const jl = n_lines[j];

            k: for (let k = 0; k < n_lines.length; k++) {
                const kl = n_lines[k];

                if (jl.a === kl.a && jl.b === kl.b) continue k;

                const x = (kl.b - jl.b) / (jl.a - kl.a);
                const y = kl.a * x + kl.b;

                // if (x >= 0 && y <= MAX_WIDTH && y >= 0 && y <= MAX_HEIGHT) {
                //     i_points.push({ x, y });
                // }

                drawPoint(x, y, 'yellow');
                i_points.push({ x, y });
            }

        }

        const s_points = [];

        j3: for (let j = 0; j < i_points.length; j++) {
            const jp = i_points[j];
            let flag = true;

            k2: for (let k = 0; k < n_lines.length; k++) {
                const kl = n_lines[k];
                const p1 = {
                    x: 0,
                    y: kl.b
                };
                const p2 = {
                    x: 800,
                    y: kl.a * 800 + kl.b
                };

                const q1 = (jp.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (jp.y - p1.y) > 0;
                const q2 = (ip.x - p1.x) * (p2.y - p1.y) - (p2.x - p1.x) * (ip.y - p1.y) > 0;

                if (q1 !== q2) {
                    flag = false;
                    break k2;
                }
            }

            if (flag) {
                drawPoint(jp.x, jp.y, 'red');
                s_points.push(jp);
            }
        }

        console.log(s_points.length);
        voronoi.push(s_points);
        drawPoint(ip.x, ip.y, 'orange');
    }

    return voronoi;
}

function voronoi(p = [], ctx) {
    const v = [];
    let i = 0;

    const clearCanvas = () => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, 800, 400);
    };

    const drawPoint = (x, y, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.strokeStyle = 'black';
    };

    const drawLine = (x1, y1, x2, y2, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.strokeStyle = 'black';
    }

    const drawPoints = () => {
        p.forEach(i => {
            drawPoint(i.x, i.y, 'blue');
        });
    };

    clearCanvas();
    drawPoints();

    const firstInterval = setInterval(() => {
        debugger;
        if (i >= 1)
            clearInterval(firstInterval);
        else {
            const n_lines = [];
            const ip = p[i];
            let j = 0;

            const secondInterval = setInterval(() => {

                if (j >= 3)
                    clearInterval(secondInterval);
                else {
                    const jp = p[j];

                    if (ip.x === jp.x && ip.y === jp.y) return;

                    const mp = {
                        x: (ip.x + jp.x) / 2,
                        y: (ip.y + jp.y) / 2
                    };

                    const slope = (jp.y - ip.y) / (jp.x - ip.x);
                    const a = - 1 / slope;
                    const b = mp.y - a * mp.x;

                    drawLine(ip.x, ip.y, jp.x, jp.y, 'blue');
                    drawPoint(mp.x, mp.y, 'red');

                    j++;
                }
            }, 0);

            i++;
        }
    }, 0);
}