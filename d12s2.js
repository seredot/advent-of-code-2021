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
    let v2 = visited;

    if (from.charAt(0) === from.charAt(0).toLowerCase()) {
        v2 = { [from]: 0, ...visited };
        v2[from]++;

        if (v2[from] > 2) {
            return 0;
        }

        if (v2[from] > 1) {
            for (const k in v2) {
                if (k !== from && v2[k] > 1) {
                    return 0;
                }
            }
        }
    }

    const dests = paths[from];
    let sum = 0;
    dests.forEach(d => {
        if (d === 'start') {
            return;
        }

        if (d === 'end') {
            sum++;
            return;
        }

        sum += findPaths(d, v2);
    });

    return sum;
}

const sum = findPaths('start')
console.log(sum);
