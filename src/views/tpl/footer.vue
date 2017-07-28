<style scoped>
    .footer {
       height: 20px;
       text-align:center;
       font-size: 8px;
       line-height:8px;
       padding: 6px 0px;
       font-family:arial;
       border-top: 1px solid rgba(118,107,123, 0.3);
    }
</style>
<template>
    <footer class="footer">Copyright © {{ year }} C.Design</footer>
</template>
<script>
    
    export default {  
        name: 'vfooter',
        computed: {
            year : function () {
                var date = new Date
                return date.getFullYear()
            }
        }
    }
</script>
