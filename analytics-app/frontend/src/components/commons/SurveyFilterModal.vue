<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <div class="heading">Filtern:</div>
      </div>
      <div class="modal-body">
        Content
        <div v-for="id in answer_IDs" :key="id">{{ id }}</div>
      </div>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        >Check all</el-checkbox
      >
      <el-checkbox-group v-model="selectedIds" @change="handleCheckedIDsChange">
        <el-checkbox v-for="id in answer_IDs" :key="id" :label="id">
          {{ id }}
        </el-checkbox>
      </el-checkbox-group>
      <div class="modal-footer">
        <el-button class="sodis save-btn">Save</el-button>
        <el-button class="sodis close-btn">Close</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.handleCheckAllChange();
  },
  methods: {
    handleCheckAllChange(checkAll) {
      if (this.selectedIds.length === this.answer_IDs.length) {
        this.selectedIds = [];
        this.checkAll = false;
      } else {
        this.selectedIds = this.answer_IDs;
        this.checkAll = true;
      }
      return this.selectedIds, this.checkAll;
    },
    handleCheckedIDsChange(selectedIds) {
      if (
        this.selectedIds.length === 0 ||
        this.selectedIds.length === this.answer_IDs.length
      ) {
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = true;
      }
      this.checkAll = this.selectedIds.length === this.answer_IDs.length;
      return this.checkAll, this.indeterminate;
    },
  },
  data() {
    return {
      answer_IDs: ["14563245", "212341234", "1232312312"],
      selectedIds: [],
      isIndeterminate: false,
      checkAll: true,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 100;
  background-color: #000000da;
}

.modal-content {
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 500px;
  width: 1000px;
  border-radius: 5px;
  margin-top: 5%;
}
.modal-header {
  box-sizing: border-box;

  padding: 10px;
  height: 50px;
  width: 100%;
  background-color: black;
}
.modal-body {
  display: flex;
  flex-direction: column;
}
.modal-footer {
  box-sizing: border-box;
  padding: 10px;
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.heading {
  grid-column: 3;
  grid-row: 1;
}
.close-btn {
  grid-column: 5;
  grid-row: 1;
  cursor: pointer;
}

.sodis {
  background-color: var(--bg-color);
  color: white;
  width: 100px;
}
</style>
