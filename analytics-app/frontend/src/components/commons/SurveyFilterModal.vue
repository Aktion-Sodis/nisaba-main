<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <div class="heading">IDs Filtern:</div>
      </div>
      <div class="modal-body">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >Check all</el-checkbox
        >
        <el-checkbox-group
          v-model="selectedIds"
          @change="handleCheckedIDsChange"
        >
          <el-checkbox v-for="id in answer_IDs" :key="id" :label="id">
            {{ id }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modal-footer">
        <el-button class="sodis save-btn" @click="saveIDs(selectedIds)"
          >Save</el-button
        >
        <el-button
          class="sodis close-btn"
          @click="saveIDs(originallySelectedIDs)"
          >Close</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answerIDs: Array,
  },
  mounted() {
    this.handleCheckAllChange();
    this.assignOriginalIDs();
  },
  methods: {
    assignOriginalIDs() {
      this.originallySelectedIDs = this.answer_IDs;
    },
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
    saveIDs(IDs) {
      this.$emit("saveIDs", IDs);
    },
    clsoeModal() {
      this.$emit("closeModal");
    },
  },
  data() {
    return {
      answer_IDs: this.answerIDs,
      originallySelectedIDs: [],
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
  height: 400px;
  width: 1000px;
  border-radius: 5px;
  margin-top: 5%;
}
.modal-header {
  box-sizing: border-box;
  color: black;
  font-size: 20px;
  padding: 10px;
  height: 50px;
  width: 100%;
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
