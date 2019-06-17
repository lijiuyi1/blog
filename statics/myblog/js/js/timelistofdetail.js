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
            fetch(`http://127.0.0.1:8000/articlestime/?year=${this.year}&month=${this.month}`,
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