let array = ["foo", "bar", "foo", "bar", "bar", "bar", "zoom"],
    result = array.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));

console.log("hiiiiiiiiiiiiiiiiii", result);