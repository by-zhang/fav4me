<style scoped>
   .wrapper {
      padding: 5px 0;
   }
</style>
<template>
    <Row>
        <div class="wrapper">
            <h4><Icon type="heart"></Icon>&nbsp;收藏新链接</h4>
        </div>
        <div class="wrapper">
            <Input v-model="title" placeholder="请输入导航标题。例如:v2ex社区" style="width: 350px" @on-change="titleChange"></Input>
        </div>
        <div class="wrapper">
            <Input v-model="url" placeholder="请输入导航链接。例如:https://v2ex.com" style="width: 350px" @on-change="urlChange"></Input>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'addlink',
        data() {
            return {
                title:'',
                url:''
            }
        },
        props: {
            tagId:{
                type: Number,
                default: 0
            }
        },
        methods:{
            titleChange:function() {
                var obj = this
                this.$emit('title', obj.title)
            },
            urlChange:function() {
                var obj = this
                this.$emit('url', obj.url)
            }
        } 
        
    }
</script>
