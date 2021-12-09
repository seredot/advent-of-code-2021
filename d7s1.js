export { };

const text = await Deno.readTextFile("./d7.txt");
const nums = text.split(",").map(x => parseInt(x));

let min = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < 2000; i++) {
  let sum = 0;
  for (const p of nums) {
    sum += Math.abs(p - i);
  }
  min = Math.min(min, sum);
}

console.log(min);
