import grahamFind from './grahamMethod/find';
import jarvisFind from './jarvisMethod/find';
import { gaussRandom, circle, normalRandom, rectangel } from './createPoints';

export default function() {
    return [...Array(100).keys()]
        .map(i => (i + 1) * 30)
        .map(i => {
            const   p1 = rectangel(i)(normalRandom),
                    p2 = rectangel(i)(gaussRandom),
                    p3 = circle(i)(normalRandom),
                    p4 = circle(i)(gaussRandom);

            let     gp1 = grahamFind(p1).time,
                    jp1 = jarvisFind(p1).time,
                    gp2 = grahamFind(p2).time,
                    jp2 = jarvisFind(p2).time,
                    gp3 = grahamFind(p3).time,
                    jp3 = jarvisFind(p3).time,
                    gp4 = grahamFind(p4).time,
                    jp4 = jarvisFind(p4).time;

            for(let k = 0; k < 9; k++) {
                    gp1 += grahamFind(p1).time;
                    jp1 += jarvisFind(p1).time;
                    gp2 += grahamFind(p2).time;
                    jp2 += jarvisFind(p2).time;
                    gp3 += grahamFind(p3).time;
                    jp3 += jarvisFind(p3).time;
                    gp4 += grahamFind(p4).time;
                    jp4 += jarvisFind(p4).time;
            }

            gp1 /= 10;
            jp1 /= 10;
            gp2 /= 10;
            jp2 /= 10;
            gp3 /= 10;
            jp3 /= 10;
            gp4 /= 10;
            jp4 /= 10;

            return { i, gp1, gp2, gp3, gp4, jp1, jp2, jp3, jp4 };
        })
}