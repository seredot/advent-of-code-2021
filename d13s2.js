export { };

const text = await Deno.readTextFile("./d13.txt");
const sections = text.split("\n\n");
const lines = sections[0].split("\n");
const instructions = sections[1].split("\n").map(i => i.replace('fold along ', '')).map(i => { const tokens = i.split('='); return { axis: tokens[0], offset: tokens[1] } });
let coords = {};

lines.forEach(line => {
    const xy = line.split(',');
    coords[line] = { x: parseInt(xy[0]), y: parseInt(xy[1]) };
});

const foldX = offset => {
    const next = {};

    for (const k in coords) {
        const c = coords[k];

        if (c.x < offset) {
            next[k] = c;
        } else if (c.x > offset) {
            const key = `${offset - (c.x - offset)},${c.y}`;
            next[key] = {
                x: offset - (c.x - offset),
                y: c.y,
            }
        }
    }

    return next;
}

const foldY = offset => {
    const next = {};

    for (const k in coords) {
        const c = coords[k];

        if (c.y < offset) {
            next[k] = c;
        } else if (c.y > offset) {
            const key = `${c.x},${offset - (c.y - offset)}`;
            next[key] = {
                x: c.x,
                y: offset - (c.y - offset),
            }
        }
    }

    return next;
}

instructions.forEach(inst => {
    coords = inst.axis === 'x' ? foldX(inst.offset) : foldY(inst.offset);
})

const w = 50;
const h = 6;
const canvas = new Array(w * h);
canvas.fill(' ');

for (const k in coords) {
    const coord = coords[k];
    canvas[w * coord.y + coord.x] = "#";
}

for (let y = 0; y < h; y++) {
    console.log(canvas.slice(w * y, w * y + w).join(''));
}
