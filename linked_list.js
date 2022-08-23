class Node {
    constructor(data) {
        this.data = data,
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null,
        this.size = 0
    }
    
    add(data){
        let node = new Node(data)
        let current 
        if(this.head == null){
            this.head = node
        }else{
            current = this.head
            while(current.next){
                current = current.next
            }
            current.next = node
        }
        this.size++
    }

    insertAt(data, index){
        if(index < 0 || index > this.size){
            return console.log("Please enter valid index")
        }else{
            let node = new Node(data)
            let curr, prev
            if(index == 0){
                node.next = this.head
                this.head = node
            }else{
                curr = this.head
                let it = 0
                while(it < index){
                    it++
                    prev = curr
                    curr = curr.next
                }
                node.next = curr
                prev.next = node
            }
            this.size++
        }
    }

    removeFrom(index){
        if(index < 0 || index > this.size){
            return console.log("Please enter valid index")
        }else{
            let curr
            let prev
            let it = 0
            curr = this.head
            prev = curr
            if(index == 0){
                this.head = curr.next
            }else{
                while(it < index){
                    it++
                    prev = curr
                    curr = curr.next
                }
                prev.next = curr.next
            }
            this.size--
            return curr.data
        }
    }

    removeData(data){
        let curr = this.head
        let prev = null
        while(curr != null){
            if(curr.data == data){
                if(prev == null){
                    this.head = curr.next
                }else{
                    prev.next = curr.next
                }
                this.size--
                return curr.data
            }
            prev = curr
            curr = curr.next
        }
        return -1
    }

    indexOf(data){
        let count = 0
        let curr = this.head
        while(curr != null){
            if(curr.data == data){
                return count
            }
            count ++
            curr = curr.next
        }
        return -1
    }


    printList() {
        let current = this.head;

        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }
}

const ll = new LinkedList()
ll.add(10)
ll.add(20)
ll.add(30)
ll.add(40)
ll.add(50)

ll.insertAt(60, 3)

ll.removeFrom(0)
ll.removeFrom(2)

ll.removeData(40)

ll.printList()



