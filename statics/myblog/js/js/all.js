
const orgin = "http://127.0.0.1:8000"

const articles = {
    template:
        `
        <article class="row">
    <div class='mycontent col-md-7 col-sm-12'>
        <h1 class="col-md-12" title="标题">{{myarticle.title}}</h1>
        <!-- 文本内容 -->
        <hr>
        <div class='col-md-12 text'>
            {{myarticle.introduction}}
        </div>
        <!-- 底部图标 -->
        <hr>
        <div class="footer col-md-12 col-sm-12 row">
            <div class="articlecategory col-md-6 col-sm-4 col-xs-6">
                <span class="iconfont icon-fenlei1" title="分类"> {{myarticle.category}}</span>
            </div>
            <div class="time col-md-6 col-sm-4 col-xs-6">
                <span class='iconfont icon-shijian' title='发布时间'> {{myarticle.time || 1970-01-01 | timeformat}}</span>
            </div>
            <div class="viewcount col-md-6 col-sm-4 col-xs-6">
                <span class='iconfont icon-yueduliang' title='点击量'> {{myarticle.viewcount}}</span>
            </div>
            <div class="comment col-md-6 col-sm-4 col-xs-6">
                <span class='iconfont icon-tubiaopinglunshu' :title="'评论数 '+ myarticle.article_instance"> {{myarticle.article_instance}}</span>
            </div>
            <div class="see col-md-6 col-sm-4 col-xs-6">
                <span class="iconfont icon-dianji" title="查看全文">  
                <router-link v-bind:to="'/detail/'+myarticle.id"> 阅读</router-link></span>
            </div>
            <div class="clearfix"></div>
        </div>

    </div>
    <div class="img col-md-5  col-xs-12">
        <img 
        :src="myarticle.coverimg"
        alt="">
    </div>
    </article>      
    `,
    filters: {
        timeformat: (val) => {
            // console.log(val)
            return val.slice(0, 10)
        }
    },
    props: ['myarticle'],
}
const message = {
    template:
    `
    <div class="message row">
    <div class="col-md-3"></div>
    <div class="col-md-9 col-sm-12">
        <p>
            {{mymessage}}
        </p>
    </div> 
    </div>
    `,
    data() {
        return {
            // none:false
        }
    },
    props:['mymessage']
}
const timeslist = {
    props: ['mytimelist'],
    template:
        `
    <div>
        <div class="col-md-12 col-sm-6 col-xs-4"
            v-for="mytimelist in lists" 
            :title="mytimelist.times+ ' 发布 ' + mytimelist.counts + ' 篇文章'">
            <span>
            <router-link :to="'/times/'+mytimelist.times.slice(0,4)+'/' + mytimelist.times.slice(5,7) ">{{ mytimelist.times }} ({{ mytimelist.counts }}) </router-link>
            </span>
        </div>
    </div>

    `,
    mounted() {
        this.getTimeslist()
    },
    methods: {
        getTimeslist() {
            const that = this
            fetch(orgin + "/articledatecount", {
                method: "get",
                mode: "cors"
            }).then((req) => {
                return req.json()
            }).then((myJson) => {
                console.log(myJson)
                that.lists = that.lists.concat(myJson)
            })
        }
        ,
    },
    data() {
        return {
            lists: []
        }
    }
}
const category = {
    template:`
    <div>
        <div class="col-md-12 col-sm-6  col-xs-4" 
            v-for='mycategory in categorys'
            :title="mycategory.category+ ' 发布 ' + mycategory.counts + ' 篇文章'">
            <span>
            <router-link :to="'/categorylist/'+mycategory.category">{{ mycategory.category }} ({{mycategory.counts}})</router-link>
            </span>
        </div>
    </div>
    `,
    data() {
        return {
            categorys: []
        }
    },
    methods: {
        getCategory() {
            const that = this
            fetch( orgin + "/category", {
                method: "get",
                mode: "cors"
            }).then((req) => {
                return req.json()
            }).then((myJson) => {
                console.log(myJson)
                that.categorys = that.categorys.concat(myJson)
            })
        }
    },
    mounted() {
        this.getCategory()
    },
}
const timelistofdetail = {
    props:["year", "month"],
    data() {
        return {
            lists:[]
        }
    },
    filters: {
        timeformat: (val) => {
            // console.log(val)
            return val.slice(0, 10)
        }
    },
    watch: {
        "$route":function(){
            this.getList()
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList(){
            const that = this
            fetch(`${orgin}/articlestime/?year=${this.year}&month=${this.month}`,
                {
                    method:"get",
                    mode:"cors"
                }
            ).then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                that.lists = myJson
            })
        }
    },
    template: 
    `
    <div class="timelist col-md-9">
    <h1>{{this.year + "-" + this.month }}</h1>
    <div class="TimeOfArticle">
        <ol>
            <li class="detailList col-md-9"
                v-for="item in lists"
            >
                <blockquote>
                    <h2 title="标题">
                    <router-link :to="'/detail/' + item.id">{{item.title}}</router-link>
                    </h2>
                    <span class='iconfont icon-shijian' title='发布时间'>  {{item.time | timeformat}}</span>
                    <span class="iconfont icon-fenlei1" title="分类">  {{item.category}}</span>
                </blockquote>
            </li>
        </ol>
        </div>
    </div>
    `
}
const categorydetail = {
    props: ["category"],
    data() {
        return {
            lists: []
        }
    },
    methods: {
        getList() {
            const that = this
            fetch(`${orgin}/articlelist/?category=${this.category}`,
                {
                    method: "get",
                    mode: "cors"
                }
            ).then(function (response) {
                return response.json();
            })
                .then((myJson) => {
                    that.lists = myJson
                })
        }
    },
    filters: {
        timeformat: (val) => {
            return val.slice(0, 10)
        }
    },
    watch: {
        "$route": function () {
            this.getList()
        }
    },
    mounted() {
        this.getList()
    },
    template: `
    <div class="Categorylist col-md-9">
    <h1>{{$route.params.category}}</h1>
    <div class="CategoryOfArticle">
        <ol>
            <li class="detailList col-md-9"
                v-for="item in lists"
            >
                <blockquote>
                    <h2 title="标题">
                    <router-link :to="'/detail/' + item.id">{{item.title}}</router-link>
                    </h2>
                    <span class='iconfont icon-shijian' title='发布时间'>  {{item.time | timeformat}}</span>
                    <span class="iconfont icon-fenlei1" title="分类">  {{item.category}}</span>
                </blockquote>
            </li>
        </ol>
    </div>
    </div>
    `
}  
const comments = {
    data() {
        return {
            user: "",
            email: "",
            content: "",
            none: false,
            err: ""
        }
    },
    template:
        `
<div class="comments" v-if="comments">
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
    <div class="input-group myinput col-md-4 col-xs-12">
    <span class="input-group-addon " id="basic-addon1">名字</span>
    <input type="text" 
        class="form-control"
        style="" 
        placeholder="你的大名" 
        aria-describedby="basic-addon1"
        v-model="user"
    >
</div> 
<div class="input-group col-md-4 col-xs-12">
    <span class="input-group-addon" id="basic-addon1">邮箱地址</span>
    <input type="email" 
        style="" 
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
        <button type="button" @click="addComment" class="btn btn-success">提交</button>
        <transition name="slide-fade">
            <message v-if='none' :mymessage="err"></message>
        </transition>
        </div>

</div>
`,
    props: ['comments', 'articleid'],
    methods: {
        formcheck() {
            const that = this
            if (this.user.trim()) {
            } else {
                this.emit("名字不能为空")
                return false
            }
            if (this.email.trim()) {
            } else {
                this.emit("邮箱不能为空")
                return false
            }
            if (this.content.trim()) {
                if (this.content.length < 32) {
                    this.emit("内容长度不能少于32个字符")
                    return false
                }
            } else {
                this.emit("内容不能为空")
                return false
            }
            return true
        },
        emit(errmessage) {
            const that = this
            this.none = true
            this.err = errmessage
            setTimeout(() => {
                that.none = false
            }, 2000)
        },
        addComment() {
            if (this.formcheck()) {
                const that = this
                fetch(orgin + "/comment/", {
                    method: "post",
                    mode: "cors",
                    body: JSON.stringify(
                        {
                            "toarticle_id": that.articleid,
                            "user": that.user,
                            "email": that.email,
                            "content": that.content,
                        }
                    )
                }).then((mydata)=>{
                    return mydata.json()
                }).then((data)=>{
                    if(data.message == 'ok'){
                        that.emit("评论成功")
                        that.$parent.getArticleDetailByid(that.articleid)
                        that.$parent.render = false
                        that.$parent.render = true
                    }
                })
                this.emit('评论成功')
                this.user = ""
                this.email = ""
                this.content = ""
            }
        }
    },
    components: {
        'message': message
    }
}
const article_componts = {
    components: {
        'myarticle': articles,
        'message': message
    },
    template: `
    <section class='articlelist col-md-9  cf'>
        <hr>
                <myarticle v-for='article in myarticles' v-bind:myarticle='article' keys='article.key'></myarticle>

        <div id='next' class='row'>
            <button class='col-md-12' @click='next' v-bind:disabled='none'>下一页</button>
        </div>
        <transition name="slide-fade">
            <message v-if='none' :mymessage="'没有更多内容'"></message>
        </transition>
    </section>
    `,
    data() {
        return {
            myarticles: [],
            page: 1,
            none: false,
            nonext: false,
        }
    },
    methods: {
        getArticleOfPage(page) {
            const that = this
            fetch(orgin + "/articles/?page=" + page, {
                method: "get",
                mode: "cors"
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    console.log(myJson)
                    if (myJson == 404) {
                        that.next = function () {
                            that.animationofmessage()
                        }
                        that.animationofmessage()
                    }
                    else {
                        that.myarticles = that.myarticles.concat(myJson)
                    }
                });
        },
        next() {
            this.page += 1
        },
        animationofmessage() {
            that = this
            this.none = true
            setTimeout(() => {
                that.none = false
            }, 2000)
        }
        ,
    },
    mounted() {
        this.getArticleOfPage(this.page)
    },
    watch: {
        page: function (newPage, oldPage) {
            this.getArticleOfPage(newPage)
        }
    },
}
const article_detail = {
    template:
        `
    <div class="myarticle col-md-9" v-if="article_details[0]">
        <h1 title="文章标题">{{article_details[0].title}}</h1><hr>
        <div v-html="article_details[0].content"></div>
        <hr>
        <comments
        v-if="render"
        :comments="article_details[0].article_instance"
        :articleid="id"
        ></comments>
    </div>
    `,
    components: {
        "comments": comments
    },
    props: ['id'],
    data() {
        return {
            article_details: [],
            render:true
        }
    },
    updated() {
        this.highlight()
        this.$root.mydetail = this.article_details[0].title
    },
    mounted() {
        this.getArticleDetailByid(this.id)
    },
    methods: {
        getArticleDetailByid(id) {
            const that = this
            fetch(orgin + "/article/?id=" + id, {
                method: "get",
                mode: "cors"
            })
                .then(function (response) {
                    return response.json();
                })
                .then((myJson) => {
                    that.article_details.unshift(myJson)
                })
        },
        highlight: () => {
            document.querySelectorAll('pre').forEach((block) => {
                hljs.highlightBlock(block);
            });
        }

    }
}

const routers = [
    {
        name: "文章",
        path: '/detail/:id',
        component: article_detail,
        props: true
    },
    {
        name: '首页',
        path: '/',
        component: article_componts,
    },
    {
        name: "时间归档",
        path: "/times/:year/:month",
        props: true,
        component: timelistofdetail,
    },
    {
        name: "分类",
        path: "/categorylist/:category",
        props: true,
        component: categorydetail,
    },
]
const router = new VueRouter({
    routes: routers,
})
const vm = new Vue({
    el: '#app',
    components: {
        // 'article_componts': article_componts,
        'timeslist': timeslist,
        'category': category
    },
    router: router,
    data: {
        mydetail: '0'
    },
    filters: {
        timeformat: (val) => {
            // console.log(val)
            return val.slice(0, 10)
        }
    }
})