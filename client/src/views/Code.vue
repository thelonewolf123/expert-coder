<template>
  <el-container>
    <el-main>
      <code-editor />
    </el-main>
  </el-container>
</template>

<script>
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  components: {
    CodeEditor,
  },
};
</script>