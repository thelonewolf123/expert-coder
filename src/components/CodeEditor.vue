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
          <el-col class="interpreter">
            <interpreter :code="code" />
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";

export default {
  components: {
    Editor,
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
};
</script>

<style>
.interpreter {
  padding-top: 2rem;
}
</style>
