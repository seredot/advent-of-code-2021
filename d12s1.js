export { };

const text = await Deno.readTextFile("./d12.txt");
const lines = text.split("\n");
const paths = {};

const addPath = (from, to) => {
    if (!paths[from]) {
        paths[from] = [to];
        return;
    }

    paths[from].push(to);
}

lines.forEach(line => {
    const tuple = line.split('-');
    addPath(tuple[0], tuple[1]);
    addPath(tuple[1], tuple[0]);
});

const findPaths = (from, visited = {}) => {
    if (visited[from] && from.charAt(0) === from.charAt(0).toLowerCase()) {
        return 0;
    }

    const v2 = { ...visited, [from]: true }
    const dests = paths[from];
    let sum = 0;
    dests.forEach(d => {
        if (d === 'end') {
            sum++;
            return;
        }
        sum += findPaths(d, v2);
    });

    return sum;
}

console.log(JSON.stringify(paths));

const sum = findPaths('start')
console.log(sum);
