const comments = {
    data() {
        return {
            user:"",
            email:"",
            content:""
        }
    },
    template:
    `
    <div class="comments">
        <p> 评论（{{ comments.length }}）</p>
        <div class="comments"
        v-for=" comment in comments "
        >
            <div class="commentsname">
                <span class="iconfont icon-user"> {{comment.user}} </span>
                <span title='发布时间'> 评论时间：{{comment.time.slice(0,10)}}</span>
            </div>
            <div class="commentcontent"
                v-html="comment.content"
            >
            </div>
        </div>
        <div class="commentare">
        <hr>
        评论区：
        <br>
        <br>
        <div class="input-group col-md-12">
            <span class="input-group-addon" id="basic-addon1">名字</span>
            <input type="text" class="form-control"
            style="width:180px;" 
            placeholder="你的大名" 
            aria-describedby="basic-addon1"
            v-model="user"
            >
            <span class="input-group-addon" id="basic-addon1">邮箱地址</span>
            <input type="email" style="width:180px;" 
            class="form-control" 
            placeholder="邮箱地址" 
            aria-describedby="basic-addon1"
            v-model="email"
            >
            </div>   
            <textarea 
            class="form-control" 
            placeholder="评论内容" 
            rows="6"
            v-model="content"
            ></textarea>
            <button type="button" class="btn btn-success">提交</button>
        </div>
    </div>
    `,
    props:['comments'],
    methods: {
        addComment(){
            if(this.user.trim()){
            }else{
                
            }
        }
    },
}