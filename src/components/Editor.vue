<template>
  <div>
    <h1>{{ title }}</h1>
    <prism-editor
      class="code-editor height-300"
      v-model="code"
      :highlight="highlighter"
      :line-numbers="lineNumbers"
    ></prism-editor>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  props: ["title"],
  components: {
    PrismEditor,
  },
  data: () => ({
    code: 'print("hello, world")',
    lineNumbers: true,
  }),
  mounted() {
    this.$emit("update:code", this.code);
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
  },
  watch: {
    code() {
      this.$emit("update:code", this.code);
    },
  },
};
</script>

<style scoped>
.code-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.height-300 {
  height: 300px;
}
</style>
