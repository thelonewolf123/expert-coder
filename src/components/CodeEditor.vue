<template>
  <div>
    <splitpanes  class="default-theme" horizontal style="height: 600px">
      <pane class="grid-content" max-size="90" min-size="10" style="height: 560px">
        <editor :title="title" :code.sync="code" />
      </pane>
      <pane class="grid-content output" max-size="90" min-size="0" size="20">
        <interpreter :code="code" />
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

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

<style scoped>
.output {
  overflow-y: auto;
}
</style>