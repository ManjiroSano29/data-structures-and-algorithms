function linearSearch(arr, target){
    for(let i = 0 ; i <= arr.length - 1; i++ ){
        if(arr[i] === target){
            return i
        }
    }
    return -1
}

console.log(linearSearch([1, 12, 58, 64, 23, 7, 55], 64))