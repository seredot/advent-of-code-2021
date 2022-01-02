export { };

const text = await Deno.readTextFile("./d14.txt");
const sections = text.split("\n\n");
let polymer = sections[0].split('');
const rules = sections[1].split("\n").map(r => { const tokens = r.split(' -> '); return { a: tokens[0].charAt(0), b: tokens[0].charAt(1), c: tokens[1] } });

const iter = () => {
    let next = [];

    for (let i = 0; i < polymer.length - 1; i++) {
        next.push(polymer[i]);
        for (const r of rules) {
            if (polymer[i] === r.a && polymer[i + 1] === r.b) {
                next.push(r.c);
            }
        }
    }

    next.push(polymer[polymer.length - 1]);
    polymer = next;
}

for (let i = 0; i < 10; i++) {
    iter();
}

const counters = polymer.reduce((counters, elem) => {
    if (!counters[elem]) {
        counters[elem] = 0;
    }

    counters[elem]++;
    return counters;
}, {});

let max = { element: "", count: Number.MIN_SAFE_INTEGER };
let min = { element: "", count: Number.MAX_SAFE_INTEGER };

for (const k in counters) {
    if (counters[k] > max.count) {
        max = { element: k, count: counters[k] };
    }

    if (counters[k] < min.count) {
        min = { element: k, count: counters[k] };
    }
}

console.log(max.count - min.count);
