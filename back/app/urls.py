from django.urls import re_path
from . import views

urlpatterns=[
    re_path(r'products',views.products),
    re_path(r'login',views.login),
    re_path(r'signup', views.signup),
    re_path(r'cartProducts',views.cartProducts),
    re_path(r'addtocart',views.addtocart),
    re_path(r'deletefromcart',views.deletefromcart),
    re_path(r'productDetail',views.productDetail),
    re_path(r'IncreaseAmountInCart',views.IncreaseAmountInCart),
]

