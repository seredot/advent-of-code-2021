export { };

const text = await Deno.readTextFile("./d7.txt");
const nums = text.split(",").map(x => parseInt(x));

let min = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < 2000; i++) {
  let sum = 0;
  for (const p of nums) {
    const n = Math.abs(p - i);
    sum += n * (n + 1) / 2;
  }
  min = Math.min(min, sum);
}

console.log(min);
