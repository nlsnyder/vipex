<template>
  <header class="navigation">
    <nav>
      <div class="app-logo-name">
        <router-link to="/"
          ><img src="@/assets/logo.svg" alt="Vuetify filler logo" width="50"
        /></router-link>
        <h1>Company Title</h1>
      </div>
      <ul>
        <li><router-link to="/add-expense">Add Expense</router-link></li>
        <li><router-link to="/view-expenses">View Expenses</router-link></li>
      </ul>
      <div>
        <button class="action-btn btn">Sign out</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navigation {
  background-color: #f9a339;
  min-height: 10vh;
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
  display: inline-flex;
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
</style>
