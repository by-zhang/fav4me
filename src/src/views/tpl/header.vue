<style scoped>
   
   @media only screen and (min-width:1400px){
       .vheader {
           height:64px;
           background:#6c7cbb;
           border-bottom-left-radius:2px;
           border-bottom-right-radius:2px;
       }
    
       .right-navi-text {
           height:64px;
           line-height:24px;
           padding: 20px 0;
        }
   }
   
   @media only screen and (max-width:1400px) {
      
       .vheader {
           height:44px; 
           background:#6c7cbb;
           border-bottom-left-radius:2px;
           border-bottom-right-radius:2px;
        }
      
        .right-navi-text {
           height:44px;
           line-height:24px;
           padding: 10px 0;
        }
   }
   
    .right-navi-text {
           text-align:center;
           margin:0 2px;
           color:white;
           border-bottom:2px solid rgba(118,107,123, 0.9);
    }
   

   .right-navi-text:hover {
      border-bottom:2px solid white;
   }
   
   .with-badge {
   
   }
   
   #logo {
      color:black;
      height:100%;
      padding:5px;
   }
   
   #vertical-helper{
      height:100%;
      display:inline-block;
      vertical-align:middle;
   }
   
   img {
      vertical-align:middle;
   }
   
   a {
      color:white;
   }
</style>
<template>
   <Row class-name="vheader">
       <Col span="8" class-name="vheader">
           <div id="logo">
               <div id="vertical-helper"></div>
               <img src="http://ongl9o14a.bkt.clouddn.com/fav/img/logo6.gif">
           </div>
       </Col>
       <Col v-if="logoutSwitch" span="1" offset="15">
            <div @click="logout_confirm" class="right-navi-text"><a><Icon type="power" size="14"></Icon></a></div>
       </Col>
   </Row>
</template>
<script>
    export default {  
        name: 'vheader',
		props: {
		    logoutSwitch:false
		},
        methods:{
            logout_confirm(){
                this.$Modal.confirm({
                    title: '确定要离开fav4me吗',
                    content: '<p>您将无法继续收藏链接</p>',
                    loading: true,
                    scrollable: true,
                    onOk: () => {
					   var _this = this
                       this.$Modal.remove()
					   this.$request("POST", "/api/api1/account/logout", null, function(res){
					       _this.$router.push({'path':'/login'})
					   })
                    }
                })
            },
        }
    }
</script>
