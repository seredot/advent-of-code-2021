export { };

const text = await Deno.readTextFile("./d10.txt");
const lines = text.split("\n");

const scores = [];

lines.map(line => {
    const stack = [];

    const chars = line.split('');
    const rules = {
        ')': { opener: '(', v1: 3, v2: 1 },
        ']': { opener: '[', v1: 57, v2: 2 },
        '}': { opener: '{', v1: 1197, v2: 3 },
        '>': { opener: '<', v1: 25137, v2: 4 }
    };

    outer:
    for (const b of chars) {
        for (const r in rules) {
            if (b === r) {
                if (stack.length === 0) {
                    return;
                }
                if (stack[stack.length - 1] === rules[r].opener) {
                    stack.pop();
                    continue outer;
                }
                return;
            }
        }
        stack.push(b);
    }

    const mapping = { '(': ')', '[': ']', '{': '}', '<': '>' };

    let sum = 0;

    while (stack.length) {
        const opener = stack.pop();
        const closer = mapping[opener];
        sum *= 5;
        sum += rules[closer].v2;
    }

    if (sum > 0) {
        scores.push(sum);
    }
});

scores.sort((a, b) => a - b);
console.log(scores[(scores.length - 1) / 2]);
