<template lang="html">
    <div class="types-setting">
        <Button type="primary" @click="addType" id="addButton">
            <Icon type="plus-round" shape="circle" size="large"></Icon>
            添加类型
        </Button>
        <div class="types-list">
            <Tag type="dot" v-for="type in types" closable :name="type.data" @on-close="deleteType" :color="type.color" :key="type.id">{{type.data}}</Tag>
        </div>
        <Modal
            v-model="modal1"
            title="添加类型"
            @on-ok="submit"
            @on-cancel="cancel"
            >
            <Form :model="formItem" :label-width="80">
                <FormItem label="类型">
                    <Input v-model="formItem.type" placeholder="请输入类型"></Input>
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
                   type:'',
               },
               types:[

               ],
               colors:["blue","green","red","yellow"]
           }
       },
    methods:{
        addType:function(){
            this.modal1 = true;
        },
        submit:function(){
            var that = this;
            $.ajax({
                url:"http://localhost:3000/types/add",
                data:{data:this.formItem.type},
                type:'POST',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success(result.message);
                        that.types.push({data:that.formItem.type,color:that.colors[Math.floor(Math.random()*4)]});
                    }else{
                        that.$Message.error(result.message);
                    }

                },
                error:function(xhr,textStatus){
                    that.$Message.error("连接服务器失败");

                }
            })
        },
        cancel:function(){
        },
        deleteType:function(event,name){
            console.log(name);
            var that = this;
            $.ajax({
                url:"http://localhost:3000/types/delete",
                type:'POST',
                data:{data:name},
                dataType:'json',
                success:function(result){
                    console.log(result);
                    if(result.status === "success"){
                        that.$Message.success("删除成功");
                        //console.log(that.types);
                        for(var i = 0;i<that.types.length;i++){
                            if(that.types[i].data === name){
                                that.types.splice(i,1);
                            }
                        }
                    }
                },
                error:function(xhr,textStatus){
                    that.$Message.error("连接服务器失败");
                }
            })
        }
    },
    created:function() {
        var that = this;
        $.ajax({
            url:"http://localhost:3000/types/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                var finall_data = [];
                for(var i = 0;i<result.length;i++){
                    finall_data.push({data:result[i],color:that.colors[Math.floor(Math.random()*4)]})
                }
                //console.log(result);
                that.types = finall_data;
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        });
    }


}
</script>

<style lang="css">
.types-setting {
    text-align: left;
}
#addButton {
    margin-top: 20px;
    margin-left: -70px;

}
.types-list {
    margin-top: 20px;
    padding: 0 20px;
}
</style>
