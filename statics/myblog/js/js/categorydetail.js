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
            fetch(`http://127.0.0.1:8000/articlelist/?category=${this.category}`,
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