/* 
--> Đầu tiên sẽ tạo class HashTable chứa thuộc tính là table với buckets có kích thước là 127
và size được khởi tạo là 0

class HashTable{
    constructor(){
        this.table = new Array(127)
        this.size = 0
    }
}

--> Dùng phương thức hash() để chuyển giá trị key thành index. Cách đơn giản để tạo hash function
là tính tổng mã ASCII của các kí tự trong key bằng cách sử dụng phương thức charCodeAt(). class HashTable
có 127 buckets nên phương thức _hash() trả về số giữa 0 đến 127 

_hash(key){
    let hash = 0
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i)
    }
    return hash % this.table.length
}

--> Để thêm cặp key/value vào trong hash table, ta sẽ sử dụng phương thức set()
- Phương thức set() sẽ gọi _hash() để lấy giá trị index
- Cặp [key, value] sẽ gán cho table tại index được chỉ định
- Sau đó, thuộc tính size sẽ tăng lên 1

set(key, value) {
    const index = this._hash(key)
    this.table[index] = [key, value]
    this.size++
}

--> Để nhận giá trị nhất định từ Hash Table, ta sẽ sử dụng phương thức get()
- Phương thức get() sẽ gọi _hash() để truy xuất index của bảng
- Trả về giá trị được lưu trữ trong table[index]

get(key) {
    const index = this._hash(key)
    return this.table[index]
}

--> Để xóa cặp key/value từ Hash Table, ta sẽ sử dụng thương thức remove()
- Trích xuất index bằng cách sử dụng _hash()
- Kiểm tra xem table[index] có giá trị hay ko và thuộc tính length > 0. Gán giá trị undefined cho 
đúng index và giảm thuộc tính size đi 1
- Nếu không có thì trả về false

remove(key) {
    const index = this._hash(key)
    if (this.table[index] && this.table[index].length) {
        this.table[index] = undefined
        this.size--
        return true
    }else{
        return false;
    }
}
*/

/*
- Tuy nhiên, hash function sẽ trả về số index giống nhau. Ví dụ như chuỗi "Spain" và "ắ" đều trả về giá trị
hash giống nhau bởi vì số 507 là tổng của cả hai mã ASCII của chúng
- Giá trị hash giống nhau sẽ khiến cho index bị xung đột, ghi đè mục nhập trước đó bằng mục nhập mới
- Ngay bây giờ, dữ liệu được lưu trữ trong quá trình triển khai Hash Table trông như sau:
[
    [ "Spain", 110],
    [ "France", 100]
]
- Để xử lí collision, ta sẽ lưu trữ cặp key/value ở trong mảng thứ 2 và kết quả cuối cùng như này:
[
    [
        [ "Spain", 110 ],
        [ "ǻ", 192 ]
    ],
    [
        ["France", 100]
    ],
]

--> Để tạo mảng thứ 2, ta cần cập nhật phương thức set() và nó sẽ:
- Kiểm tra table[index] và lặp qua các giá trị mảng
- Nếu key tại một trong các mảng bằng với key được truyền cho phương thức, thay thế giá trị ở index 1
và dừng bất kì thực thi nào nữa với lệnh return
- Nếu không tìm thấy key phù hợp, hãy đẩy một mảng key và value mới sang mảng thứ 2
- Trường hợp khác, khởi tạo một mảng mới và đẩy cặp key/value đến index được chỉ định
- Bất cứ khi nào phương thức push() đc gọi, tăng thuộc tính size lên 1 

set(key, value){
    const index = this._hash(key)
    if(this.table[index]){
        for(let i = 0; i < this.table[index].length; i++){
            if(this.table[index][i][0] == key){
                this.table[index][i][1] = value
                return
            }
        }
        this.table[index].push([key, value])
    }else{
        this.table[index] = []
        this.table[index].push([key, value])
    }
    this.size++
}

--> Tiếp theo, cập nhật phương thức get() để nó cũng sẽ kiểm tra mảng cấp hai bằng vòng lặp for 
và trả về cặp key/value

get(key){
    const index = this._hash(key)
    if(this.table[index]){
        for(let i = 0; i < this.table[index].length; i++){
            if(this.table[index][i][0] == key){
                return this.table[index][i][1]
            }
        }
    }
    return undefined 
}

--> Cuối cùng, cần cập nhật phương thức remove() để nó sẽ lặp qua mảng cấp hai và loại bỏ mảng 
có giá trị key bằng phương thức splice()

remove(key){
    const index = this._hash(key);
    if(this.table[index] && this.table[index].length) {
        for(let i = 0; i < this.table[index].length; i++){
            if(this.table[index][i][0] == key){
                this.table[index].splice(i, 1)
                this.size--
                return true
            }
        }
    }else{
        return false
    }
}

--> Bonus, thêm một phương thức display() sẽ hiển thị tất cả các cặp key/value được lưu trữ 
trong Hash Table
Chỉ cần sử dụng phương thức forEach() để lặp qua bảng và map() các giá trị thành một chuỗi
*/

class HashTable{
    constructor(){
        this.table = new Array(127)
        this.size = 0
    }
    
    _hash(key){
        let hash = 0
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i)
        }
        return hash % this.table.length
    }

    set(key, value){
        const index = this._hash(key)
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] == key){
                    this.table[index][i][1] = value
                    return
                }
            }
            this.table[index].push([key, value])
        }else{
            this.table[index] = []
            this.table[index].push([key, value])
        }
        this.size++
    }

    get(key){
        const index = this._hash(key)
        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] == key){
                    return this.table[index][i][1]
                }
            }
        }
        return undefined 
    }

    remove(key){
        const index = this._hash(key);
        if(this.table[index] && this.table[index].length) {
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] == key){
                    this.table[index].splice(i, 1)
                    this.size--
                    return true
                }
            }
        }else{
           return false
        }
    }

    display() {
        this.table.forEach((values, index) => {
            const chainedValues = values.map(
                ([key, value]) => `[ ${key}: ${value} ]`
            );
            console.log(`${index}: ${chainedValues}`);
        });
    }
}

const ht = new HashTable()

ht.set("France", 111)
ht.set("Spain", 150)
ht.set("ǻ", 192)

ht.display()

console.log(ht.size)
ht.remove("Spain")
ht.display()


