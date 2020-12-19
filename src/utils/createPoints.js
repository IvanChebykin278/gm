const createPoints = function(count = 100) {
    var i = 0;
    const points = [];

    const random = function(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    while(i < count) {
        const point = {
            x: random(1, 799),
            y: random(1, 399),
            index: i
        };

        const clone = points.find(item => (item.x === point.x) && (item.y === point.y));

        if(clone) {
            continue;
        } else {
            points.push(point);
            i++;
        }
    }

    return points;
};

export const circle = (count = 100) => (generator) => {
    const r = 150;

    const center = {
        x: 400,
        y: 200
    };

    let i = 0;
    const points = [];

    while(i < count) {

        const p = {
            x: generator(250, 550),
            y: generator(50, 350)
        };
        
        const clone = points.find(item => (item.x === p.x) && (item.y === p.y));
        const isInside = (p.x - center.x)*(p.x - center.x) + (p.y - center.y)*(p.y - center.y) < r*r;

        if(clone || !isInside) {
            continue;
        } else {
            points.push(p);
            i++;
        }
    }



    return points;
}

export const rectangel = (count = 100) => (generator) => {
    const r = {
        start: {
            x: 200,
            y: 100
        },
        end: {
            x: 600,
            y: 300
        }
    }

    let i = 0;
    const points = [];

    while(i < count) {

        const point = {
            x: generator(200, 600),
            y: generator(100, 300)
        };
        
        const clone = points.find(item => (item.x === point.x) && (item.y === point.y));

        if(clone) {
            continue;
        } else {
            points.push(point);
            i++;
        }
    }



    return points;
}

export const normalRandom = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return rand;
}

export const gaussRandom = (min, max) => {
    const gaussianRand = () => {
        var rand = 0;
      
        for (var i = 0; i < 5; i += 1) {
          rand += Math.random();
        }
      
        return rand / 5;
    }

    let rand = min - 0.5 + gaussianRand() * (max - min + 1);
    return rand;
}

export default createPoints;