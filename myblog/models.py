from django.db import models
from froala_editor.fields import FroalaField
# Create your models here.

INTRODUCTION = '''
文章
'''
coverimg_def = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=891209561,3636218284&fm=27&gp=0.jpg"

class Category(models.Model):

    category = models.CharField(max_length=20, verbose_name='分类')

    def __str__(self):
        return '[' + self.category + ']'

    class Meta:

        verbose_name = '分类'
        verbose_name_plural = '分类'


class Article(models.Model):

    title = models.CharField(max_length=30, verbose_name='文章标题')
    content = FroalaField(verbose_name="文章内容")
    introduction = models.TextField('简介', default=INTRODUCTION)
    time_update = models.DateTimeField(verbose_name='修改时间', auto_now= True,)
    time = models.DateTimeField(verbose_name='创建时间',  auto_now_add= True)
    viewcount = models.IntegerField(default=0,verbose_name='浏览量')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='分类')
    coverimg = models.URLField(default=coverimg_def,verbose_name="封面图片")
    def __str__(self):
        return '[' + str(self.id) + ']' + self.title

    class Meta:
        ordering = ('-time',)
        verbose_name = '文章'
        verbose_name_plural = '文章'


class Comment(models.Model):
    user = models.CharField(max_length=20, verbose_name='文章标题', default='无名')
    toarticle = models.ForeignKey(Article, related_name="article_instance", verbose_name='评论对象', on_delete=models.CASCADE)
    content = FroalaField(verbose_name="文章内容")
    email = models.EmailField(default="xx@xx.com")
    time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    time_update = models.DateTimeField(auto_now=True, verbose_name='修改时间')

    def __str__(self):
        return '[' + self.toarticle.title +']'+ '的评论'

    class Meta:
        verbose_name = '评论'
        verbose_name_plural = '评论'


class Message(models.Model):

    email = models.EmailField(verbose_name='邮箱')
    name = models.CharField(max_length=30, verbose_name='名称')
    time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    content = models.TextField(verbose_name='内容')

    def __str__(self):
        return '[' + self.email + '的留言]'

    class Meta:
        verbose_name = '留言'
        verbose_name_plural = '留言'

