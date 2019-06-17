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
            fetch("http://127.0.0.1:8000/category", {
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