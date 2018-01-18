<template lang="html">
    <div class="books">
        <Button type="primary" @click="addBook" id="addButton">
            <Icon type="plus-round" shape="circle" size="large"></Icon>
            添加书籍
        </Button>
        <Modal
            v-model="modal1"
            title="添加书籍"
            @on-ok="submit"
            @on-cancel="cancel"
            >
            <Form :model="formItem" :label-width="80">
                <FormItem label="书籍名称">
                    <Input v-model="formItem.book_name" placeholder="请输入书籍名称"></Input>
                </FormItem>
                <FormItem label="作者">
                    <Input v-model="formItem.auther" placeholder="请输入作者名称"></Input>
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
                   book_name:'',
                   auther:''
               }
           }
       },
    methods:{
        addBook:function(){
            this.modal1 = true;
            console.log(this.$route);
        },
        submit:function(){

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
        margin-left: -70px;
    }
</style>
