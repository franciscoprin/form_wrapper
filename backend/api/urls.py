from .views import EmailApi

from django.conf.urls import url


urlpatterns = [
    url(
        r"^send_email/$",
        EmailApi.as_view({'post': 'send_api'}),
        name="send_email",
    ),

]
