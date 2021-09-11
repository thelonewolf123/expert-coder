<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item index="/">Home</el-menu-item>
    <!-- <el-submenu index="2">
      <template slot="title">Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-submenu> -->
    <!-- <el-menu-item index="/courses">Courses</el-menu-item> -->
    <el-menu-item index="/videos">Videos</el-menu-item>
    <el-menu-item index="/about">About</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activePath: "/",
    };
  },
  mounted() {
    console.log("NavBar mounted");
    this.activePath = window.location.pathname;
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ path: key });
    },
  },
};
</script>
