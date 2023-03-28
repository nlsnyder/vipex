<template>
  <header class="navigation">
    <MobileNav
      @close-mobile-nav="toggleMobileNav"
      @sign-user-out="signUserOut"
      :mobile-open="mobileNavState.openMobileNav"
    />
    <nav>
      <div @click="closeMobileNav" class="app-logo-name">
        <router-link to="/"
          ><img src="@/assets/logo.svg" alt="Vuetify filler logo" width="50"
        /></router-link>
        <h1>Company Title</h1>
      </div>
      <ul class="hidden md:inline-flex">
        <li><router-link to="/add-expense">Add Expense</router-link></li>
        <li><router-link to="/view-expenses">View Expenses</router-link></li>
      </ul>
      <div class="hidden md:block" v-if="isLoggedIn">
        <button @click="signUserOut(false)" class="action-btn btn">
          Sign out
        </button>
      </div>
      <button @click="toggleMobileNav" class="md:hidden">
        <font-awesome-icon
          class="h-8 w-8 secondary-color"
          icon="fa-solid fa-ellipsis-vertical"
        />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MobileNav from "./MobileNav.vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { onMounted, reactive, ref } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const mobileNavState = reactive<{ openMobileNav: boolean }>({
  openMobileNav: false,
});

const isLoggedIn = ref(false);

let auth: Auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const signUserOut = (toggleNav: boolean) => {
  signOut(auth).then(() => {
    window.localStorage.clear();
    store.clearAuthState();
    router.push("/signin");
  });
  if (toggleNav) {
    toggleMobileNav();
  }
};

const toggleMobileNav = () => {
  mobileNavState.openMobileNav = !mobileNavState.openMobileNav;
};

const closeMobileNav = () => {
  mobileNavState.openMobileNav = false;
};
</script>

<style scoped>
.navigation {
  background-color: #f9a339;
  height: 10vh;
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%; */
}

nav {
  padding: 15px 0px;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

@media (max-width: 1239px) {
  nav {
    padding: 15px 30px;
  }
}

.app-logo-name {
  display: flex;
  gap: 20px;
  align-items: center;
}

ul {
  list-style: none;
  gap: 50px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #ffc681;
}

.action-btn {
  padding: 5px 15px;
  background: #f7f5fb;
  margin-left: 10px;
}

.btn {
  padding: 5px 15px;
  border-radius: 20px;
  transition: all 0.2s;
}

.btn:active,
.btn:hover {
  background-color: #ffc681;
}

.secondary-color {
  color: #0a5cae;
}
</style>
