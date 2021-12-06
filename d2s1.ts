const text = await Deno.readTextFile("./d2.txt");

const instructions = text.split("\n");

let x = 0, y = 0;

instructions.forEach((ins) => {
  const [cmd, num_str] = ins.split(" ");
  const num = parseInt(num_str);

  switch (cmd) {
    case "forward":
      x += num;
      break;
    case "down":
      y += num;
      break;
    case "up":
      y -= num;
      break;
  }
});

console.log(x * y);
