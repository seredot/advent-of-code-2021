export { };

const text = await Deno.readTextFile("./d9.txt");
const lines = text.split("\n");
const nums = lines.map(ln => ln.split("").map(x => parseInt(x)));
const areas = [];
const width = nums[0].length;
const height = nums.length;

const paint = (x, y) => {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return 0;
  }

  const n = nums[y][x];
  if (n === -1 || n === 9) {
    return 0;
  }

  nums[y][x] = -1;

  return 1 + paint(x - 1, y) + paint(x + 1, y) + paint(x, y - 1) + paint(x, y + 1);
}

for (let y = 0; y < nums.length; y++) {
  for (let x = 0; x < nums[y].length; x++) {
    const a = paint(x, y);
    if (a > 0) {
      areas.push(a);
    }
  }
}

areas.sort((a, b) => a - b);
console.log(areas);

const sum = areas[areas.length - 1] * areas[areas.length - 2] * areas[areas.length - 3];

console.log(sum);
