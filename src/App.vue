<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="grid-content">
          <Editor :title="title" :code.sync="code" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <Output :output="output" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="interpreter">
        <Interpreter :code="code" @result="updateOutput" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
import Interpreter from "./components/Interpreter.vue";
import Output from "./components/Output.vue";

export default {
  name: "app",
  components: {
    Editor,
    Output,
    Interpreter,
  },
  data() {
    return {
      output: null,
      title: null,
      code: null,
    };
  },
  mounted() {
    this.title = "Introduction to python";
  },
  methods: {
    updateOutput(out) {
      this.output = out;
    },
  },
};
</script>

<style>
.interpreter {
  padding-top: 2rem;
}
</style>
