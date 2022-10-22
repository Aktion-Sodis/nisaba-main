<template>
  <div class="modal-dialog">
    <div class="modal-inner">
      <div class="modal-top">
        <div class="modal-title">Filtern</div>
        <button
          class="modal-close"
          type="button"
          @click="saveIDs(originallySelectedIDs)"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="modal-content">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          >Check all</el-checkbox
        >
        <el-checkbox-group
          v-model="selected_IDs"
          @change="handleCheckedIDsChange"
        >
          <el-checkbox v-for="id in answer_IDs" :key="id" :label="id">
            {{ id }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modal-bottom">
        <div class="modal-button" @click="saveIDs(selected_IDs)">Save</div>
      </div>
    </div>
  </div>
  <!-- <div class="modal-dialog">
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
          v-model="selected_IDs"
          @change="handleCheckedIDsChange"
        >
          <el-checkbox v-for="id in answer_IDs" :key="id" :label="id">
            {{ id }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modal-footer">
        <el-button class="sodis save-btn" @click="saveIDs(selected_IDs)"
          >Save</el-button
        >
        <el-button
          class="sodis close-btn"
          @click="saveIDs(originallySelectedIDs)"
          >Close</el-button
        >
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: {
    answerIDs: Array,
    selectedIDs: Array,
  },
  mounted() {
    this.init();
    // this.initCheckAll();
  },
  methods: {
    init() {
      this.originallySelectedIDs = this.selected_IDs;
      // console.log(this.selected_IDs.length);
      if (this.selected_IDs.length === this.answer_IDs.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      } else if (this.selected_IDs.length === 0) {
        this.isIndeterminate = false;
        this.checkAll = false;
      } else {
        this.isIndeterminate = true;
        this.checkAll = false;
      }
      return this.checkAll;
    },
    handleCheckAllChange(checkAll) {
      if (this.selected_IDs.length === this.answer_IDs.length) {
        this.selected_IDs = [];
        this.checkAll = false;
      } else {
        this.selected_IDs = this.answer_IDs;
        this.checkAll = true;
        this.isIndeterminate = false;
      }
      return this.selected_IDs, this.checkAll;
    },
    handleCheckedIDsChange(selected_IDs) {
      if (
        this.selected_IDs.length === 0 ||
        this.selected_IDs.length === this.answer_IDs.length
      ) {
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = true;
      }
      this.checkAll = this.selected_IDs.length === this.answer_IDs.length;
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
      selected_IDs: this.selectedIDs,
      originallySelectedIDs: [],
      isIndeterminate: false,
      checkAll: true,
    };
  },
};
</script>

<style scoped>
.modal-dialog {
  --gap: 15px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: var(--gap);
  background: rgba(0, 0, 0, 0.5);
  font-family: sans-serif;

  z-index: 100;
}

.modal-inner {
  background: #ffffff;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border-radius: 4px;
}

.modal-top {
  display: flex;
  align-items: center;
  background-color: #eeeeee;
}

.modal-title {
  flex-grow: 1;
  padding: 0 var(--gap);
  font-size: 20px;
}

.modal-close {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--gap);
  background: none;
  border: none;
  outline: none;
}

.modal-content {
  padding: 0 var(--gap);
  line-height: 1.5;
}

.modal-bottom {
  text-align: right;
  padding: 0 var(--gap) var(--gap) var(--gap);
}

.modal-button {
  display: inline-block;
  padding: 6px 12px;
  background: var(--bg-color);
  border: none;
  outline: none;
  border-radius: 3px;
  color: #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.modal-button:not(:last-child) {
  margin-right: var(--gap);
}

.modal-button:hover {
  background: var(--item-hover);
}

/* .modal-dialog {
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
} */
</style>
