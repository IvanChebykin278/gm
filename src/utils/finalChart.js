import createPoints from './createPoints';
import createRegion from './createRegion';

import fr1 from './firstMethod/find';
import fp2 from './secondMethod/preprocessing';
import fr2 from './secondMethod/find';
import fp3 from './thirdMethod/preprocessing';
import fr3 from './thirdMethod/find';

export default function () {
    const STEP = 200;

    const data = [];
    const region = createRegion();

    [...Array(15).keys()].map(i => {
        const count = i * STEP;

        let k12 = 0,
            k13 = 0,
            k23 = 0,
            r1 = 0,
            p2 = 0,
            r2 = 0,
            p3 = 0,
            r3 = 0;

        if (count !== 0) {
            const points = createPoints(count);

            for(let  o = 0; o < 10; o++) {
                r1 += fr1(points, region).time;
            }

            r1 /= 10;

            p2 = fp2(points);

            for(let y = 0; y < 10; y++) {
                r2 += fr2(p2, region).time;
            }
            debugger;

            r2 /= 10;
            p3 = fp3(points);

            for(let u = 0; u < 10; u++) {
                r3 += fr3(p3, region).time;
            }

            r3 /= 10;

            k12 = p2.time / Math.abs(r1 - r2);
            k23 = Math.abs(p3.time - p2.time) / Math.abs(r2 - r3);

        }

        if(k12 !== Infinity && k12 < 5000) {
            data.push({
                n: count,
                k12,
                k23
            });
        }
    });

    data.reverse();

    return data;
}
