<style scoped>
    #profile-area {
        border-radius:2px;
        background:white;
		color:#766b7b;
		box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
        border-radius:2px;
    }
    
	#band {
	    padding:5px 0 3px 10px;
	}
    .seperator {
        padding:3px 0 3px 0;
        border-bottom:1px solid rgba(118,107,123, 0.3);
    }
	
	.news-area {
		padding:1px 0 1px 2px;
	}
	
	ul {
	    list-style-type:square;
		padding-left:8px;
	}
	
	
	ul.news {
	    margin: 0 auto;
        width: 85%;
		list-style-type:none;
	}
	
	.item {
	    padding: 5px 0;
	}
	
</style>
<template>
    <i-col span="5">
        <div id="profile-area">
                    <div id="band">
                    <Row><Icon type="clipboard" size="19"></Icon>&nbsp;<b>公告栏</b></Row>
					</div>
				    <div class="seperator"></div>
					<ul class="news">
	                    <li v-for="( item, index) in newslist" class="item">
    	                    <a><b>{{item['date']}}</b></a> | 
    	                    <a @click="msg(index)">{{item['title']}}</a> 
                        </li>
                    </ul>
				
        </div>
    </i-col>
</template>
<script>
    export default {  
        name: 'profilebar',
		data() {
		    return {
			    newslist:this.getList()
			}
		},
		methods: {
		    msg: function(index) {
			    var obj = this
			    this.$Notice.open({
                    title: obj.newslist[index]['title'],
                    desc: obj.newslist[index]['content'],
                    duration: 0
                });
			},
			getList: function() {
			    var obj = this
			    this.$request('POST', '/api/api1/msg/list', null, function(res){
				    obj.newslist = res.data.result.list
				})
			}
		}
    }
</script>
