<style scoped>
   @media only screen and (min-width:1400px){
       .contents {
           height:99%; 
           background:#e1ddd9;
        }
   }
   
   @media only screen and (max-width:1400px){
       .contents {
           height:95%;    
           background:#e1ddd9;
        }
   }
   
   .wrapper {
       min-height:100%;
       margin-bottom:-20px;
   }
   
    .blank-area {
        height:20px;
    }

</style>
<template>
    <div class="contents">
        <div class="wrapper">
            <vmain></vmain>
            
            <div class="blank-area"></div>
        </div>
        <vfooter></vfooter>
    </div>
</template>
<script>
    import vmain from './content/main.vue'
    import vfooter from './footer.vue'
    export default {  
        name: 'vcontent',
        components:{
           vmain,
           vfooter
        }
    }
</script>
