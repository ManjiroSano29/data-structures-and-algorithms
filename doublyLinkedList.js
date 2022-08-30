function createNode(data){
    return {
        data: data,
        next: null,
        prev: null
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }

    insert(data){
        let newNode = createNode(data)
        if(this.tail){
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
            return newNode
        }
        this.head = this.tail = newNode
        this.legnth++
        return newNode
    }
    
    remove(){
        if(this.tail){
            this.length--
            const removeTail = this.tail
            this.tail = this.tail.prev
            if(this.tail){
                this.tail.next = null
            }else{
                this.head = null
            }
            return removeTail
        }
        return undefined
    }

    insertHead(data){
        let newNode = createNode(data)
        if(this.head){
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
            return newNode
        }
        this.head = this.tail = newNode
        this.length++
        return newNode
    }

    removeHead(){
        if(this.head){
            this.length--
            const removedHead = this.head
            this.head = this.head.next
            if(this.head){
                this.head.prev = null
            }else{
                this.tail = null
            }
            return removedHead
        }
        return undefined
    }

    insertAt(data, index) {
        if (index < 0 || index > this.length) {
            return console.log("Please enter valid index")
        }
      
        if (index == 0) {
            return this.insertHead(data)
        }
      
        this.length++
        let currentNode = this.head
        for (let i = 0; i < index; i++) {
            previousNode = currentNode
            currentNode = currentNode.next
        }
        const previousNode = currentNode.previous
        const newNode = createNode(data)
        newNode.next = currentNode
        newNode.previous = previousNode
        previousNode.next = newNode
        currentNode.previous = newNode
        return newNode
    }

    removeFrom(index) {
        if (index < 0 || index > this.length) {
            return console.log("Please enter valid index")
        }
      
        if (index == 0) {
            return this.removeHead()
        }
      
        this.length--
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next
        }
        const previousNode = currentNode.previous
        const nextNode = currentNode.next
        previousNode.next = nextNode
        nextNode.previous = previousNode
        return currentNode
    }




    print(){
        let current = this.head
        while(current){
            console.log(`${current.prev?.data} ${current.data} ${current.next?.data}`)
            current = current.next
        }
    }


}
const dll = new DoublyLinkedList()
dll.insert(10)
dll.insert(20)
dll.insert(30)
dll.insert(40)
dll.remove()


dll.print()