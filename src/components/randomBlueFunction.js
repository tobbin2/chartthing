export function randomBlue(extra) {
    let h = 220 - extra*2
    let s = 55; 
    let l = 38 + extra;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}