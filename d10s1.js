export { };

const text = await Deno.readTextFile("./d10.txt");
const lines = text.split("\n");

let sum = 0;
lines.map(line => {
    const stack = [];

    const chars = line.split('');
    const rules = {
        ')': { opener: '(', value: 3 },
        ']': { opener: '[', value: 57 },
        '}': { opener: '{', value: 1197 },
        '>': { opener: '<', value: 25137 }
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
                sum += rules[r].value;
                return;
            }
        }
        stack.push(b);
    }
});

console.log(sum);
