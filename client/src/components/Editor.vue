<template>
  <div>
    <div class="wrapper">
      <h1>{{ title }}</h1>
      <div class="share-code">
        <record-control @recordEvent="recordEvent" />
        <div v-if="shareCodeVisible">
          <el-button type="primary" @click="changeTitle">
            Change Title
          </el-button>
          <el-button type="success" @click="shareCode"> Share </el-button>
        </div>
      </div>
    </div>
    <vue-ace-editor
      editor-id="editor"
      :content="code"
      v-on:change-content="codeUpdated"
    ></vue-ace-editor>
    <el-dialog
      title="Tips"
      :show-close-icon="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input placeholder="Title" v-model="titleInput"> </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDone">Done</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueAceEditor from "./VueAceEditor.vue";
import RecordControl from "./RecordControl.vue";

export default {
  props: ["title"],
  components: {
    VueAceEditor,
    RecordControl,
  },
  data: () => ({
    code: 'print("hello, world")',
    lineNumbers: true,
    dialogVisible: false,
    titleInput: null,
    shareCodeVisible: true,
    codeTimeFrame: null,
    startingTime: null,
    timer: null,
  }),
  mounted() {
    this.$emit("update:code", this.code);
    // this.titleInput = this.title;
  },
  methods: {
    codeUpdated: function (code) {
      this.code = code;
      this.$emit("update:code", this.code);
    },
    changeTitle() {
      this.titleInput = this.title;
      this.dialogVisible = true;
    },
    handleDone() {
      this.$emit("update:title", this.titleInput);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    recordEvent({ state, data }) {
      this.shareCodeVisible = state;

      if (state) {
        let formData = new FormData();
        formData.append("fname", this.title);
        formData.append("data", data);
        let res = await fetch("api/file", {
          method: "POST",
          body: formData,
        });
        let json = await res.json();
        let result = await fetch("/api/video", {
          method: "POST",
          body: JSON.stringify({
            title: this.title,
            code: this.codeTimeFrame,
            fileId: json.id,
          }),
        });
        this.$notify({
          type: "success",
          title: "Video",
          message: "Video saved on the server",
        });
        clearInterval(this.timer);
      } else {
        this.codeTimeFrame = [];
        this.startingTime = new Date().getUTCSeconds();
        this.timer = setInterval(() => {
          let diff = new Date().getUTCSeconds() - this.startingTime;
          this.codeTimeFrame.push({
            time: diff,
            code: this.code,
          });
        }, 1000);
      }
    },
    async shareCode() {
      const result = await fetch("/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: this.title, code: this.code }),
      });
      let data = await result.json();
      if (data) {
        console.log(data);
      } else {
        return;
      }
      let self = this;
      const url = window.location.origin + "/code/" + data.id;
      navigator.clipboard.writeText(url).then(
        function () {
          self.$notify({
            type: "success",
            title: "Share Code",
            message: "Url Copied to clipboard",
          });
          self.$router.push({ path: "/code/" + data.id });
        },
        function () {
          self.$notify({
            type: "error",
            title: "Share Code",
            message: "Url Copy to clipboard failed",
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapper > h1 {
  flex: 1;
}
h1 {
  text-align: left;
}
.share-code {
  display: flex;
}
</style>
