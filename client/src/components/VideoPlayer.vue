<template>
  <div class="container">
    <div class="margin-10"></div>
    <!-- <div class="row">
      <div class="col-md-6"> -->

    <video-player
      class="video-player-box d-flex justify-content-center"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @ready="playerReadied"
    >
    </video-player>
      <!-- </div>
      <div class="col-md-6">
        <video-list/>
      </div>
    </div> -->
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
// import VideoList from '../components/VideoList.vue';

export default {
  components: {
    videoPlayer,
    // VideoList,
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [],
        width: "900",
      },
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
          type: "video/mp4",
          src: video.url,
        });
      });
  },
  methods: {
    playerReadied(player) {
      console.log("the player is readied", player);
    },
  },
};
</script>

<style>
.margin-10 {
  margin-top: 50px;
}
</style>
