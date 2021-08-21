<template>
  <div :id="editorId" style="width: 100%; height: 500px"></div>
</template>

<script>
export default {
  props: ["editorId", "content", "lang", "theme"],
  data() {
    return {
      editor: Object,
      beforeContent: "",
    };
  },
  watch: {
    content(value) {
      if (this.beforeContent !== value) {
        this.editor.setValue(value, 1);
      }
    },
  },
  mounted() {
    const lang = this.lang || "python";
    const theme = this.theme || "monokai";

    this.editor = window.ace.edit(this.editorId);
    this.editor.setValue(this.content, 1);

    // mode-xxx.js or theme-xxx.jsがある場合のみ有効
    this.editor.getSession().setMode(`ace/mode/${lang}`);
    this.editor.setTheme(`ace/theme/${theme}`);

    this.editor.on("change", () => {
      this.beforeContent = this.editor.getValue();
      this.$emit("change-content", this.editor.getValue());
    });
  },
};
</script>