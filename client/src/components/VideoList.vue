<template>
  <div class="container">
    <div class="margin-10"></div>
    <ul class="list-group">
      <li
        v-for="video in videos"
        :key="video.id"
        @click="navigateToPlayer(video)"
      >
        <div class="list-group-item">
          {{ video.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    let self = this;
    fetch("/api/videos")
      .then((response) => response.json())
      .then((videos) => {
        self.videos = videos;
      });
  },
  methods: {
    navigateToPlayer(video) {
      this.$router.push({
        name: "VideoPlayer",
        params: {
          id: video.id,
        },
      });
    },
  },
};
</script>

<style>
.list-group-item {
  cursor: pointer;
}
ul {
  list-style: none;
}
.margin-10 {
    margin-top: 50px;
}
</style>