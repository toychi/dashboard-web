import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import Sources from "@/pages/Sources.vue";
import Districts from "@/pages/Districts.vue";
import Projects from "@/pages/Projects.vue";
import Factors from "@/pages/Factors.vue";
import Login from '@/components/Login'
import store from '@/store'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    beforeEnter (to, from, next) {
      if (!store.getters.isAuthenticated) {
        console.log(store.getters.isAuthenticated)
        // next('/login')
        next()
      } else {
        next()
      }
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "sources",
        name: "sources",
        component: Sources
      },
      {
        path: "districts",
        name: "districts",
        component: Districts
      },
      {
        path: "factors",
        name: "factors",
        component: Factors
      },
      {
        path: "projects",
        name: "projects",
        component: Projects
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
