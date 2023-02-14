import { createRouter, createWebHistory } from "vue-router";
import HeroView from "@/views/HeroView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HeroView,
    },
    {
      path: "/add-expense",
      name: "add",
      component: () => import("../views/AddExpenseView.vue"),
    },
    {
      path: "/docs",
      name: "docs",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
