class Queue {
    constructor(){
        this.items = []
    }
    
    push(element){
        this.items.push(element)
    }
    
    shift(){
        if(this.items.length == 0){
            return "Empty"
        }else{
            return this.items.shift()
        }
    }

    first(){
        if(this.items.length == 0){
            return "Empty"
        }else{
            return this.items[0]
        }
    }
}

let queue = new Queue()

queue.push(10)
queue.push(20)
queue.push(30)
queue.push(40)
queue.push(50)
queue.push(60)









