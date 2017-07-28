<style scoped>
    #app {
        width:100%;
        height:100%;
    }
</style>
<template>
   <div id="app">
        <vheader :logout-switch="true"></vheader>
        <vcontent></vcontent>
   </div>
</template>
<script>
    import vheader from './tpl/header.vue'
    import vcontent from './tpl/content.vue'
    export default {
        components :{
            vheader, vcontent
        }
    }
</script>
