<style scoped> 
   .layout-content-main{
        padding: 3px;
        background-color: #e1ddd9;
    }
    
    @media only screen and (min-width:1420px){
       .layout-content-main{
            padding: 3px 3px 3px 3px;
            background-color: #e1ddd9;
       }
    }
    
    .cell {
        box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
        background-color:#8c9ed5;
        margin:3px;
        height:31px;
        border-radius:3px;
        font-size:15px;
        line-height:15px;
        padding:8px;
        color:#766b7b;
    }
    .chevron-d{
        float:right;
    }
    #add-link {
       text-align:center;
       color:#2d8cf0;
       border-radius:2px;
       background-color:white;
       font-size:14px;
    }
  
    a {
        color:#766b7b;
    }
    
    #add-link > a {
        color:#2d8cf0;
    }
    
    a:hover {
        color:#2d8cf0;
    }
    #spin-area {
        width: auto;
        text-align:center;
        position:relative;
    }
	#more {
	    padding-top:8px;
	    width:100%;
		text-align:center;
	}
	.cell-area{
	    display:block;
		width:130px;
	}
</style>
<template>
    <i-col span="15" :lg="15">
        <div v-if="spinSwitch==true" id="spin-area" class="layout-content-main">
            <img src="http://ongl9o14a.bkt.clouddn.com/fav/img/loading6.gif"></img>
        </div>
        <div v-else-if="contentId!=-5">
        <div v-if="contentId == 0" class="layout-content-main">
            <addtag @refresh="refreshParent" :tag-count="tagCount"></addtag>
        </div> 
        <div v-else class="layout-content-main">
            <Row :gutter="16" v-for="(line, index) in list" v-bind:key="index">
                <Col v-for="(item, idx) in line" span="6">
                    <div v-if="item['type'] == 0" >
                        <div class="cell" id="add-link">
                        <a @click="addLink">
                        <Icon type="plus-round"></Icon>
                            添加链接
                        </a>
                        </div>
                    </div>
                    <div v-else>
                        <div class="cell">
                            <Poptip v-if="(idx % 4 == 0) || ((idx-1) % 4 ==0)" trigger="hover" title="提示标题" v-bind:content="item['url']" placement="bottom-start">
                                <a class="cell-area" v-bind:href="item['url']"><Icon v-if="item['type']==2" type="ios-star-outline"></Icon>{{item['name']}}</a>
                            </Poptip>
                            <Poptip v-else trigger="hover" title="提示标题" v-bind:content="item['url']" placement="bottom-end">
                                <a class="cell-area" v-bind:href="item['url']"><Icon v-if="item['type']==2" type="ios-star-outline"></Icon>{{item['name']}}</a>
                            </Poptip>
                            <span class="chevron-d">
                                <Dropdown @on-click="dellink">
                                <a href="javascript:void(0)">
                                     <Icon type="chevron-down"></Icon>
                                </a>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item v-bind:name="index + ',' + idx + ',del'">删除链接</Dropdown-item>
                                    <Dropdown-item v-bind:name="index + ',' + idx + ',update'">更新链接</Dropdown-item>
                                    <Dropdown-item v-if="item['type'] == 2" v-bind:name="index + ',' + idx + ',top'">取消置顶</Dropdown-item>
                                    <Dropdown-item v-else v-bind:name="index + ',' + idx + ',top'">置顶</Dropdown-item>
                                </Dropdown-menu>
                                </Dropdown>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
			<Row v-if="addMoreSwitch">
			    <div id="more">
				     <Button type="dashed" @click="appendContent"><Icon type="ios-loop"></Icon>&nbsp;加载更多</Button>
				</div>
			</Row>
        </div>
        </div>
        </div>
    </i-col>
