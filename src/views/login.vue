<style scoped>
    #app {
        width:100%;
        height:100%;
		
    }
</style>
<template>
   <div id="app">
        <vheader></vheader>
        <login_page></login_page>
   </div>
</template>
<script>
    import vheader from './tpl/header.vue'
    import login_page from './tpl/login_page.vue'
    export default {
        components :{
            vheader, login_page
        }
    }
</script>
