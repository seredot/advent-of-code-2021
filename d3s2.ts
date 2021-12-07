export {};

const text = await Deno.readTextFile("./d3.txt");
const lines = text.split("\n");
let  nums = lines.map((a) => parseInt(a, 2));

const find = (comp: Function) => {
  let filtered = [...nums];
  let found = 0;

  for (let i = 0; i < 12; i++) {
    let ones = 0;

    filtered.forEach((num) => {
        ones += num >> (11 - i) & 1;
    });

    const c = comp(ones, filtered.length / 2);

    filtered = filtered.filter((n) => {
      return ((n >> (11 - i)) & 1) === c;
    });

    if (filtered.length === 1) {
      found = filtered[0];
    }
    console.log(filtered.length)
  }

  return found;
};

const og = find((ones: number, half: number) => ones >= half ? 1 : 0);
const co2 = find((ones: number, half: number) => ones < half ? 1 : 0);
console.log(og, co2);
console.log(og * co2);
