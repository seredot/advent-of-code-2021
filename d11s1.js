export { };

const text = await Deno.readTextFile("./d11.txt");
const lines = text.split("\n");
const nums = lines.map(line => line.split('').map(x => parseInt(x)));

const inc = (y, x) => {
    if (x < 0 || y < 0 || x > 9 || y > 9) {
        return
    };

    const old = nums[y][x];
    nums[y][x]++;
    if (old < 10 && nums[y][x] === 10) {
        flash(y, x);
    }
}

const flash = (y, x) => {
    inc(y - 1, x - 1);
    inc(y - 1, x);
    inc(y - 1, x + 1);
    inc(y, x - 1);
    inc(y, x + 1);
    inc(y + 1, x - 1);
    inc(y + 1, x);
    inc(y + 1, x + 1);
}

let sum = 0;

for (let i = 0; i < 100; i++) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            inc(y, x);
        }
    }

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (nums[y][x] > 9) {
                nums[y][x] = 0;
                sum++;
            }
        }
    }
}

console.log(sum);
