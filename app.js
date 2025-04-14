const draggable = vuedraggable;

const app = Vue.createApp({
  data() {
    return {
      nodes: Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        text: `節點 ${i + 1} 的說明`,
        status: '未完成',
        fields: []
      })),
      nextId: 4,
      selectedNodeId: null
    };
  },
  computed: {
    selectedNode() {
      return this.nodes.find(n => n.id === this.selectedNodeId);
    }
  },
  methods: {
    addNode() {
      this.nodes.push({
        id: this.nextId,
        text: `節點 ${this.nextId} 的說明`,
        status: '未完成',
        fields: []
      });
      this.nextId++;
    },
    removeNode() {
      if (this.nodes.length > 0) {
        const removed = this.nodes.pop();
        if (removed.id === this.selectedNodeId) {
          this.selectedNodeId = null;
        }
        this.nextId--;
      }
    },
    markAsCompleted() {
      if (this.selectedNode && this.selectedNode.status === '未完成') {
        this.selectedNode.status = '完成';
      }
    },
    addField() {
      if (this.selectedNode) {
        this.selectedNode.fields.push({ item: '', due: '' });
      }
    },
    removeField(index) {
      if (this.selectedNode) {
        this.selectedNode.fields.splice(index, 1);
      }
    },
    exportJSON() {
      const result = this.nodes.map(node => ({
        id: node.id,
        name: node.text,
        completed: node.status === '完成',
        fields: node.fields.map(f => ({
          key: f.item,
          value: f.due
        }))
      }));
      console.log("🚀 匯出 JSON:", JSON.stringify(result, null, 2));
      alert("已匯出，請打開 console 查看結果！");
    }
  }
});

app.component('draggable', draggable);
app.mount('#app');
