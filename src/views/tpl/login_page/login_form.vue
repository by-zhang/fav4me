    <style scoped>
    #login-form {
        margin: 0 auto;
        width:350px;
        margin-top:7%;
    }
    #login-form-content {
        height:270px;
    }
    .main-content , .main-content2{
        padding-bottom: 5px;
        margin: 0 auto;
        text-align:center;
    }
    .main-content {
        padding-top: 17px;
    }
    .main-content2 {
        padding-top: 13px;
    }
    #main-content-forget {
        font-size:9px;
    }
   
</style>
<template>

    <div id="login-form">
        <Card>
            <div id="login-form-content">
                <Tabs>
                    <Tab-pane label="登录" icon="paper-airplane">
                  
                    <div class="main-content">
                    <Input v-model="lemail" placeholder="请输入邮箱" style="width:230px"></Input>
                    </div>
                    <div class="main-content">
                    <Input v-model="lpass" placeholder="请输入密码" type="password" style="width:230px"></Input> 
                    </div>   
                    <div class="main-content">
                    <Button @click="logintoserver" type="success"  style="width:230px">登录</Button> 
                    </div>
                    <div id="main-content-forget" class="main-content">
                    <a @click="find">忘记密码？</a>
                    </div>                      
                    </Tab-pane>
                    <Tab-pane label="注册" icon="person-add">
                    <div class="main-content2">
                    <Input v-model="remail" placeholder="请输入邮箱" style="width:230px"></Input>
                    </div>
                    <div class="main-content2">
                    <Input v-model="rpass1" placeholder="请输入六位以上数字、字母复合密码" type="password" style="width:230px"></Input> 
                    </div>   
                    <div class="main-content2">
                    <Input v-model="rpass2" placeholder="请重复输入密码" type="password" style="width:230px"></Input> 
                    </div>
                    <div class="main-content2">
                    <Button @click="registertoserver" type="success"  style="width:230px">注册</Button> 
                    </div>
                    </Tab-pane>
                </Tabs>
            </div> 
        </Card>
    </div>  

</template>
<script>
    export default {
        name: 'login_form',
		data() {
		    return {
			    lemail:'',
				lpass:'',
				remail:'',
				rpass1:'',
				rpass2:''
			}
		},
        methods : {
            logintoserver() {
			    if( this.lemail == '' || this.lpass == '' ) {
				    this.$Message.error('请将信息填写完整')
					return
				}
                const msg = this.$Message.loading({
                    content: '登录中..',
                    duration: 0
                })
				var params = 'email=' + this.lemail + '&password=' + this.lpass
                var router = this.$router
				var obj = this
                this.$request('POST', '/api/api1/account/login', params, function(res){
				    setTimeout(msg, 0)
                    console.log(res.data)
                    if( res.data.code == '200' ) {
                        router.push({ path: '/home'})
                    } else {
                        obj.$Message.error(res.data.msg)
                    }
                })
            },
            registertoserver() {
                if( this.remail == '' || this.rpass1 == '' || this.rpass2 == '') {
				    this.$Message.error('请将信息填写完整')
					return
				}
				if( this.rpass1 != this.rpass2 ) {
				    this.$Message.error('两次密码输入不一致')
					return
				}
				const msg = this.$Message.loading({
                    content: '注册中..',
                    duration: 0
                })
				var params = 'email=' + this.remail + '&password=' + this.rpass1
				var obj = this
				this.$request('POST', '/api/api1/account/register', params, function(res){
				    setTimeout(msg, 0)
                    if( res.data.code == '200' ) {
                        obj.$Message.success({
						    content:'注册成功!请尽快去注册邮箱完成验证',
							duration: 0,
							closable:true
						})
						obj.rpass1 = obj.rpass2 = obj.remail = ''
                    } else {
                        obj.$Message.error(res.data.msg)
						obj.rpass1 = obj.rpass2 = ''
                    }
                })
            },
			find() {
			    if(this.lemail == '') {
				    this.$Message.error('请填写需要找回的邮箱')
					return
				}
				var obj = this
				var params = 'email=' + this.lemail
				this.$request('POST', '/api/api1/account/send_finder', params, function(res){
				    if( res.data.code == '200' ) {
					    obj.$Message.success({
						    content:'找回邮件发送成功，请收信后点击链接重置密码！',
							duration: 0,
							closable:true
						})
					} else {
					    obj.$Message.error(res.data.msg)
					}
				})
			
			}
        },
        beforeCreate: function(){
             var router = this.$router
             this.$request('POST', '/api/api1/account/check', null, function(res){
                 if(res.data.code == '200') {
                     router.push({ path: '/home'})
                 }
             })
        },
    }
</script>
