function quickSort(arr) {
    if (!Array.isArray(arr)) return;
    if (arr.length <= 1) return arr;
    var left = [],
        right = [];
    var num = Math.floor(arr.length / 2);
    console.log(num);
    var numValue = arr.splice(num, 1)[0];
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > numValue) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    return [...quickSort(left), numValue, ...quickSort(right)]
}

let arr = [3,2,6,1,5,7,4,9,8]
let res = quickSort(arr)
console.log(res);