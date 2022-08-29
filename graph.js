class Queue {
    constructor(){
        this.items = []
    }
    
    enqueue(element){
        this.items.push(element)
    }
    
    dequeue(){
        if(this.items.length == 0){
            return "Empty"
        }else{
            return this.items.shift()
        }
    }

    first(){
        if(this.isEmpty()){
            return "Empty"
        }else{
            return this.items[0]
        }
    }

    isEmpty(){
        return this.items.length == 0
    }
}

class Graph{
    constructor(noOfNodes){
        this.noOfNodes = noOfNodes //noOfNodes chứa số lượng node của graph
        this.AdjList = new Map() //AdjList chứa các neighbor của 1 node cụ thể
    }

    addNode(v){
        this.AdjList.set(v, []) //thêm node v là key của AdjList và khởi tạo giá trị của nó với mảng
    }

    addEdge(v, w){
        this.AdjList.get(v).push(w) //lấy neighbor cho node v và đặt node w, biểu thị edge giữa v và w
        this.AdjList.get(w).push(v) //graph undirected, thêm edge từ w đến v
    }

    printGraph(){
        let getKeys = this.AdjList.keys() //lấy tất cả các node
        for(let i of getKeys){ //lặp qua các node
            let getValues = this.AdjList.get(i) //các node neighbor tương ứng
            let conc = ""
            for(let j of getValues){ //lặp qua các node neighbor và nối các giá trị thành chuỗi
                conc += j + " "
                console.log(i + "->" + conc)
            }
        }
    }

    bfs(startingNode){
        let visited = {}
        let q = new Queue()
        
        // thêm starting node vào queue
        visited[startingNode] = true 
        q.enqueue(startingNode)

        //lặp lại cho đến khi queue trống
        while(!q.isEmpty()){
            let getQueueElement = q.dequeue() //lấy phần tử trong queue
            console.log(getQueueElement)
            //lấy các node neighbor của node hiện tại
            let getList = this.AdjList.get(getQueueElement) 
            //lặp qua các neighbor và thêm element vào queue nếu nó chưa đc xử lí
            for(let i in getList){
                let neigh = getList[i]
                if(!visited[neigh]){
                    visited[neigh] = true
                    q.enqueue(neigh)
                }
            }
        }
    }

    dfs(startingNode){
        let visited = {}
        this.DFSUtil(startingNode, visited)
    }

    
    DFSUtil(vert, visited){
        visited[vert] = true // đánh dấu node đã đc duyệt qua
        console.log(vert)
        let getNeighbor = this.AdjList.get(vert) //lấy các node neighbor của node hiện tại
        for(let i in getNeighbor){ //lặp qua mảng chứa node neighbor
            let getElement = getNeighbor[i]
            //đệ quy với tất cả các node liền kề của node
            if(!visited[getElement]){
                this.DFSUtil(getElement, visited)
            }
        }
    }
}

const graph = new Graph(6)
const nodes = ["A", "B", "C", "D", "E", "F"]

for(let i = 0; i < nodes.length; i++){
    graph.addNode(nodes[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'D')
graph.addEdge('A', 'E')
graph.addEdge('B', 'C')
graph.addEdge('D', 'E')
graph.addEdge('E', 'F')
graph.addEdge('E', 'C')
graph.addEdge('C', 'F')

graph.printGraph()

graph.bfs("A")
graph.dfs("A")



