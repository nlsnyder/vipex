import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterAuth.vue"),
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

// Should prevent refresh from removing logged in status of user
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      // Implement error handling, redirect to access denied page?
      // next('/access-denied');
    }
  } else {
    next();
  }
});

export default router;
