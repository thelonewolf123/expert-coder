<template>
  <div class="home">
    <code-editor />
  </div>
</template>

<script>
// @ is an alias to /src
import CodeEditor from '@/components/CodeEditor.vue'

export default {
  name: 'Home',
  components: {
    CodeEditor
  }
}
</script>
