<template lang="html">
    <div class="books">
        <h1>正在读的书</h1>
        <div class="tip">
            <Alert show-icon>
                你正在读<span class="book-count">{{book_count}}</span>本书
                <Icon type="bookmark" slot="icon"></Icon>

                <template slot="desc">建议同时读书不要超过3本哦，一本一本读完不要半途而废比较好。</template>
            </Alert>
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
                     <Button size="small" type="success" @click.capture="addComment" :book_id="item.book_id">
                         <Icon type="android-checkbox"></Icon>
                         读完啦！
                     </Button>
                     <Button size="small" type="error"  @click.capture="abandon" :book_id="item.book_id">
                         <Icon type="android-close"></Icon>
                         放弃阅读
                     </Button>
                </p>
            </Card>
        </div>
        <Modal
            v-model="modal1"
            title="留下对书籍的评论"
            @on-ok="submit"
            @on-cancel="cancel"
            ok-text="提交"
            >
            <Input v-model="comment" type="textarea" placeholder="输入评论" :rows="6"></Input>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
           return {
               modal1: false,
               comment:'',
               comment_id:null,
               show_book_list:[],
               primary_book_list:[],
               book_count:0
           }
       },
    methods:{
        addComment:function(){
            var book = event.srcElement.getAttribute("book_id")
            ||event.srcElement.parentNode.getAttribute("book_id")
            ||event.srcElement.parentNode.parentNode.getAttribute("book_id");
            this.modal1 = true;
            this.comment_id = book;
            console.log(this.comment_id);
        },

        cancel:function(){

        },
        submit:function(){
            var that = this;
            var send_data = this.primary_book_list[this.comment_id];
            send_data.comment = this.comment;

            console.log(send_data);

            $.ajax({
                url:"http://localhost:3000/reading/finish",
                data:{data:send_data},
                type:'POST',
                dataType:'JSON',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success("操作成功,即将刷新");
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

        abandon:function(event){
            var book = event.srcElement.getAttribute("book_id")
            ||event.srcElement.parentNode.getAttribute("book_id")
            ||event.srcElement.parentNode.parentNode.getAttribute("book_id");

            var send_data = this.primary_book_list[book];

            console.log(send_data);

            var that = this;
            $.ajax({
                url:"http://localhost:3000/reading/abandon",
                data:{data:send_data},
                type:'POST',
                dataType:'JSON',
                success:function(result){
                    console.log(result);
                    if(result.status === 'success'){
                        that.$Message.success("放弃成功,即将刷新");
                        setTimeout("window.location.reload(true);",2000);
                    }else{
                        that.$Message.error(result.message);
                    }

                },
                error:function(xhr,textStatus){
                    that.$Message.error("连接服务器失败");

                }
            })


        }



    },
    created(){

        var that = this;

        // 获取书籍信息并默认显示全部
        $.ajax({
            url:"http://localhost:3000/readingbooks/get",
            type:'GET',
            dataType:'json',
            success:function(result){
                that.primary_book_list = result;
                that.show_book_list = that.primary_book_list;
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
    .books .tip{
        margin: 10px 20px;
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
        margin-top: 5px;
    }
    .bookList .ivu-card-bordered{
        width: 100%;
    }
    .bookList .ivu-card-body{
        padding: 5px 10px;
    }
    @media screen and (min-width: 900px) {
        .bookList .ivu-card-bordered{
            width: 50%;
            display: inline-block;
        }
    }

    .book-count{
        font-size: 18px;
    }


</style>