</template>
<script>
    import addtag from './contentbox/addtag.vue'
    import addlink from './contentbox/addlink.vue'
    import modifylink from './contentbox/modifylink.vue'
    export default {  
        name: 'contentbox',
        props: {
            contentId:{
                type: Number,
                default: 0
            },
            tagCount:{
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                list:[],
                spinSwitch:false,
                titleValue:'',
                urlValue:'',
                newUrl:'',
				addMoreSwitch:false,
				currentPage:{}
            }
        },
        watch:{
            contentId:"fetchContent"
        },
        methods: {
            fetchContent:function(){
                var obj = this
				var total = 0
				var page = 1
                if(this.contentId == 0) {
                   return
                }
				obj.spinSwitch = true
                var params = 'tagId=' + this.contentId + '&page=' + 1
                this.$request("POST", "/api/api1/archive/link", params, function(res){
                    obj.spinSwitch = false
                    obj.list = []
                    obj.list = res.data.result.list
					total += (obj.list.length-1)*4 + obj.list[obj.list.length-1].length
					if(total < res.data.result.count) {
					    obj.addMoreSwitch = true
					} else {
					    obj.addMoreSwitch = false
					}
                })
            },
			appendContent: function() {
			    console.log(this.currentPage[this.contentId])
			    if ( typeof(this.currentPage[this.contentId]) == 'undefined') {
				    this.currentPage[this.contentId] = 1
				}
			    const msg = this.$Message.loading({
                            content: '正在加载数据..',
                            duration: 0
                        })
			    var total = this.currentPage[this.contentId] * 36
				var params = 'tagId=' + this.contentId + '&page=' + (++this.currentPage[this.contentId])
				var obj = this
				this.$request("POST", "/api/api1/archive/link", params, function(res){
				    setTimeout(msg, 0)
					if(res.data.result.list.length == 0) {
					     return false
					}
				    for(var i in res.data.result.list) {
					    obj.list.push(res.data.result.list[i])
					}
					total += (res.data.result.list.length-1)*4 + res.data.result.list[res.data.result.list.length-1].length
					console.log(total)
					if(total < res.data.result.count) {
					    obj.addMoreSwitch = true
					} else {
					    obj.addMoreSwitch = false
						obj.currentPage[obj.contentId] = 1
					}
					
				})
			},
            refreshParent:function() {
                this.$emit("refresh")
            },
            addLink:function() {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'保存',
                    render: (h) => {
                            return h(addlink, {
                                props: {
                                    tagId:this.contentId
                                },
                                on: {
                                    title: (title) => {
                                        this.titleValue = title
                                        console.log(this.titleValue)
                                    },
                                    url: (url) => {
                                        this.urlValue = url
                                        console.log(this.urlValue)
                                    }
                                }
                            })
                    },
                    onOk: () => {
                        if (this.titleValue == '' || this.urlValue == '') {
                            this.$Message.error('信息填写不完整!')
                            return
                        }
                        const msg = this.$Message.loading({
                            content: '正在保存..',
                            duration: 0
                        })
                        this.saveLink(msg)
                    }                        
                })
            },
            saveLink:function(msg){
                var params = "linkInfo=" + JSON.stringify(
                {
                title:this.titleValue.trim(),
                url:this.urlValue.trim(),
                tagId:this.contentId
                }
                )
                var obj = this
                this.$request("POST","/api/api1/archive/linkadd",params,function(res){
                    setTimeout(msg, 0)
                    if(res.data.code == 200) {
                        obj.$Message.success('保存成功!')
                        obj.fetchContent()
                    } else {
                        console.log(res)
                        obj.$Message.error(res.data.msg)
                    }
                })
            },
            dellink:function(name) {
                var arr = name.split(',')
                var params = 'linkId=' + this.list[arr[0]][arr[1]]['link_id']
                var url = "/api/api1/archive/link" + arr[2]
                if(arr[2] == 'update') {
                    this.modifylink(params, url, this.list[arr[0]][arr[1]]['url'])
                    return                    
                }
                var obj = this
                this.$request("POST", url, params, function(res){
                    if (res.data.code == 200) {
                        obj.fetchContent()
                    } else {
                        obj.$Message.error(res.data.msg)
                    }
                })
            },
            modifylink:function(params, url, oldLink) {
                this.$Modal.confirm({
                    scrollable:true,
                    okText:'保存',
                    render: (h) => {
                            return h(modifylink, {
                                props: {
                                    oldUrl:oldLink
                                },
                                on: {
                                   changeNewUrl:(newUrl) => {
                                        this.newUrl = newUrl.trim()
                                    }
                                }
                            })
                    },
                    onOk: () => {
                         if (this.newUrl == '') {
                            this.$Message.error('信息填写不完整!')
                            return
                         } 
                         const msg = this.$Message.loading({
                            content: '正在保存..',
                            duration: 0
                         })
                         this.changeLink(params, url, msg)
                    }                        
                })
            },
            changeLink:function(params, url, msg) {
                params += '&newUrl=' + this.newUrl
                var obj = this
                this.$request("POST",url,params,function(res){
                    setTimeout(msg, 0)
                    if(res.data.code == 200) {
                        obj.$Message.success('保存成功!')
                        obj.fetchContent()
                    } else {
                        console.log(res)
                        obj.$Message.error(res.data.msg)
                    }
                })
            }
        },
        components: {
            addtag, addlink, modifylink
        }
    }
</script>
