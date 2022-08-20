function bubble(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length - 1 - i; j++){
            if(arr[j] > arr[j + 1]){
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

console.log(bubble([5, 6, 43, 55, 63, 234, 12, 235, 547, 2]))