<template lang="html">
    <div class="belongs-setting">
        <Button type="primary" @click="addBelong" id="addButton">
            <Icon type="plus-round" shape="circle" size="large"></Icon>
            添加所属
        </Button>
        <div class="belongs-list">
            <Tag type="dot" v-for="belong in belongs" closable :name="belong.data" @on-close="deleteBelong" :color="belong.color" :key="belong.id">{{belong.data}}</Tag>
        </div>
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
               },
               belongs:[
                   {data:"nihao"},
                   {data:"joijoi"},
                   {data:"你好"}
               ],
               colors:["blue","green","red","yellow"]
           }
       },
    methods:{
        addBelong:function(){
            this.modal1 = true;
        },
        submit:function(){
            var that = this;
            $.ajax({
                url:"http://localhost:3000/belongs/add",
                data:{data:this.formItem.belong},
                type:'POST',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success(result.message);
                        that.belongs.push({data:that.formItem.belong,color:that.colors[Math.floor(Math.random()*4)]});
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
        deleteBelong:function(event,name){
            console.log(name);
            var that = this;
            $.ajax({
                url:"http://localhost:3000/belongs/delete",
                type:'POST',
                data:{data:name},
                dataType:'json',
                success:function(result){
                    console.log(result);
                    if(result.status === "success"){
                        that.$Message.success("删除成功");
                        //console.log(that.belongs);
                        for(var i = 0;i<that.belongs.length;i++){
                            if(that.belongs[i].data === name){
                                that.belongs.splice(i,1);
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
            url:"http://localhost:3000/belongs/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                var finall_data = [];
                for(var i = 0;i<result.length;i++){
                    finall_data.push({data:result[i],color:that.colors[Math.floor(Math.random()*4)]})
                }
                //console.log(result);
                that.belongs = finall_data;
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        })
    }


}
</script>

<style lang="css">
.belongs-setting {
    text-align: left;
}
#addButton {
    margin-top: 20px;
    margin-left: -70px;

}
.belongs-list {
    margin-top: 20px;
    padding: 0 20px;
}
</style>
