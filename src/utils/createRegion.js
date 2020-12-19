const random = function(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

export default function() {
    return {
        start: { x: random(1, 390), y: random(1, 190) },
        end: { x: random(400, 799), y: random(200, 399) }
    }
}