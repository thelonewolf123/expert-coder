<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="grid-content">
          <editor :title="title" :code.sync="code" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          <output-window :result="result" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="interpreter">
        <interpreter :code="code" @result="updateOutput" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";
import OutputWindow from "./Output.vue";

export default {
  components: {
    Editor,
    OutputWindow,
    Interpreter,
  },
  data() {
    return {
      result: null,
      title: null,
      code: null,
    };
  },
  mounted() {
    this.title = "Introduction to python";
  },
  methods: {
    updateOutput(out) {
      this.result = out;
    },
  },
};
</script>

<style>
.interpreter {
  padding-top: 2rem;
}
</style>
