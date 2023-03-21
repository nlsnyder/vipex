import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { loadFonts } from "./plugins/webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { plugin, defaultConfig } from "@formkit/vue";
import { applicationIcons } from "@formkit/icons";
import { createPinia } from "pinia";
import { firebaseConfig } from "../firebase.config";
import { initializeApp } from "firebase/app";
import { VueQueryPlugin } from "vue-query";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import "./index.css";

import {
  faMoneyBillTrendUp,
  faStopwatch,
  faFilterCircleDollar,
  faUser,
  faDollarSign,
  faPlus,
  faCheck,
  faX,
  faArrowRight,
  faQuestion,
  faEllipsisVertical,
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
  faTiktok,
  faDollarSign,
  faPlus,
  faCheck,
  faX,
  faArrowRight,
  faQuestion,
  faEllipsisVertical
);

//initialize firebase app
initializeApp(firebaseConfig);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin)
  .use(
    plugin,
    defaultConfig({
      icons: {
        ...applicationIcons,
      },
    })
  )
  .component("sync-loader", SyncLoader)
  .mount("#app");
