<template>
  <section class="hero-section">
    <div class="hero-heading">
      <h1>Simplify saving and <br />spending with Vipex</h1>
      <div class="hero-buttons">
        <button class="btn cta">
          <router-link to="/add-expense">Try It Now</router-link>
        </button>
        <button class="btn">Sign Up</button>
      </div>
    </div>
    <img
      src="@/assets/calculator-money-icon.svg"
      alt="money hero image"
      class="hero-image"
    />
  </section>
</template>

<style scoped>
.hero-section {
  padding: 40px 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  gap: 100px;
  font-weight: 500;
}

.hero-heading {
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
  line-height: 1.15;
}

.hero-heading h1 {
  font-size: 3rem;
}

.hero-heading p {
  text-align: left;
}

.hero-image {
  max-height: 400px;
  filter: opacity(80%);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.cta {
  background-color: #f9a339;
}

.btn {
  padding: 8px 15px;
  border-radius: 20px;
  transition: all 0.2s;
  font-size: 1.1rem;
}

.btn:active,
.btn:hover {
  background-color: #ffc681;
}
</style>
