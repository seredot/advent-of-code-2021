const text = await Deno.readTextFile("./d1.txt");

const nums = text.split("\n");

let prev: Number | null = null;
let count = 0;

nums.map((s) => parseInt(s)).forEach((n) => {
  if (prev !== null && n > prev) {
    count++;
  }
  prev = n;
});

console.log(count);
