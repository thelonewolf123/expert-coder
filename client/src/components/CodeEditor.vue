<template>
  <div>
    <splitpanes class="default-theme" horizontal style="height: 600px">
      <pane class="grid-content" max-size="100" min-size="0">
        <div style="height: 480px">
          <editor :title.sync="title" :code.sync="code" />
        </div>
      </pane>
      <pane class="grid-content" max-size="90" min-size="0" size="20">
        <interpreter :code="code" />
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  props: ["titleProps", "codeProps"],
  components: {
    Editor,
    Interpreter,
    Splitpanes,
    Pane,
  },
  data() {
    return {
      result: null,
      title: null,
      code: null,
    };
  },
  mounted() {
    this.$route.params.id && this.getCode(this.$route.params.id);
    this.title = "Introduction to python";
  },
  methods: {
    async getCode(id) {
      let result = await fetch(`/api/code/${id}`);
      let data = await result.json();
      console.log(data);
      this.title = data.title;
      this.code = data.code;
    },
  },
};
</script>

<style>
.splitpanes.default-theme .splitpanes__pane {
  background-color: #fff;
}
</style>