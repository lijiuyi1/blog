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
            fetch("http://127.0.0.1:8000/articledatecount", {
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
