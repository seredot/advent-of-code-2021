const text = await Deno.readTextFile("./d1.txt");

const nums = text.split("\n").map((s) => parseInt(s));

let prev = 1000000;
let count = 0;

for (let i = 2; i < nums.length; i++) {
  const sum = nums[i - 2] + nums[i - 1] + nums[i];
  if (sum > prev) {
    count++;
  }
  prev = sum;
}

console.log(count);
