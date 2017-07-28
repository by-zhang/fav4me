<style scoped>
    #app {
        width:100%;
        height:100%;
    }
</style>
<template>
   <div id="app">
        <vheader></vheader>
        <reset_page></reset_page>
   </div>
</template>
<script>
    import vheader from './tpl/header.vue'
    import reset_page from './tpl/reset_page.vue'
    export default {
        components :{
            vheader, reset_page
        }
    }
</script>
