<style scoped>
   #login-form {
        margin: 0 auto;
        width:350px;
        margin-top:7%;
    }

   .contents { 
       background:#e1ddd9;
   }

   
   .wrapper {
       min-height:100%;
       margin-bottom:-20px;
   }
   
   .floor {
       padding-top:30px;
	   width:350px;
	   margin: 0 auto;
   }
   

</style>
<template>
    <div class="contents">
   
                <Card>
		            <div class="floor">
		                <Input v-model="pass1" placeholder="请输入六位以上数字、字母复合密码" type="password" style="width:230px"></Input>
                    </div>		
		            <div class="floor">
                        <Input v-model="pass2" placeholder="请重复输入密码" type="password" style="width:230px"></Input>
		            </div>
		            <div class="floor">
		                <Button @click="sendReset" type="success"  style="width:230px">提交</Button> 
		            </div>
		        </Card>
		    
	
    </div>
</template>
<script>
    import vfooter from './footer.vue'
    export default {  
        name: 'reset_page',
        components:{
           vfooter
        },
		data(){
		    return {
			    email:this.$route.query.email,
				token:this.$route.query.token,
				pass2:'',
				pass1:''
			}
		},
		methods: {
		    sendReset:function(){
			     if(this.pass1 == '' || this.pass2 == '') {
				     this.$Message.error('请输入完整信息')
					 return
				 }
			     if(this.pass2 != this.pass1) {
				     this.$Message.error('两次密码输入不一致')
					 return
				 }
				 var params = "email=" + this.email + "&token=" + this.token + "&password=" + this.pass1
				 var router = this.$router
				 var _this = this
				 this.$request("POST", "/api/api1/account/check_finder", params, function(res){
				        if(res.data.code == "200") {
						    _this.$Message.success('密码重置成功')
					        router.push({path:'/'})    
					    } else {
						    _this.$Message.error(res.data.msg)
						}
				 })
			}
		}
    }
</script>
