

const colors = [
    "#ff5d5d",
    "#ffb443",
    "#fff503",
    "#00ff75",
    "#38dbff", 
    "#dd7dff",
    "#9d4ecf",
    "#506eff",
    "#00bd5d",
    "#af5634",
    "#656565"
];

export function uniqueColor() {
    const color = colors.shift();
    colors.push(color);
    return color;
}