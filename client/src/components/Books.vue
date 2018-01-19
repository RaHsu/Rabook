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
                <FormItem label="所属">
                    <Select v-model="formItem.belong" style="width:200px">
                        <Option v-for="item in belongs_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="类型">
                    <Select v-model="formItem.type" style="width:200px">
                        <Option v-for="item in types_data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <div class="fliter">
            <Alert type="info" show-icon>
                共
                <span class="book-count">{{book_count}}</span>
                本书
            </Alert>
            <span>
                筛选：
            </span>
            <RadioGroup type="button" size="small" @on-change="fliter">
                <Radio label="所有书籍"></Radio>
                <Radio v-for="item in fliter_data" :label="item.label" :key="item.id"></Radio>
            </RadioGroup>
        </div>
        <div class="bookList">
            <Card v-for="item in show_book_list" :key="item.id">
                <p slot="title">{{item.bookName}}
                    <span class="auther">{{item.auther}}</span>
                    <Tag color="#2d8cf0">{{item.type}}</Tag>
                </p>
                <p slot="extra">
                    <Tag color="green" type="dot">{{item.belong}}</Tag>
                </p>
                <p>
                     <Button type="primary">
                         <Icon type="android-bookmark"></Icon>
                         开始读
                     </Button>
                     <Button type="success">
                         <Icon type="flag"></Icon>
                         加入最近阅读计划
                     </Button>
                     <Button type="warning">
                         <Icon type="edit"></Icon>
                         修改
                     </Button>
                     <Button type="error">
                         <Icon type="trash-b"></Icon>
                         删除
                     </Button>

                </p>
            </Card>
        </div>

    </div>
</template>

<script>
export default {
    data () {
           return {
               modal1: false,
               formItem:{
                   book_name:'',
                   auther:'',
                   belong:'',
                   type:'',
                   status:1
               },
               belongs_data:[],
               types_data:[],
               show_book_list:[],
               primary_book_list:[],
               fliter_data:[],
               book_count:0
           }
       },
    methods:{
        addBook:function(){
            this.modal1 = true;

        },
        submit:function(){
            console.log(this.formItem);
            var that = this;
            $.ajax({
                url:"http://localhost:3000/books/add",
                data:{data:this.formItem},
                type:'POST',
                dataType:'JSON',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success(result.message + ",即将刷新");
                        setTimeout("window.location.reload(true);",2000);
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
        fliter:function(label){
            console.log(label);
            var filter_list = [];
            if(label === "所有书籍"){
                this.show_book_list = this.primary_book_list;
                this.book_count = this.primary_book_list.length;
            }else{
                for(var i = 0;i<this.primary_book_list.length;i++){
                    if(this.primary_book_list[i].belong === label){
                        filter_list.push(this.primary_book_list[i]);
                    }
                }
                this.show_book_list = filter_list;
                this.book_count = filter_list.length;
            }

        }

    },
    created(){
        // 初始化所属和类型选项
        var that = this;
        $.ajax({
            url:"http://localhost:3000/belongs/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                var data = [];
                for(var i=0;i<result.length;i++){
                    data.push({label:result[i]});
                }

                that.fliter_data = data;

                var belongs_list = [];
                for(var i=0;i<result.length;i++){
                    belongs_list.push({value:result[i],label:result[i]});
                }
                that.belongs_data = belongs_list;

                console.log(belongs_list);
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        });
        $.ajax({
            url:"http://localhost:3000/types/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                var types_list = [];
                for(var i=0;i<result.length;i++){
                    types_list.push({value:result[i],label:result[i]});
                }
                that.types_data = types_list;
                console.log(types_list);
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        });
        // 获取书籍信息并默认显示全部
        $.ajax({
            url:"http://localhost:3000/books/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                that.primary_book_list = result;
                that.show_book_list = that.primary_book_list;
                that.book_count = that.primary_book_list.length;
                console.log(that.show_book_list);
            },
            error:function(xhr,textStatus){
                that.$Message.error("连接服务器失败");
            }
        });
    }
}
</script>

<style lang="css">
    .books {
        text-align: left;
    }
    #addButton {
        margin-top: 20px;
        margin-left: -70px;
    }
    .bookList{
        padding: 20px 20px;
    }
    .bookList .auther{
        font-size: 12px;
        font-weight: normal;
        color: #80848f;
    }
    .bookList .ivu-card-head p{
        font-size: 18px;
        height: 30px;
    }
    .bookList .ivu-btn{
        margin-top: 10px;
    }
    .bookList .ivu-card-bordered{
        width: 100%;
    }
    @media screen and (min-width: 900px) {
        .bookList .ivu-card-bordered{
            width: 50%;
            display: inline-block;
        }
    }
    .fliter {
        padding: 10px 20px;
    }
    .fliter .book-count{
        font-size: 18px;
    }
    .fliter .ivu-alert{
        display: inline-block;
    }
    .fliter .ivu-radio-group-button .ivu-radio-wrapper{
        background-color: #5bc0de;
        border-color: white;
        color: white;
    }
</style>
