export {};

const text = await Deno.readTextFile("./d4.txt");
const lines = text.split("\n");
const input = lines[0].split(',').map(s=>parseInt(s));
const nums: number[] = [];

for (let i = 1; i < lines.length; i++) {
  const arr = lines[i].split(' ');
  for (let s of arr) {
    if (s.length) {
      nums.push(parseInt(s) as number);
    }
  }
}

const check = (i: number): number => {
  const card = Math.floor(i / 25);
  const j = i - card * 25;
  const row = Math.floor(j / 5);
  const column = j - row * 5;

  let allHit = true;
  
  for (let a = 0; a < 5; a++) {
    if (nums[card * 25 + row * 5 + a] !== -1) {
      allHit = false;
      break;
    }
  }

  if (allHit) {
    return card;
  }

  allHit = true;
  
  for (let a = 0; a < 5; a++) {
    if (nums[card * 25 + a * 5 + column] !== -1) {
      allHit = false;
      break;
    }
  }

  if (allHit) {
    return card;
  }

  return -1;
}

const play = () => {
  let ret = 0;

  for (let t of input) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === t) {
        nums[i] = -1;

        const card = check(i);
        if (card !== -1) {
          let sum = 0;

          for (let j = 0; j < 25; j++) {
            const z = nums[card * 25 + j];
            nums[card * 25 + j] = -2;
            if (z > -1) {
              sum += z;
            }
          }

          ret = t * sum;
        }
      }
    }
  }

  return ret;
}

console.log(play());