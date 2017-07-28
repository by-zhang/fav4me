<style scoped>
   

   .contents { 
       background:#e1ddd9;
   }

   
   .wrapper {
       min-height:100%;
       margin-bottom:-20px;
   }
   
</style>
<template>
    <div class="contents">
        <div class="wrapper">
		<Alert banner show-icon closable>
            欢迎来到fav4me 这是一个可以收藏链接的网站。请正常使用，异常行为将会被永久封禁。
        </Alert>
            <login_form></login_form>
        </div>
    </div>
</template>
<script>
    import login_form from './login_page/login_form.vue'
    import vfooter from './footer.vue'
    export default {  
        name: 'login_page',
        components:{
           login_form,
           vfooter
        }
    }
</script>
