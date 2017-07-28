<style scoped>
   .wrapper {
      padding: 5px 0;
   }
</style>
<template>
    <Row>
        <div class="wrapper">
            <h4><Icon type="refresh"></Icon>&nbsp;更新链接</h4>
        </div>
        <div class="wrapper">
            <p>原链接：&nbsp;{{urlText()}}</p>
        </div>
        <div class="wrapper">
            <Input v-model="newUrl" placeholder="请输入一个新链接" style="width: 350px" @on-change="sendNewUrl"></Input>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'modifylink',
        data() {
            return {
                newUrl:''
            }
        },
        props: {
            oldUrl:{
                type: String,
                default: ''
            }
        },
        methods:{
            sendNewUrl:function() {
                var obj = this
                this.$emit('changeNewUrl', obj.newUrl)
            },
            urlText:function() {
                var str = this.oldUrl
                if(this.oldUrl.length > 40) {
                   str = this.oldUrl.substr(0, 40) + '...'
                }
                return str
            }
        }
        
    }
</script>
