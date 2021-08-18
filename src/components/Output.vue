<template>
  <div>
    <h1>Output</h1>
    <div>
      {{ result }}
    </div>
    <div>
      <el-input v-model="inputData" :placeholder="inputText"></el-input>
      <el-button @click="updateInputData">
        Submit
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["result", "inputText"],
  methods: {
    updateInputData() {
      this.$emit("updateInput", this.inputData);
      this.inputText = null;
      this.inputData = null;
    },
  },
  data() {
    return {
      inputData: null,
    };
  },
};
</script>
