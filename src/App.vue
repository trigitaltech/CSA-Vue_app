<template>
  <v-app>
    <navBar />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import navBar from "@/components/navBar.vue";
import './assets/styles/style.css';
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>

<style>
body{
    font-family: 'Nunito', sans-serif !important;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    background-color: #fff;
}
</style>









