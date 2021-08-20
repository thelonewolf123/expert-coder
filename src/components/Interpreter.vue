<template>
  <div class="interpreter">
    <div class="grid-content">
      <el-select v-model="codeEngine" placeholder="Code Engine" @change="selectCodeEngine">
        <el-option
          v-for="item in codeEngineList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button type="danger" @click="clearOutput" class="margin-10 "> Clear </el-button>
      <el-button
        @click="executeScript"
        v-if="isPythonLoaded"
        type="success"
        icon="el-icon-caret-right"
      >
        Run
      </el-button>
      <el-button type="primary" :loading="!isPythonLoaded" v-else>
        Loading
      </el-button>
    </div>
    <el-row class="output">
      <div v-for="res in output" :key="res.id">
        <div v-if="res.result">
          {{ res.result }}
        </div>
        <div v-else class="error">
          {{ res.error.error }}
        </div>
      </div>
    </el-row>
    <!-- <div class="input-area">
      <el-input v-model="inputData" :placeholder="inputPrompt" class="input-box">
        <el-button icon="el-icon-caret-right" class="button" slot="append" @click="updateInput">
        </el-button>
      </el-input>
    </div> -->
  </div>
</template>

<script>
import { runCode, setEngine, setOptions } from "client-side-python-runner";
import { v4 } from "uuid";

export default {
  props: ["code"],
  data() {
    return {
      isPythonLoaded: true,
      output: [],
      inputData: null,
      inputPrompt: null,
      codeEngine: "skulpt",
      codeEngineList: ["skulpt", "pyodide", "brython"],
    };
  },
  mounted() {
    let self = this;
    setOptions({
      output: self.updateOutput, // Output from print(...)-functions
      error: self.updateError, // Throws an exception unless this is set to a function
      input: window.prompt, // How to feed the input(...)-function
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
      this.output = [];
      runCode(this.code);
    },
    updateOutput(output) {
      this.output.push({ result: output, id: v4() });
    },
    updateError(error) {
      this.output.push({ error: error, id: v4() });
    },
    clearOutput() {
      this.output = [];
    },
    selectCodeEngine(){
      setEngine(this.codeEngine);
    }
    // async getInput(text) {
    //   this.inputPrompt = text;
    //   this.isWaitingForInput = true;
    //   await this.waitUntil(this.waitingForInput);
    //   let data = this.inputData
    //   this.inputData = ""
    //   return data;
    // },
    // updateInput() {
    //   this.isWaitingForInput = false;
    // },
    // waitingForInput() {
    //   return this.isWaitingForInput;
    // },
    // async waitUntil(condition) {
    //   return new Promise((resolve) => {
    //     let interval = setInterval(() => {
    //       if (!condition()) {
    //         return;
    //       }

    //       clearInterval(interval);
    //       resolve();
    //     }, 100);
    //   });
    // },
  },
};
</script>

<style scoped>
.interpreter {
  overflow-y: auto;
  padding: 5px;
  height: 100%;
  background-color: #fafafa;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}

.output {
  padding-top: 10px;
  margin: 5px;
}

.margin-10 {
  margin-left: 10px;
}

.error {
  color: red;
}
</style>
