from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from myblog import models
from . import mySer
from django.core import paginator
import json


def index(req):
    # content = models.Article.objects.all()[0]
    # return render(req, 'index.html')
    html = open('./templates/index.html', 'r')
    return HttpResponse(html)

def comment(req):
    if req.method == 'POST':
        # print(json.loads(req.body))
        body = json.loads(req.body)
        models.Comment.objects.create( **body)
        return JsonResponse({
            "message": "ok"
        }, safe=False)

def article(req):
    query = models.Article.objects.get(id=req.GET.get('id'))
    query.viewcount += 1
    query.save()
    # query = models.Article.objects.filter(id=req.GET.get('id'))
    ser = mySer.Article(query)
    return JsonResponse(ser.data, safe=False)

def comments_of_article(request):
    artcle_id = request.GET.get('id')
    ser = mySer.CommentSer(models.Comment.objects.all().filter(toarticle=artcle_id), many=True)
    return JsonResponse(ser.data, safe=False)


def article_list_date_count(request):
    query = models.Article.objects\
        .raw(
        """
        SELECT id, times, count(times) counts  
        from (SELECT id, strftime('%Y-%m',time) times from myblog_article) 
        GROUP by times order by times DESC ;
        """)
    ser = mySer.ArticleSerOfdatecount(query, many=True)
    return JsonResponse(ser.data, safe=False)


def articlesofdate(req):
    if(req.method == 'GET'):
        if'month' not in req.GET.dict():
            query = models.Article.objects.filter(time__contains=req.GET.get('year')+'-')
            ser = mySer.ArticleSerOfdatelist(query, many=True)
            return JsonResponse(ser.data, safe=False)
        else:
            query = models.Article.objects.filter(time__contains=req.GET.get('year')+'-'+req.GET.get('month'))
            ser = mySer.ArticleSerOfdatelist(query, many=True)
            return JsonResponse(ser.data, safe=False)


def artciles(req):
    if(req.method == 'GET'):
        if 'page' in req.GET.dict():
            page = paginator.Paginator(models.Article.objects.all(),5)
            page_result = page.get_page(req.GET.get('page'))
            if page.num_pages < int(req.GET.get('page')):
                return HttpResponse('404')
            ser = mySer.Article(page_result.object_list.all(), many=True)
            for i in ser.data:
                i['article_instance'] = len(i['article_instance'])
            return JsonResponse(ser.data, safe=False)

def categoryofarticles(req):
    if(req.method == 'GET'):
        query = models.Category.objects.raw(
        """
        SELECT  a.id, category,count(1) counts
        FROM myblog_category a INNER JOIN myblog_article b
        ON  a.id = b.category_id GROUP BY a.id;
        """  
        )
        ser = mySer.CategorySer(query,many=True)
        return JsonResponse(ser.data, safe=False)

def categorylistofarticles(req):
    if(req.method == 'GET'):
        query = models.Category.objects.all()\
        .get(category=req.GET.get('category'))\
        .article_set.all()
        ser = mySer.ArticleSerOfdatelist(query, many=True)
        return JsonResponse(ser.data, safe=False)
