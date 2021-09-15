<template>
  <div class="container">
    <div class="margin-10"></div>

    <video-player
      v-bind:class="{
        'video-player-box': true,
        'd-flex': !showCode,
        'd-none': showCode,
        'justify-content-center': true,
      }"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      :autoplay="true"
      :controls="true"
      :start-time="startTime"
      @pause="pauseEvent($event)"
      @ready="playerReadied"
    >
    </video-player>
    <div v-if="showCode">
      <splitpanes class="default-theme" horizontal style="height: 600px">
        <pane class="grid-content" max-size="100" min-size="0">
          <div style="height: 480px">
            <editor
              :title.sync="title"
              :code.sync="code"
              :showControls="false"
            />
          </div>
        </pane>
        <pane class="grid-content" max-size="90" min-size="0" size="20">
          <interpreter :code="code" />
        </pane>
      </splitpanes>
    </div>
    <div class="mt-2 mb-4">
      <el-button @click="switchToCode" v-if="!showCode">
        Code
      </el-button>
      <el-button @click="switchToVideo" v-else> Video </el-button>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import Editor from "./Editor.vue";
import Interpreter from "./Interpreter.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  components: {
    videoPlayer,
    Editor,
    Interpreter,
    Splitpanes,
    Pane,
    // VideoList,
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        techOrder: ["html5"],
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width: 900,
        sources: [],
      },
      code: '',
      data: null,
      title: null,
      showCode: false,
      codeBlockStyling: {},
      videoBlockStyling: {},
      startTime: 0,
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  mounted() {
    let id = this.$route.params.id;
    let self = this;

    fetch(`/api/video/${id}`)
      .then((res) => res.json())
      .then((video) => {
        self.playerOptions.sources.push({
          type: "video/webm",
          src: video.url,
        });
        self.data = video;
        self.title = video.title;
      });
  },
  methods: {
    playerReadied(player) {
      console.log("the player is readied", player);
    },
    switchToCode() {
      console.log("switchToCodeOrVideo, showCode -> ", this.showCode);
      this.showCode = true;
    },
    switchToVideo() {
      console.log("switchToCodeOrVideo, showCode -> ", this.showCode);
      this.showCode = false;
    },
    pauseEvent(player) {
      console.log("pause event", player);
      let currentTime = player.currentTime();
      console.log("currentTime", currentTime);
      let currentTimeInt = parseInt(currentTime);
      console.log("currentTimeInt", currentTimeInt);
      this.startTime = currentTimeInt;
      let self = this;
      JSON.parse(this.data.code_json).forEach((item) => {
        if (item.time === currentTimeInt) {
          self.code = item.code;
          console.log("code", self.code);
        }
      });
    },
  },
};
</script>

<style>
.margin-10 {
  margin-top: 50px;
}
</style>
