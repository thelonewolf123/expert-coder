<template>
  <div>
    <code-editor />
  </div>
</template>

<script>
import CodeEditor from "./components/CodeEditor.vue";

export default {
  name: "app",
  components: {
    CodeEditor,
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
