export { };

const text = await Deno.readTextFile("./d5.txt");
const lines = text.split("\n");
const reg = /[0-9]+/g;
const segments = lines.map(line => line.match(reg)).map((ar) => ({ x1: parseInt(ar[0]), y1: parseInt(ar[1]), x2: parseInt(ar[2]), y2: parseInt(ar[3]) }));
const dots = {};

const putDot = (x, y) => {
  const key = `${x},${y}`;
  if (!dots[key]) {
    dots[key] = 1;
  } else {
    dots[key]++;
  }
}

const line = (s) => {
  let dx = 1;
  let dy = 1;
  
  if (s.x1 === s.x2) {
    dx = 0;
  } else if (s.x1 > s.x2) {
    dx = -1
  }

  if (s.y1 === s.y2) {
    dy = 0;
  } else if (s.y1 > s.y2) {
    dy = -1
  }

  let y = s.y1;
  let x = s.x1;

  const k = Math.max(Math.abs(s.x1-s.x2), Math.abs(s.y1-s.y2)) + 1;

  let c = 0;

  while (c < k) {
    putDot(x, y);
    x += dx
    y += dy
    c++;
  }
}

segments.forEach(s => {
  line(s)
});

const sum = Object.keys(dots).reduce((total, key) => {
  if (dots[key] > 1) {
    return total + 1;
  }
  return total;
}, 0);

console.log(sum);
