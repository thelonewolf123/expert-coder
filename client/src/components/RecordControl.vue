<template>
  <div class="recorder">
    <el-button type="primary" v-if="!isRecording" @click="startRecord">
      Record
    </el-button>
    <el-button type="danger" v-else @click="stopRecord"> Stop </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      recorder: null,
      stream: null,
    };
  },
  methods: {
    async startRecord() {
      let videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });
      let audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.stream = new MediaStream([
        ...videoStream.getTracks(),
        ...audioStream.getTracks(),
      ]);
      this.recorder = new MediaRecorder(this.stream);

      const chunks = [];
      this.recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      this.recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        this.$emit("recordEvent", { state: false, blob: blob });
        // const videoURL = URL.createObjectURL(blob);
        // this.video = videoURL;
        this.isRecording = false;
      };
      this.recorder.start();
      this.isRecording = true;
    },
    stopRecord() {
      this.recorder.stop();
      this.stream.getTracks().forEach((track) => track.stop());
      this.isRecording = false;
      this.$emit("recordEvent", { state: false, blob: null });
    },
  },
};
</script>

<style>
.recorder {
  margin-right: 10px;
}
</style>