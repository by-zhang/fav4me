<style scoped>
   .vmenu {
       background:black;
   } 
   .item-modify{
       float:right;
       font-size:15px;
   }
   .toggle-div{
       box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
       border-radius:4px;
   }
</style>
<template>
    <i-col span="4">
        <div class="toggle-div">
        <Menu ref="lmenu" :active-name="getid()" width="auto" @on-select="changeContent">
            <Menu-item v-for="(vitem, index) in list" v-bind:key="vitem.id" v-bind:name="vitem.id + time" >
                <Icon type="pricetag"></Icon>
                
                     {{vitem.name}}
                
                <span class="item-modify">
                    <Dropdown trigger="custom" :visible="vitem.visible" @on-click="deltag">
					<a v-if="vitem.type==2"><Icon type="star"></Icon></a>
                    <a href="javascript:void(0)" v-on:click="handleOpen(index)" v-on:blur="handleClose(index)">
                        <Icon type="gear-a"></Icon>
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item  v-bind:name="vitem.id + ',del'">删除标签</Dropdown-item>
                        <Dropdown-item  v-if="vitem.type==2" v-bind:name="vitem.id + ',top'">取消置顶</Dropdown-item>
                        <Dropdown-item  v-else v-bind:name="vitem.id + ',top'">置顶</Dropdown-item>
                    </Dropdown-menu>
                    </Dropdown>
                </span>
            </Menu-item>
            <Menu-item v-if="addSwitch == true" v-bind:name="'0'+time"><Icon type="plus" ></Icon>添加标签</Menu-item>
        </Menu>
        </div>
    </i-col>
</template>
<script>
    export default {  
        name: 'tagbar',
        data() {
            return{
			    addSwitch:true,
                list: this.getList(),        
                time: Date.parse(new Date())
            }
        },
        methods: {
            get: function(){
			     this.time = Date.parse(new Date())
                 this.list = this.getList()
            },
			getList: function() { 
			     let _this = this
				 let tempList = []
			     this.$axios({
				     method:"POST",
					 url:"/api/api1/archive/tag",
				     headers:{'Content-Type': 'application/x-www-form-urlencoded'}
				 }).then(function(res){
                     if(res.data.code == '700003') {
                         this.$router.push({ path: '/login'})
                         return
                     }
                     for(var index in res.data.result) {
                        if(index == 0) {
                            _this.changeContent(res.data.result[index]['id'] + _this.time)
                        }
                        res.data.result[index]['visible'] = false
						tempList.push(res.data.result[index])
                     }
					 if(tempList.length >= 6) {
                        _this.addSwitch = false
                     }
                     _this.$emit("count", tempList.length)
                }).catch(function(err){
                    console.log(err)
                })
				console.log(tempList)
				console.log(this.time)
				return tempList 
			},
			updateA:function(){
			      let _this = this
			      this.$nextTick(function(){
                        _this.$refs.lmenu.updateActiveName()
                  })
			},
            getid: function() { 
                var ret =  (this.list.length == 0) ? ('0' + this.time):(this.list[0].id + this.time);
				console.log(ret)
				this.updateA()
				return ret
            },
            handleOpen: function(index) {
                this.list[index]['visible'] = true
            },
            handleClose: function(index) {
                this.list[index]['visible'] = false
            },
            changeContent: function(name) {
                this.$emit("change", parseInt(name.slice(0, -13)))
            },
            deltag: function(name){
                var arr = name.split(',')
                var params = 'tagId=' + arr[0]
                var url = "/api/api1/archive/tag" + arr[1]
                var obj = this
                if (arr[1] == 'del') {
                    this.$Modal.confirm({
                    title: '确定要删除这个标签吗',
                    content: '<p>该标签下收藏的链接将无法恢复</p>',
                    scrollable: true,
                    loading: true,
                    onOk: () => {
                        this.$request("POST", url, params, function(res){
                            if(res.data.code == 200) {
                                obj.get()
                            } else {
                                obj.$Message.error(res.data.msg)
                            }
                        })
                        this.$Modal.remove();
                    }
                    })
                } else {
                
                this.$request("POST", url, params, function(res){
                    if(res.data.code == 200) {
                        obj.get()
                    } else {
                        obj.$Message.error(res.data.msg)
                    }
                })
                }
            }
        }
        
    }
</script>
