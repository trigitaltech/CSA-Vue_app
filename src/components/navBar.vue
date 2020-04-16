<template>
  <v-app-bar app color="primary white--text text--lighten-1" light>
  <v-toolbar-title class="headline">
      <router-link to="/">
       <v-img style= "margin-left:30px;" class="imagelogin" max-width="50%" src="img/logo1.png"/>
       </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
     <!-- <router-link to="/optimization">
      <v-badge color="red darken-4" left>
        <template v-slot:badge>{{ getCartList.length }}</template>
        <v-icon color="white lighten-1">mdi-cart</v-icon>
      </v-badge>
    </router-link> -->
     <!-- <v-icon color="white lighten-1 ml-3" @click="logout">mdi-logout</v-icon> -->
     <v-icon color="white lighten-1 ml-3" class="ml-4" style="font-size:2rem;" @click="logout">mdi-logout</v-icon>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["setUser"]),
    logout() {
      const user = {
        userName: "",
        password: "",
        region: "",
        customerType: "DP",
        quality: "SD",
        isLogin: false
      };
      this.setUser(user);
      localStorage.removeItem('stb');
      localStorage.removeItem('in:user');
      // localStorage.setItem("in:user", JSON.stringify(user));
      this.$router.push({
        name: "Login"
      });
    }
  },
  computed: {
    ...mapGetters("channel", ["getCartList"]),
    ...mapGetters("auth", ["isUserLogin"])
  }
};
</script>
<style scoped></style>
