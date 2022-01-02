export { };

const text = await Deno.readTextFile("./d14.txt");
const sections = text.split("\n\n");
const polymer = sections[0].split('');
const ruleArr = sections[1].split("\n").map(r => { const tokens = r.split(' -> '); return { a: tokens[0].charAt(0), b: tokens[0].charAt(1), c: tokens[1] } });
const rules = {};
ruleArr.forEach(r => {
    rules[r.a + r.b] = r;
});

const memo = {};

const add = (c1, c2) => {
    const sum = { ...c1 };

    for (const k in c2) {
        if (!sum[k]) {
            sum[k] = c2[k];
        } else {
            sum[k] += c2[k];
        }
    }

    return sum;
}

const build = (a, b, depth) => {
    if (depth === 0) {
        return {};
    }

    const rule = rules[a + b];
    if (!rule) {
        return {};
    }

    const key = a + b + depth;
    if (memo[key]) {
        return memo[key];
    }

    const c1 = build(a, rule.c, depth - 1);
    const c2 = build(rule.c, b, depth - 1);

    let sum = add(c1, c2);
    sum = add(sum, { [rule.c]: 1 });

    memo[key] = sum;
    return sum;
}

let counters = { [polymer[0]]: 1 };
for (let i = 0; i < polymer.length - 1; i++) {
    counters = add(counters, { [polymer[i + 1]]: 1 })
    counters = add(counters, build(polymer[i], polymer[i + 1], 40));
}

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
