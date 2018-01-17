<template lang="html">
    <div class="belongs-setting">
        <Button type="primary" @click="addBelong" id="addButton">
            <Icon type="plus-round" shape="circle" size="large"></Icon>
            添加所属
        </Button>
        <Modal
            v-model="modal1"
            title="添加所属"
            @on-ok="submit"
            @on-cancel="cancel"
            >
            <Form :model="formItem" :label-width="80">
                <FormItem label="所属">
                    <Input v-model="formItem.belong" placeholder="请输入所属"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>

</template>

<script>
export default {
    data () {
           return {
               modal1: false,
               formItem:{
                   belong:'',

               }
           }
       },
    methods:{
        addBelong:function(){
            this.modal1 = true;
        },
        submit:function(){
            var that = this;
            $.ajax({
                url:"http://localhost:3000/types/add",
                data:{data:this.formItem.belong},
                type:'POST',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success(result.message);
                    }else{
                        that.$Message.error(result.message);
                    }

                },
                error:function(xhr,textStatus){
                    console.log('错误');

                }
            })
        },
        cancel:function(){

        }

    }
}
</script>

<style lang="css">
#addButton {
    margin-top: 20px;
    float: left;
    margin-left: 20px;
}
</style>
