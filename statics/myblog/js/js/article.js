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
