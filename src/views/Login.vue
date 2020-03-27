<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="ml-12">
           <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="loginmain elevation-4">
            <v-card-title class="mb-5 justify-center" style="color:white"><h2>Customer Verification</h2>
            </v-card-title>
            <h3 style="color:white;margin-left:230px;margin-bottom:30px;">For Registered Indigital / Nxtdigital Customers</h3>
            <v-text-field
            style="background:white"
              class="ml-5 mr-5"
              v-model="form.stb"
              
              label="Enter STB Serial Number / Customer ID"
              :placeholder="customer"
              required
            ></v-text-field>          
              <v-text-field
            style="background:white"
              class="ml-5 mr-5"
              v-model="form.Number"
              label="Enter Mobile Number"
              :placeholder="customer"
              required
            ></v-text-field>          
        </v-card>
        <v-btn
                class="main-button mt-8 mx-auto d-block"
                color="primary white--text text--lighten-1"
                @click="handleSubmit"
              >Enter</v-btn>
              </v-form>
      </v-col>
      <v-col style="font-size:16px;" class="mr-12">
        <div>
          <ul>
            <li>
              <p>
                Hi Subscribers…This Application will help you optimize the selection of your choice of channels and also inform you about the MRP (Maximum Retail Price) of your selection.
                You can select or deselect channels as per your wish.
              </p>
            </li>
            <br>
            <li>
              <p>This is similar to a shopping cart in your online shopping experience.</p>
            </li><br>
            <li>
              <p>After selecting all channels of your choice (pay channels, Bouquets of pay channels), view your selected channels by pressing tab “view your selection”.</p>
            </li><br>
          </ul>
        </div>
      </v-col>
    </v-row>
    <div style="margin-left:40px;">
    <h1>For Non Registered Indigital / Nxtdigital Customers --- <a href="#/Guest">Clickhere</a></h1>
    </div>
   <v-row style="margin-left:1000px;">
        <v-btn
                class="main-button mt-8 mx-auto d-block"
                color="primary white--text text--lighten-1"
                @click="handleSubmit"
              >Quickpay</v-btn>
               <v-btn
                class="main-button mt-8 mx-auto d-block"
                color="primary white--text text--lighten-1"
                @click="handleSubmit"
              >CustomerSupport</v-btn>
   </v-row>
  </v-container>
</template>
<script>
import { extractError } from "../services/error";
import { verify } from "../services/verify";
// import { getOptimizeAlgoritm } from "../services/channel";
export default {
  data() {
    return {
      form: {
        stb: ""
      }
    };
  },
   props: {
    value: [String, Number],
    trim: {
      type: Boolean,
      default: true
    }
  },
  valid: true,
  methods: {
    onInput(event) {
      const value = event.target.value;
      this.$emit('input', this.trim ? value.trim() : value);
    },
    onChange(event) {
      const value = event.target.value;
      this.$emit('change', this.trim ? value.trim() : value);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    async handleSubmit() {
      try {
        const hasError = this.validate();
        if (hasError) {
          this.$toasted.error(hasError, {
            duration: 2000
          });
          return;
        }
        const { form, ...payload } = this.form;
        const result = await verify({ stb: this.form.stb });
        localStorage.setItem("stb", JSON.stringify(result.response));
        const customerno = result.response.user.customerinfo.customerno;
        const firstname = result.response.user.customerinfo.firstname;
        const region = result.response.region;
        const cInfo = result.response.user.customerinfo;
        const {
          response: { "active-plans": activePlans }
        } = result;
        this.activePlans = result.response.activePlans;
        const info = activePlans.map(function(plan) {
          return {
            channelId: plan.plan_CODE,
            bouquetname: plan.plan_DESC,
            price: plan.totalPlanPrice
          };
        });
        const channelObj = activePlans.map(function(plan) {
          return plan.bouquet.channels.map(function(item) {
            return { channelId: item.id };
          });
        });
        var merged = [].concat.apply([], info);
        var channerOBJS = [].concat.apply([], channelObj);
        console.log(merged);
        let channerIDS = channerOBJS.map(a => a.channelId);
        // let result2 = merged.map(a => a.price)
        let bkt_prices = result.response["active-plans"].map(
          plan => plan.totalPlanPrice
        );
        let totalPrice = bkt_prices.reduce((a, price) => a + price, 0); // Total bucket price
        let resActivePlans = result.response["active-plans"]; //.map(plan => plan.totalPlanPrice)
        var user = {
          channelIds: channerIDS,
          // price:result2,
          price: bkt_prices,
          region: result.response.region,
          quality: "SD",
          customerType: "DP",
          isLogin: false,
          totalPrice: totalPrice
        };
        console.log(user);
        localStorage.setItem("in:user", JSON.stringify(user));
        payload[form] = true;
        this.$router.push({
          name: "Activeplandetails",
          params: {
            customerno,
            firstname,
            merged,
            cInfo,
            region,
            totalPrice,
            resActivePlans
          }
        });
      } catch (err) {
        const message = extractError(err);
        this.$showError(message);
      }
    }
  }
};
</script>
<style>
.loginmain {
  /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
  padding: 20px 10px !important;
  color: rgb(255, 255, 255);
  background: rgb(73, 184, 237);
  background: linear-gradient(
    13deg,
    rgba(73, 184, 237, 1) 0%,
    rgba(133, 50, 142, 1) 57%,
    rgba(147, 58, 148, 1) 93%,
    rgba(150, 60, 149, 1) 96%,
    rgba(153, 62, 150, 1) 100%
  );
}
/* default theme for entire application */

.v-application .primary {
  /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);   */

  background: rgb(73, 184, 237);
  background: linear-gradient(
    13deg,
    rgba(73, 184, 237, 1) 0%,
    rgba(133, 50, 142, 1) 57%,
    rgba(147, 58, 148, 1) 93%,
    rgba(150, 60, 149, 1) 96%,
    rgba(153, 62, 150, 1) 100%
  );
}

/* main button used  */

.main-button {
  padding: 4px 15px !important;
  border-radius: 2px;
}
div {
  font-family: "Nunito", sans-serif !important ;
}
</style>
