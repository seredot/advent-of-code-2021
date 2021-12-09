export { };

const text = await Deno.readTextFile("./d6.txt");
const nums = text.split(",");//.map(x=>parseInt(x));

let fishByTime = new Array(9).fill(0);

const addFish = (time) => {
  fishByTime[time]++;
}

for (const num of nums) {
  addFish(num);
}

for (let i = 0; i < 256; i++) {
  const next = new Array(9).fill(0);

  const zeros = fishByTime[0];

  for (let k = 1; k < 9; k++) {
    if (fishByTime[k]) {
      next[k - 1] = fishByTime[k];
    }
  }

  next[8] = zeros;
  next[6] = zeros + next[6];

  fishByTime = next;
}

console.log(fishByTime.reduce((t, c) => { return t + c; }, 0))