class Node{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}

class BinarySearchTree{
    constructor(){
        //root của tree
        this.root = null
    }

    //phương thức này tạo node mới để chèn vào tree
    insert(data){
        let newNode = new Node(data)
        // nếu root là null thì thêm node mới vào tree và tạo root
        if(this.root == null){
            this.root = newNode
        }else{
            //tìm vị trí chính xác trong tree và chèn node 
            this.insertNode(this.root, newNode)
        }
    }

    /* phương thức này chèn thêm 1 node vào tree, 
    nó sẽ đi qua tree và tìm vị trí để chèn node với 1 dữ liệu nhât định*/
    insertNode(node, newNode){
        // nếu data nhỏ hơn data của node thì di chuyển sang bên trái của tree
        if(newNode.data < node.data){
            //nết left null thì chèn node mới vào đây
            if(node.left == null){
                node.left = newNode
            }else{
                //nếu left ko null thì đệ quy đến khi null được tìm thấy
                this.insertNode(node.left, newNode)
            }
        
            //nếu data lớn hơn data của node thì di chuyển sang bên phải của tree    
        }else{
            //nếu right null thì chèn node mới vào đây
            if(node.right == null){
                node.right = newNode
            }else{
                //nếu right ko null thì đệ quy đến khi null được tìm thấy
                this.insertNode(node.right, newNode)
            }
        }
    }

    remove(data){
        //root được khởi tạo lại với root của tree đã đc sửa đổi
        this.root = this.removeNode(this.root, data)
    }

    /*phương thức này loại bỏ node với data đã được chỉ định, 
    nó lặp lại cho đến khi tree tìm thấy data và loại bỏ nó*/
    removeNode(node, key){
        //nếu root là null thì tree trống
        if(node == null){
            return null
        }
        //nếu data để xóa nhỏ hơn data của root thì di chuyển đến subtree bên trái
        else if(key < node.data){
            node.left = this.removeNode(node.left, key)
            return node
        //nếu data để xóa lớn hơn data của root thì di chuyển đến subtree bên phải
        }else if(key > node.data){
            node.right = this.removeNode(node.right, key)
            return node
        //nếu data giống với data của root thì xóa node này đi    
        }else{
            //xóa node không có node con
            if(node.left == null && node.right == null){
                node = null
                return node
            }
            //xóa node có 1 node con
            if(node.left == null){
                node = node.right
                return node
            }
            if(node.right == null){
                node = node.left
                return node
            }
            //xóa node có 2 node con
            var aux = this.findMinNode(node.right)
            node.data = aux.data
            node.right = this.removeNode(node.right, aux.data);
            return node
        }
    }
    
    //tìm kiếm một node có giá trị nhỏ nhất bắt đầu từ node
    findMinNode(node){
        if(node.left == null){
            return node
        }else{
            //nếu bên trái node là null thì đây chắc chắn là node nhỏ nhất
            return this.findMinNode(node.left)
        }
    }
    
    //lấy phần root của tree
    getRootNode(){
        return this.root
    }

    //tìm kiếm node với data được chỉ định
    search(node, data){
        if(node == null){
            return null
        //nếu data nhỏ hơn data của node thì di chuyển sang bên trái    
        }else if(data < node.data){
            return this.search(node.left, data)
        //nếu data lớn hơn data của node thì di chuyển sang bên phải      
        }else if(data > node.data){
            return this.search(node.right, data)
        //nếu data bằng với data của node thì return node    
        }else{
            return node
        }
    }
    
    //node con trái -> node cha -> node con phải
    inorder(node){
        if(node !== null){
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    //node cha -> node con trái -> node con phải
    preorder(node){
        if(node !== null){
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
    
    //node con trái -> node con phải -> node cha
    postorder(node){
        if(node !== null){
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }
}

const binarySearchTree = new BinarySearchTree()
binarySearchTree.insert(15)
binarySearchTree.insert(25)
binarySearchTree.insert(10)
binarySearchTree.insert(7)
binarySearchTree.insert(22)
binarySearchTree.insert(17)
binarySearchTree.insert(13)
binarySearchTree.insert(5)
binarySearchTree.insert(9)
binarySearchTree.insert(27)

var root = binarySearchTree.getRootNode()
binarySearchTree.inorder(root)

binarySearchTree.remove(5)




