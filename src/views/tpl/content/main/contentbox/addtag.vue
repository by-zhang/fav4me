<style scoped>

</style>
<template>
    <Row>
        <Form ref="formDynamic" :model="formDynamic" :label-width="80">
        <Form-item
            v-for="(item, index) in formDynamic.items"
            :key="item"
            :label="'新标签' + (index + 1)"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '标签' + (index + 1) +'不能为空', trigger: 'blur'}">
            <Row>
                <Col span="12">
                    <Input type="text" v-model="item.value" placeholder="请输入标签名称,用于将您的链接分类。"></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button type="text" @click="handleRemove(index)">删除</Button>
                </Col>
            </Row>
        </Form-item>
        <Form-item>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">再添加一个新标签</Button>
                </Col>
            </Row>
        </Form-item>
        <Form-item>
            <Button type="success" @click="handleSubmit('formDynamic')">保存</Button>
        </Form-item>
    </Form>   
    </Row>
</template>
<script>
    export default {  
        name: 'addtag',
        data() {
            return {
                formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                }
            }
        },
        props: {
            tagCount:{
                type: Number,
                default: 0
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var params = 'items=' + JSON.stringify(this.formDynamic.items)
                        const msg = this.$Message.loading({
                            content: '正在保存..',
                            duration: 0
                        })
                        var obj = this
                        this.$request("POST", "/api/api1/archive/tagadd", params, function(res){
                            setTimeout(msg, 0)
                            if(res.data.code == 200) {
                                obj.$emit("refresh")
                                obj.$Message.success('保存成功!')
                            } else {
                                console.log(res)
                                obj.$Message.error(res.data.msg)
                            }
                        })
                    }
                })
            },
            handleAdd () {
                if( this.formDynamic.items.length + this.tagCount <= 5 ){
                    this.formDynamic.items.push({
                        value: ''
                    });
                } else {
                    this.$Message.error('标签数量达到上限，不能再添加了！')
                }
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
            }
        }
        
    }
</script>
