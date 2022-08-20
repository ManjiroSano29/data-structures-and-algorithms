class Stack {
    constructor(){
        this.items = []
    }

    push(element){
        this.items.push(element)
    }

    pop(){
        if(this.items.length == 0){
            return "Empty"
        }else{
            return this.items.pop()
        }
    }

    last(){
        if(this.items.length == 0){
            return "Empty"
        }else{
            return this.items[this.items.length - 1]
        }
    }
}

let stack = new Stack()

stack.push(10)
stack.push(20)
stack.push(30)
stack.push(40)
stack.push(50)
stack.push(60)
