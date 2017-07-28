<style scoped>
    #layout-content-baidu {
        height:80px;
        margin:25px 10px 10px 10px;
        border-radius: 2px;
    }
</style>
<template>
   <div id="layout-content-baidu">
        <form  action="http://www.baidu.com/baidu" target="_blank">
            <input name='tn' type='hidden' value="SE_zzsearchcode_shhzc78w">
            <Input v-model="value4" placeholder="百度一下.."  name="word" style="width: 450px;margin:0 auto;">
                 <Button slot="append" icon="ios-search" html-type="submit"></Button>
            </Input>
        </form>
   </div>
</template>
<script>
    export default {  
        name: 'baidubar',
		data() {
		    return {
			    value4:''
			}
		    
		},
        methods: {
    
        }
    }
</script>
