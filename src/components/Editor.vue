<template>
  <div>
    <h1>{{ title }}</h1>
    <VueAceEditor editor-id="editor" :content="code" v-on:change-content="codeUpdated"></VueAceEditor>
  </div>
</template>

<script>
import VueAceEditor from "./VueAceEditor.vue";

export default {
  props: ["title"],
  components: {
    VueAceEditor,
  },
  data: () => ({
    code: 'print("hello, world")',
    lineNumbers: true,
  }),
  mounted() {
    this.$emit("update:code", this.code);
  },
  methods: {
    codeUpdated: function (code) {
      this.code = code;
      this.$emit("update:code", this.code);
    }
  },
};
</script>

<style scoped>

</style>
