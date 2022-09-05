/* Dynamic programming là loại kĩ thuật mà không làm những thứ giống nhau lặp lại. Ở đây ta sẽ xét
bài toán fibonacci.
- Trong fibonacci thì số đằng sau bằng tổng 2 số đằng trước cộng lại(vd: f(2) = f(1) + f(0), f(3) = f(2) + (f1)), 
trừ f(0) = 0 và f(1) = 1 
- Chẳng hạn với n = 5 ===> f(5) = (f4) + f(3)
  Mà f(4) = (f3) + f(2), f(3) = (f2) + f(1), f(2) = f(1) + f(0)
  Ở đây ta thấy việc sử dụng đệ quy sẽ dẫn đến việc 1 số bước sẽ bị tính lại nhiều lần khiến cho độ
phức tạp thuật toán là O(2^n), tức là thời gian thực hiện sẽ rất là chậm nếu n có giá trị lớn
- Việc áp dụng dynamic programming sẽ ngăn chặn việc tính lại những thứ đã được tính toán từ trước rồi
*/

// Ta xem trường hợp đệ quy cơ bản sau
const basicRecursionFib = n => {
    if(n <= 1) return n
    return basicRecursionFib(n-1) + basicRecursionFib(n-2)
}

/* Và đây là khi dùng đệ quy ghi nhớ (memoize recursion). Ý tưởng của kĩ thuật này là tạo ra array 
với độ dài n (vd: n = 5). Ta sẽ lưu giá trị vào trong mảng với index tương ứng

                    | \ | 1 | 1 |   |   |   |
                      0   1   2   3   4   5 

- Ta sẽ không xét arr[0] vì fib(0) luôn bằng 0
  fib(1) = 1 ===> arr[1] = 1
  fib(2) = 1 ===> arr[2] = 1
- Ví dụ ta tính fib(3), dựa trên mảng ta sẽ xét arr[3] nếu nó không null thì sẽ return thẳng giá trị,
nếu nó null thì sẽ tính xuống phía dưới tức là fib(2) và fib(1). Ở đây fib(2) và fib(1) đã có ở trong
arr rồi nên nó sẽ return thẳng giá trị tổng cho fib(3) luôn
  fib(3) = fib(2) + fib(1) = 2 ===> arr[3] = 2
- Làm tương tự với fib(4), fib(5)... */

const memoizeRecursionFib = (n, cache=[0,1,1]) => {
    if(cache[n]) return cache[n]
    cache[n] = memoizeRecursionFib(n-1, cache) + memoizeRecursionFib(n-2, cache)
    return cache[n]
}

/* Tuy memoize recursion chạy nhanh hơn basic recursion phía trên nhưng vẫn phải gặp điểm yếu nhất của
việc sử dụng đệ quy, đó chính là tràn stack khi ta cho n giá trị quá lớn */

//Ta sẽ xét cách làm vòng lặp đơn giản sau
const basicLoopFib = (n, cache=[0,1,1]) => {
  if(n == 1 || n == 2) return 1
  for(let i = 3; i <= n; i++){
    cache[i] = cache[i-1] + cache[i-2]
  }
  return cache[n]
}

/* Cho array có độ dài n
   | \ | 1 | 1 | 2 | 3 | 5 | 8 | 13 |
     0   1   2   3   4   5   6   7

   Bây giờ ta sẽ sử dụng vòng lặp tối ưu hơn. Trường hợp này vd xét arr[7] thì ta chỉ quan tâm đến 2 phần
tử đứng trước nó là arr[5] và arr[6]. Ở đây tạo ra 2 biến a và b, sử dụng vòng lặp từ index = 3 đến n-1.
b = a + b, a = b - a */

const fastLoopFib = n => {
  if(n == 1 || n == 2) return 1
  let a = 1, b = 1
  for(let i = 3; i <= n; i++){
    b = a + b
    a = b - a
  }
  return b
}

// Ở đây ta sẽ xem điểm khác biệt về thời gian giữa các cách làm
console.time("basicRecursion")
console.log(basicRecursionFib(10000)) //tràn call stack
console.timeEnd("basicRecursion")

console.time("memoizeRecursion")
console.log(memoizeRecursionFib(10000)) //tràn call stack
console.timeEnd("memoizeRecursion")

console.time("basicLoop")
console.log(basicLoopFib(100000)) //5.849ms
console.timeEnd("basicLoop")

console.time("fastLoop")
console.log(fastLoopFib(100000)) //1.976ms
console.timeEnd("fastLoop")
