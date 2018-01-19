<template lang="html">
    <div class="wishs">
        <h1>心愿单</h1>
        <div class="tip">
            <Alert show-icon>
                这里是你的心愿单
                <Icon type="heart" slot="icon"></Icon>
                <template slot="desc">把想读的书放在这里，随时看看，有钱的时候就买下它吧。</template>
            </Alert>
        </div>

        <Button type="primary" @click="addBelong" id="addButton">
            <Icon type="plus-round" shape="circle" size="large"></Icon>
            添加心愿
        </Button>
        <div class="wishs-list">
            <Tag type="dot" v-for="wish in wishs" closable :name="wish.data" @on-close="deleteBelong" :color="wish.color" :key="wish.id">{{wish.data}}</Tag>
        </div>
        <Modal
            v-model="modal1"
            title="添加心愿"
            @on-ok="submit"
            @on-cancel="cancel"
            >
            <Form :model="formItem" :label-width="80">
                <FormItem label="心愿">
                    <Input v-model="formItem.wish" placeholder="请输入心愿"></Input>
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
                   wish:'',
               },
               wishs:[

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
                url:"http://"+server+"/wishs/add",
                data:{data:this.formItem.wish},
                type:'POST',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success(result.message);
                        that.wishs.push({data:that.formItem.wish,color:that.colors[Math.floor(Math.random()*4)]});
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
                url:"http://"+server+"/wishs/delete",
                type:'POST',
                data:{data:name},
                dataType:'json',
                success:function(result){
                    console.log(result);
                    if(result.status === "success"){
                        that.$Message.success("删除成功");
                        //console.log(that.wishs);
                        for(var i = 0;i<that.wishs.length;i++){
                            if(that.wishs[i].data === name){
                                that.wishs.splice(i,1);
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
            url:"http://"+server+"/wishs/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                var finall_data = [];
                for(var i = 0;i<result.length;i++){
                    finall_data.push({data:result[i],color:that.colors[Math.floor(Math.random()*4)]})
                }
                //console.log(result);
                that.wishs = finall_data;
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        })
    }


}
</script>

<style lang="css">
.wishs {
    text-align: left;
}
.wishs h1{
    padding: 10px 20px;
}
.wishs .tip{
    padding: 10px 20px;
}
#addButton {

    margin-left: 20px;

}
.wishs-list {
    margin-top: 20px;
    padding: 0 20px;
}
</style>
