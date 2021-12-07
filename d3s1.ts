export {};

const text = await Deno.readTextFile("./d3.txt");
const lines = text.split("\n");

const totals = new Array(12).fill(0);

lines.forEach((line) => {
  const bits = parseInt(line, 2);

  for (let i = 0; i < 12; i++) {
    totals[i] += bits >> (11 - i) & 1;
  }
});

let gamma = 0;

totals.forEach((t) => {
  const bit = t > lines.length / 2 ? 1 : 0;
  gamma = gamma << 1 | bit;
});

const epsilon = ~gamma & 0xfff;

console.log(epsilon * gamma);
