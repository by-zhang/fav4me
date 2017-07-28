<style scoped>
    
</style>
<template>
    <router-view></router-view>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        beforeCreate(){
             this.$request('POST', '/api/api1/account/check', null, function(res){
                 
             })
        },
        beforeDestroy () {

        },
        methods: {
            initAxios() {
            }
        }
    }
</script>
