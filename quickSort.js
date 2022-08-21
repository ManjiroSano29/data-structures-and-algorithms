function partition(arr, start, end){
    let pivot = arr[start]
    let swapIndex = start
    for(let i = start + 1; i <= end; i++){
        if(pivot > arr[i]){
            swapIndex++
            if(i !== swapIndex){
                [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]]
            }
        }
    }

    if(swapIndex !== start){
        [arr[start], arr[swapIndex]] =[arr[swapIndex], arr[start]] 
    }

    return swapIndex
}

function quickSort(arr, start = 0, end = arr.length - 1){
    if(start >= end) return
    
    let pivotIndex = partition(arr, start, end)

    quickSort(arr, start, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, end)
    
    return arr
}

console.log(quickSort([4,3,1,6,5,2]))