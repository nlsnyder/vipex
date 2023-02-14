<template>
  <footer>
    <div class="footer-grid">
      <div>
        <div class="company-heading">
          <img src="@/assets/logo.svg" alt="Vuetify footer logo" width="30" />
          <span class="company-name">ipex</span>
        </div>
        <div class="contact-icons">
          <font-awesome-icon
            class="footer-icon twitter"
            icon="fa-brands fa-twitter"
          />
          <font-awesome-icon
            class="footer-icon tiktok"
            icon="fa-brands fa-tiktok"
          />
          <font-awesome-icon
            class="footer-icon instagram"
            icon="fa-brands fa-instagram"
          />
          <font-awesome-icon
            class="footer-icon facebook"
            icon="fa-brands fa-facebook"
          />
        </div>
        <p>Copyright &copy; 2023 by Vipex,<br />Inc. All rights reserved.</p>
      </div>
      <div>
        <h3 class="margin-b font-medium">Contact Information</h3>
        <p class="margin-b">123 Main St. Suite 414<br />Milwaukee, WI 53707</p>
        <p>
          <strong>Email:</strong> vipexinc@vipex.com<br /><strong
            >Phone: </strong
          >(414) 546-9054
        </p>
      </div>
      <div>
        <h3 class="margin-b font-medium">Learn More</h3>
        <ul>
          <li class="font-normal">About Vipex</li>
          <li class="font-normal">Charity donations</li>
          <li class="font-normal">Partner with us</li>
          <li class="font-normal">Careers</li>
        </ul>
      </div>
      <div>
        <h3 class="margin-b font-medium">Other Information</h3>
        <ul>
          <li class="font-normal">FAQ</li>
          <li class="font-normal">Privacy Policy</li>
          <li class="font-normal">Terms of Service</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #f9a339;
  font-weight: 400;
  color: #333;
  padding: 3rem 0;
  font-size: 0.9rem;
}

.footer-grid {
  display: grid;
  width: 70%;
  margin: 0 auto;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr;
  column-gap: 4.8rem;
  row-gap: 6.4rem;
}

.company-heading {
  margin-bottom: 20px;
  display: flex;
}

.company-name {
  font-weight: 700;
  font-size: 1.4rem;
}

.margin-b {
  margin-bottom: 30px;
}

ul {
  list-style: none;
  font-weight: 500;
}

ul li {
  margin-bottom: 10px;
}

.footer-icon {
  margin-right: 15px;
  height: 20px;
}
.footer-icons:last-child {
  margin-right: 0;
}

.contact-icons {
  margin-bottom: 20px;
}
.twitter {
  transition: all 0.2s;
}
.twitter:hover,
.twitter:active {
  color: #00acee;
  cursor: pointer;
}

.tiktok {
  transition: all 0.2s;
}
.tiktok:hover,
.tiktok:active {
  color: #ff0050;
  cursor: pointer;
}

.instagram {
  transition: all 0.2s;
}
.instagram:hover,
.instagram:active {
  color: #962fbf;
  cursor: pointer;
}
.facebook {
  transition: all 0.2s;
}
.facebook:hover,
.facebook:active {
  color: #3b5998;
  cursor: pointer;
}
</style>
