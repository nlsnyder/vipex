import { createRouter, createWebHistory } from "vue-router";
import HeroView from "@/views/HeroView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: true,
      },
      component: HeroView,
    },
    {
      path: "/signin",
      name: "signIn",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/add-expense",
      name: "add",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/AddExpenseView.vue"),
    },
    {
      path: "/view-expenses",
      name: "view",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/ViewExpensesView.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (
      !window.localStorage.getItem("authenticated") ||
      (window.localStorage.getItem("authenticated") === "false" &&
        to.name !== "register" &&
        to.name !== "signin")
    ) {
      return { name: "signIn" };
    }
  }
});

export default router;
