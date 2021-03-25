import django
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Products
from .models import UserTable,Cart
from django.core import serializers
import json
from time import gmtime, strftime


# Create your views here.
def products(request):
    products_=json.loads(serializers.serialize('json',Products.objects.all()))

    toClient=[]
    for i in products_:
        toClient.append({'pk': i['pk'],
         'Name': i['fields']['name'],
         'Description': i['fields']['description'], 'Amount': i['fields']['amount'],
         'Sum': i['fields']['amount'] * i['fields']['price'], 'Price': i['fields']['price'],
         'Image': i['fields']['imgurl']
         })

    return JsonResponse([{'data': toClient}],safe=False)

@csrf_exempt
def signup(request):
    if(request.method == 'POST'):
        
        if(UserTable.objects.filter(email=json.loads(request.body)['email'])):
            print("email exists")
            return JsonResponse([{'code':0,'message':'Пользователь с таким email зарегестрирован!'}],safe=False)
        if (UserTable.objects.filter(login=json.loads(request.body)['login'])):
            return JsonResponse([{'code': 0, 'message': 'Такой логин существует!'}], safe=False)

        newUser=UserTable(login=data['login'],name="userName",password=data['password'],
                          email=data['email'],role='U',registrationdate=strftime("%Y-%m-%d", gmtime()))
        newUser.save()
        return JsonResponse([{'code':1,'message':'Вы зарегестрировались,авторизуйтесь'}],safe=False)
        




@csrf_exempt
def login(request):

    if (request.method == 'POST'):
        if (UserTable.objects.filter(email=json.loads(request.body)['email'])):
            if (UserTable.objects.filter(password=json.loads(request.body)['password'])):
                data = UserTable.objects.get(email=json.loads(request.body)['email'])
                return JsonResponse([{'code': 2, 'message': 'Вы успешно вошли','data':
                                     {'Name':data.name,'Email':data.email,'Registdate':data.registrationdate,
                                      'login':data.login,'pk':data.pk}
                                      }],safe=False)
            else:
                return JsonResponse([{'code': 1, 'message': 'Пароль не верный!'}],safe=False)
        else: return JsonResponse([{'code': 0, 'message': 'Email не верный!'}], safe=False)
    return JsonResponse([{'code':-1,'message':'Ошибка!'}])

@csrf_exempt
def addtocart(request):
    if(request.method=='POST'):
        try:
            
            idies=json.loads(request.body)
            Cart.objects.create(userid=UserTable.objects.get(pk=idies['UserID']),productid=Products.objects.get(pk=idies['ProductID']),amount=1)
            return JsonResponse([{'code':1,'message':'Успех!'}],safe=False)
        except django.db.utils.IntegrityError:
            return JsonResponse([{'code': 0, 'message': 'Такой товар уже есть в корзине!!'}], safe=False)
    return JsonResponse([{'code':0,'message':'Error'}],safe=False)


@csrf_exempt
def IncreaseAmountInCart(request):
    if(request.method=='POST'):
        try:
            idies=json.loads(request.body)
            amount = Cart.objects.raw("SELECT userid, amount FROM Cart WHERE productid ="+ str(json.loads(request.body)['productid']))
            print(amount[0].amount)
            amount_= amount[0].amount+1
            Cart.objects.filter(userid=json.loads(request.body)['userid'],productid=json.loads(request.body)['productid']).update(amount=amount_)
            return JsonResponse([{'code':1,'message':'Успех!'}],safe=False)
        except django.db.utils.IntegrityError:
            return JsonResponse([{'code': 0, 'message': 'Такого товара нет'}], safe=False)
    return JsonResponse([{'code': 0, 'message': 'Error'}], safe=False)


def deletefromcart(request):
    print(request.GET.get('productid',-1))
    if (request.method == 'GET'):
        try:
            print(request.GET.get('userid',-1))
            Cart.objects.filter(productid=request.GET.get('productid',-1),userid=request.GET.get('userid',-1)).delete()

            return JsonResponse([{'code': 1, 'message': 'Успех!'}], safe=False)
        except django.db.utils.IntegrityError:
            return JsonResponse([{'code': 0, 'message': 'Такого товара нет'}], safe=False)
    return JsonResponse([{'code': 0, 'message': 'Error'}], safe=False)


def cartProducts(request):
    
    if(request.method=='GET'):
        buf=Products.objects.raw("SELECT app_product.id as id, app_product.Name as Name,app_product.Description as Description, app_product.price as price, cart.userid, cart.amount as amount FROM cart, app_product WHERE cart.productid = app_product.id AND cart.userid ="+request.GET.get('userID',0))
        result=[]
        for i in buf:
            result.append({'pk': i.pk,
                               'Name': i.name,
                               'Description': i.description, 'Amount': i.amount,
                               'Sum': i.amount * i.price, 'Price': i.price,
                               })
        return JsonResponse([{'code':1,'message':'Успех!','data':result}],safe=False)

    return JsonResponse([{'code':0,'message':'nothing'}],safe=False)


def productDetail(request):
    if(request.method=='GET'):
        buf=Products.objects.raw("SELECT * FROM app_product WHERE id = " + request.GET.get('productId',0))
        result=[]
        for i in buf:
            result.append({'pk': i.pk,
                               'Name': i.name,
                               'Description': i.description, 'Amount': i.amount,
                               'Sum': i.amount * i.price, 'Price': i.price,
                               'Image': i.imgurl
                               })
        return JsonResponse([{'code':1,'message':'Успех!','data':result}],safe=False)

    return JsonResponse([{'code':0,'message':'nothing'}],safe=False)
