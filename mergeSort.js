function merge(left, right){
    let arrSorted = []
    while(left.length && right.length){
        if(left[0] < right[0]){
            arrSorted.push(left.shift())
        }else{
            arrSorted.push(right.shift())
        }
    }
    return [...arrSorted, ...left, ...right]
}

function mergeSort(arr){
    if(arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

let arr = [4,6,2,5,3,1,9,7]

console.log(mergeSort(arr))