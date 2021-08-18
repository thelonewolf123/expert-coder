<template>
  <div>
    <el-button @click="executeScript" v-if="isPythonLoaded">
      Run
    </el-button>
    <el-button type="primary" :loading="!isPythonLoaded" v-else>
      Loading
    </el-button>
  </div>
</template>

<script>
import { runCode, setEngine, setOptions } from "client-side-python-runner";

export default {
  props: ["code", "isWaitingForInput", "inputData"],
  data() {
    return {
      pyodide: null,
      isPythonLoaded: false,
    };
  },
  mounted() {
    let self = this;
    setOptions({
      output: self.updateOutput, // Output from print(...)-functions
      error: null, // Throws an exception unless this is set to a function
      input: prompt, // How to feed the input(...)-function
      pythonVersion: 3, // Preferred version
      loadVariablesBeforeRun: true,
      storeVariablesAfterRun: true,
      onLoading: () => {
        self.isPythonLoaded = false;
      },
      onLoaded: () => {
        self.isPythonLoaded = true;
      },
    });
    setEngine("skulpt");
  },
  methods: {
    executeScript() {
      runCode(this.code);
    },
    updateOutput(output) {
      this.$emit("result", output);
    },
    async getInput(text) {
      this.$emit("inputPrompt:update", text);
      this.isWaitingForInput = true;
      await this.waitUntil(this.waitingForInput);
      return this.inputData;
    },
    waitingForInput() {
      return this.isWaitingForInput;
    },
    async waitUntil(condition) {
      return new Promise((resolve) => {
        let interval = setInterval(() => {
          if (!condition()) {
            return;
          }

          clearInterval(interval);
          resolve();
        }, 100);
      });
    },
  },
};
</script>
