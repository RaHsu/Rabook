<template lang="html">
    <div class="books">
        <h1>已读书籍 <Alert type="info" show-icon>
            共
            <span class="book-count">{{book_count}}</span>
            本书
        </Alert></h1>



        <div class="fliter">

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
                     {{item.comment}}


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
                   type:''

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
            url:"http://localhost:3000/readedbooks/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                that.primary_book_list = result;
                that.show_book_list = that.primary_book_list.reverse();
                for(var i = 0;i<that.primary_book_list.length;i++){
                    that.primary_book_list[i].book_id = i;
                }
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
    .books h1{
        padding-left: 20px;
        padding-top: 10px;
    }
    #addButton {
        margin-top: 20px;
        margin-left: 20px;
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
    .book-count{
        font-size: 18px;
    }
    .ivu-alert{
        display: inline-block;
    }
    .fliter .ivu-radio-group-button .ivu-radio-wrapper{
        background-color: #5bc0de;
        border-color: white;
        color: white;
    }
</style>
