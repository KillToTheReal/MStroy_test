type TreeNode = {
  id: number | string;
  parent: number | string | null;
  type?: string | null;
};

class Tree {
  private nodes: TreeNode[];
  // Создание мап для детей и нод выйдет быстрее чем в функциях getChildren и GetItem пробегать по массиву с помощью find и
  private children: Map< String | Number, TreeNode[]> = new Map();
  private nodeMap: Map< String | Number, TreeNode> = new Map();

  constructor(nodes: TreeNode[]) {
    for(let node of nodes){
      // Заполняем мапу с нодами данными, а мапу с дочерними элементами пустыми массивами для последующего заполнения
      this.nodeMap.set(node.id,node);
      this.children.set(node.id, []);
    }
    // Заполняем мапу с дочерними эл-тами 
    for(let node of nodes){
      if(node.parent !== null)
       this.children.get(node.parent)!.push(node);
    }
    // Для вывода всего списка в изначальном виде
    this.nodes = nodes;
  }

  getChildren(id: number | string): TreeNode[] | undefined {
    return this.children.get(id) != undefined ? this.children.get(id) : [];
  }

  getAll(): TreeNode[] {
    return this.nodes;
  }

  getItem(id: number | string): TreeNode | undefined {
    return this.nodeMap.get(id);
  }

  getAllChildren(id: number | string): TreeNode[] {
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [...(this.getChildren(id) || [])];

    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      result.push(currentNode);

      const children = this.getChildren(currentNode.id);
      stack.push(...children as TreeNode[]);
    }

    return result;
  }

  getAllParents(id: number | string): TreeNode[] {
   const result: TreeNode[] = [];
  let currentNode = this.getItem(id);

  while (currentNode) {
    currentNode = this.getItem(currentNode.parent as number | string);
    if (currentNode) {
      result.push(currentNode);
    }
  }

  return result.reverse();
  }
}


const treeData: TreeNode[] = [
  { id: 1, parent: null, type: 'root' },
  { id: 2, parent: 1, type: 'child' },
  { id: 3, parent: 1, type: 'child' },
  { id: 4, parent: 2, type: 'grandchild' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
  { id: 12, parent: 8, type: null },
  { id: 9, parent: 5, type:"123321"},
];

const tree = new Tree(treeData);

console.log("Get all  ",tree.getAll());
console.log("Get item ",tree.getItem(2));
console.log("Get children ",tree.getChildren(1));
console.log("Get all children",tree.getAllChildren(1));
console.log("Get all parents",tree.getAllParents(7));
