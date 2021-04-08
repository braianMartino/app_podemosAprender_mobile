from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from rest_framework import routers
import app_pa.views as views

router = routers.DefaultRouter()
router.register(r'lugar', views.LugarViewSet)
router.register(r'favorito', views.FavoritoViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = (
	[
			path('api/', include(router.urls)),
			path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
	] + 
	static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + #A: imagenes subidas para lugar
	static('app/', document_root=settings.BASE_DIR / '../app_pa_react/static' ) #A: la app react
)

