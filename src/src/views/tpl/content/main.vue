<style scoped>
   
  .layout-content{
        min-height: 200px;
        margin: 10px;
        overflow: hidden;
        background: #e1ddd9;
        border-radius: 2px;
        padding-bottom:100px;
    }
    
</style>
<template>
    <div>
            <baidubar></baidubar>
            <div class="layout-content">
                <Row>
                    <tagbar ref="childtag" @change="changeContent" @count="countTags"></tagbar>
                    <contentbox  @refresh="refreshTagbar" :content-id="tempid" :tag-count="tagcount"></contentbox>
                    <profilebar></profilebar>
                </Row>
            </div>
    </div>
</template>
<script>
    import baidubar from './main/baidubar.vue'
    import tagbar from './main/tagbar.vue'
    import contentbox from './main/contentbox.vue'
    import profilebar from './main/profilebar.vue'
    export default {  
        name: 'vmain',
        data() {
            return {
                tempid:-5,
                tagcount:0
            }
        },
        components : {
            baidubar, tagbar, contentbox, profilebar
        },
        methods: {
            changeContent:function(id){
                this.tempid = id
            },
            countTags: function(num) {
                this.tagcount = num
                if( num == 0 ) {
                    this.tempid = 0
                }
            },
            refreshTagbar: function(){
                this.$refs.childtag.get()
            }
        }
    }
</script>
