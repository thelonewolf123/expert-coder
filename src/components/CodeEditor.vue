<template>
  <div>
    <splitpanes class="default-theme" horizontal style="height: 600px">
      <pane
        class="grid-content"
        max-size="100"
        min-size="0">
        <div  style="height: 480px">
          <editor :title="title" :code.sync="code" />
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
    this.title = "Introduction to python";
  },
};
</script>

<style>
.splitpanes.default-theme .splitpanes__pane {
  background-color: #fff;
}
</style>