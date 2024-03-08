export function sortByDate(arr){
    return arr.sort((a, b) => a.date < b.date ? -1 : 1);
}