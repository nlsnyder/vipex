<template>
  <section class="hero-section">
    <div class="hero-heading">
      <h1>
        Simplify saving and <br class="hidden md:inline" />
        spending with Vipex
      </h1>
      <div class="hero-buttons">
        <button class="btn cta">
          <router-link to="/add-expense">Try It Now</router-link>
        </button>
      </div>
    </div>
    <img
      src="@/assets/calculator-money-icon.svg"
      alt="money hero image"
      class="hero-image hidden md:block"
    />
  </section>
</template>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin: 80px 20px;
  height: 60vh;
  background: url("@/assets/calculator-money-icon.svg") no-repeat center center !important;
  background-size: cover;
}

@media (min-width: 768px) {
  .hero-section {
    gap: 100px;
    margin: 0;
    height: 90vh;
    background-image: none !important;
  }
}

.hero-heading {
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
  line-height: 1.15;
  z-index: 50;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0px 0px 10px #333;
  background-color: #fff;
  filter: opacity(97%);
}

@media (min-width: 768px) {
  .hero-heading {
    z-index: 1;
    border-radius: none;
    padding: none;
    box-shadow: none;
  }
}

.hero-heading h1 {
  font-size: 2.4rem;
}

@media (min-width: 768px) {
  .hero-heading h1 {
    font-size: 3rem;
  }
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
