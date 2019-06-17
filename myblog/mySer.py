from rest_framework import serializers
from myblog import models

class CommentSer(serializers.ModelSerializer):

    toarticle = serializers.StringRelatedField()

    class Meta:
        model = models.Comment
        fields = ('id','user', 'content', 'toarticle', 'time')



class CategorySer(serializers.ModelSerializer):
    counts = serializers.CharField()    
    class Meta:
        model = models.Category
        fields = ('id','category','counts')

class Article(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(read_only=True,slug_field='category')
    # comment = CommentSer(many= True, read_only= True)
    article_instance = CommentSer(many=True)
    class Meta:
        model = models.Article
        fields = (
            'id',
            'title',
            'introduction',
            'category',
            'time',
            'viewcount', 
            'article_instance'
            ,'content',
            'coverimg')

class ArticleSerOfdatecount(serializers.ModelSerializer):
    # category = serializers.SlugRelatedField(read_only=True,slug_field='category')
    counts = serializers.CharField()
    times = serializers.CharField()
    class Meta:
        model = models.Article
        fields = ('times','counts')

class ArticleSerOfdatelist(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(read_only=True,slug_field='category')
    # counts = serializers.CharField()
    class Meta:
        model = models.Article
        fields = ('id','title','time','viewcount','category')

# class ArticleListOfCategory(serializers.ModelSerializer):
#     category = serializers.SlugRelatedField(read_only=True,slug_field='category')
#     class Meta:
#         model = models.Article
#         fields = ('id','category', 'viewcount')