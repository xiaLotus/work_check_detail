const { createApp } = Vue;
const draggable = vuedraggable;

createApp({
  components: { draggable },
  data() {
    return {
      nodes: [
        { id: 1, name: '節點 1', fields: [], completed: false }
      ],
      selectedNodeId: 1,
      nextId: 2
    };
  },
  computed: {
    selectedNode() {
      return this.nodes.find(n => n.id === this.selectedNodeId) || null;
    }
  },
  methods: {
    addNode() {
      const newNode = {
        id: this.nextId++,
        name: `節點 ${this.nextId - 1}`,
        fields: [],
        completed: false
      };
      this.nodes.push(newNode);
      this.selectedNodeId = newNode.id;
    },
    selectNodeById(id) {
      this.selectedNodeId = id;
    },
    addField() {
      if (this.selectedNode) {
        this.selectedNode.fields.push({ key: '', value: '' });
      }
    },
    removeField(index) {
      if (this.selectedNode) {
        this.selectedNode.fields.splice(index, 1);
      }
    },
    toggleCompleted() {
        const node = this.nodes.find(n => n.id === this.selectedNodeId);
        if (node) node.completed = !node.completed;
    },
    onDragEnd() {
      // 保持 selectedNodeId，不用處理
    },
    exportJSON() {
      const jsonData = JSON.stringify(this.nodes, null, 2);
      console.log('🚀 匯出 JSON:', jsonData);
      alert('JSON 已輸出到 console！');
    }
  }
}).mount('#app');
