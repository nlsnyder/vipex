import { createRouter, createWebHistory } from "vue-router";
import HeroView from "@/views/HeroView.vue";
import { getAuth } from "firebase/auth";

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

// // Should prevent refresh from removing logged in status of user
// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(getAuth());
    if (
      !window.localStorage.getItem("authenticated") &&
      to.name !== "register"
    ) {
      return { name: "register" };
    }
  }
});

export default router;
