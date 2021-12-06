const text = await Deno.readTextFile("./d2.txt");

const instructions = text.split("\n");

let x = 0, y = 0, aim = 0;

instructions.forEach((ins) => {
  const [cmd, num_str] = ins.split(" ");
  const num = parseInt(num_str);

  switch (cmd) {
    case "forward":
      x += num;
      y += aim * num;
      break;
    case "down":
      aim += num;
      break;
    case "up":
      aim -= num;
      break;
  }
});

console.log(x * y);
