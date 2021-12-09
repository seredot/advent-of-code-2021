export { };

const text = await Deno.readTextFile("./d9.txt");
const lines = text.split("\n");
const nums = lines.map(ln => ln.split("").map(x => parseInt(x)));

let sum = 0;

for (let y = 0; y < nums.length; y++) {
  for (let x = 0; x < nums[y].length; x++) {
    let isMin = true;
    const n = nums[y][x];

    if (y !== 0 && nums[y - 1][x] <= n) {
      isMin = false;
    }

    if (y !== nums.length - 1 && nums[y + 1][x] <= n) {
      isMin = false;
    }

    if (x !== 0 && nums[y][x - 1] <= n) {
      isMin = false;
    }

    if (x !== nums[0].length - 1 && nums[y][x + 1] <= n) {
      isMin = false;
    }

    if (isMin) {
      sum += n + 1;
    }
  }
}

console.log(sum);
