import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { plugin, defaultConfig } from "@formkit/vue";
import "./index.css";

import {
  faMoneyBillTrendUp,
  faStopwatch,
  faFilterCircleDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

loadFonts();

library.add(
  faMoneyBillTrendUp,
  faStopwatch,
  faFilterCircleDollar,
  faUser,
  faTwitter,
  faFacebook,
  faInstagram,
  faTiktok
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(plugin, defaultConfig)
  .mount("#app");
