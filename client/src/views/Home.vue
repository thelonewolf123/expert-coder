<template>
  <el-container>
    <el-main>
      <code-editor />
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  name: "Home",
  components: {
    CodeEditor,
  },
};
</script>
