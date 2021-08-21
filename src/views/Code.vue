<template>
    <el-container>
        <el-main>
            <code-editor :title="title" :code="code" />
        </el-main>
    </el-container>
</template>

<script>
import CodeEditor from '@/components/CodeEditor.vue';

export default {
    components: {
        CodeEditor
    },
    mounted(){
        this.$route.params.id && this.getCode(this.$route.params.id);
    },
    data(){
        return {
            code: null,
            title: null,
        }
    },
    methods: {
        async getCode(id){
           let result = await fetch(`/api/code?id=${id}`)
           let data = await result.json();
           console.log(data)
           this.title = data.title;
           this.code = data.code;
        },
    }
}
</script>