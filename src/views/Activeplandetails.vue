<template>
  <v-container fluid>
    <v-row class="mx-md-12">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-col class="col-md-12 col-lg-12 col-12" >
        <v-card flat >
          <v-row class="px-2" style="color: rgb(73, 184, 237);">
            <v-col class="col-md-6 col-lg-6 col-12" >
              <h2>
                <b>Welcome {{ name }} !</b>
              </h2>
            </v-col>
            <v-col class="col-md-4 col-lg-4 col-12">
              <!-- <div class="header-detail">
                <div class="d-flex w-100 justify-space-between">
                  <span class>Channels Selected : 334</span>
                  <span class>Bouquets : 44</span>
                  <span>View Cart : 353</span>
                </div>
                <div class="d-flex w-100 justify-space-between">
                  <span class>Alacarte : 32</span>
                  <span class>Total Price : 1034</span>
                </div>
              </div>-->
            </v-col>
            <v-col class="col-md-2 col-lg-2 col-12 d-flex align-center">
              <!-- <v-btn
                class="ml-md-auto ml-lg-auto mx-sml-auto d-block main-button"
                color="primary white--text text--lighten-1"
              >Optimize</v-btn>-->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="col-md-12 col-lg-12 col-12" >
        <v-row>
          <v-col class="col-md-6 col-lg-6 col-12" style="margin-top:10px;">
            <v-card color="primary white--text text--lighten-1">
              <v-card-title class="loginmain2 justify-center">Current Active Packs</v-card-title>
              <v-data-table
                :headers="columns2"
                :items="verify1"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="my-table"
                @page-count="pageCount = $event"
              ></v-data-table>
              <hr />
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left" style="color:black;">Content Amount</th>
                      <th class="text-left" style="color:black;">{{ params.totalPrice }} /-</th>
                    </tr>
                    <tr>
                      <th class="text-left" style="color:black;">Total Tax (18% GST)</th>
                      <th
                        class="text-left"
                        style="color:black;"
                      >{{ ((params.totalPrice / 100) * 18).toFixed(2) }} /-</th>
                    </tr>
                    <tr>
                      <th class="text-left" style="color:black;">Total Bill Amount</th>
                      <th class="text-left" style="color:black;">
                        {{
                        totalWithGST(
                        params.totalPrice,
                        ((params.totalPrice / 100) * 18).toFixed(2)
                        )
                        }}
                        /-
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
          <v-col class="col-md-6 col-lg-6 col-12">
            <v-card class="mt-3" >
               <v-card-title class="loginmain2 justify-center" style="font-size:18px">
              Recommended Packs
              
              (Optimised pack based on the user’s Current Active Packs)
            </v-card-title>
              <v-card-text>
                 
              <v-data-table
                :headers="columns3"
                :items="this.optimizeResult"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
                class="my-table"
                @page-count="pageCount = $event"
              ></v-data-table>
              <hr />
                <!-- <v-simple-table>
                  <template v-slot:default>
                    <div v-if="optimizeResult && optimizeResult.bouquets">
                      <thead>
                        <tr class="recommended-Packs text-color-080851">
                          <th class="text-left">Bouquet Channel Name</th>
                          <- <th class="text-left">Bouquet Name</th> -->
                          <!-- <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(items,
                          channelIndex) in optimizeResult.bouquets"
                          :key="channelIndex"
                        >
                          <td>{{ items.bouquetName }}</td>
                          <- <td>{{ items.bouquetDescription }}</td> -->
                          <!-- <td>{{ items.bouquetPrice }}/Month</td>
                        </tr>
                      </tbody>
                    </div>
                  </template>
                </v-simple-table> --> 
                <hr />
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr v-for="(items, channelInde) in optimizeResult" :key="channelInde"></tr>
                      <tr>
                        <th class="text-left" style="color:black;">Content Amount</th>
                        <th class="text-left" style="color:black;">{{ decimal(totalPrice) }} /-</th>
                      </tr>

                      <tr>
                        <th class="text-left" style="color:black;">Total Tax (18% GST)</th>
                        <th
                          class="text-left"
                          style="color:black;"
                        >{{ ((totalPrice / 100) * 18).toFixed(2) }} /-</th>
                      </tr>
                      <tr>
                        <th class="text-left" style="color:black;">Total Bill Amount</th>
                        <th class="text-left" style="color:black;">
                          {{
                          totalWithGST(
                          parseFloat(decimal(totalPrice)),
                          ((totalPrice / 100) * 18).toFixed(2)
                          )
                          }}
                          /-
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
            <div class="d-md-flex d-lg-flex justify-space-between">
              <v-card-actions>
                <v-btn
                  class="main-button w-sm-100 d-block"
                  color="primary white--text text--lighten-1"
                  @click="addMoreChannels"
                >Click Here to Add More Channels</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  class="main-button w-sm-100 d-block"
                  color="primary white--text text--lighten-1"
                  @click="Checkout"
                >Checkout</v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import _ from "lodash";
import { getOptimizeAlgoritm } from "../services/channel";
// import {create as createService,} from '../services/servicerequest';
export default {
  data() {
    return {
      overlay: true,
      page: 1,
      pageCount: 1,
      itemsPerPage: 5,
      loading: true,
      totalPrice: 0,
      columns2: [
        { text: "BouquetName", value: "bouquetname" },
        { text: "price", value: "price" }
      ],
       columns3: [
        { text: "BouquetName", value: "bouquetDescription" },
        { text: "price", value: "bouquetPrice"}
      ],
      
      verify1: this.$route.params.merged,
      params: this.$route.params,
      name: this.$route.params.firstname,
      accountno: this.$route.params.customerno,
      // optimizeResult:this.optimizeResult,
      optimizeResultCost: [
        {
          desc: "Content Amount",
          qty: null,
          price: "₹ 130"
        },
        {
          desc: "Content Amount",
          qty: null,
          price: "₹ 130"
        },
        {
          desc: "GST(18%)",
          qty: null,
          price: 0
        },
        {
          desc: "Total (Monthly)",
          qty: null,
          price: 0
        }
      ],
      payChannel: []
    };
  },
  methods: {
    addMoreChannels() {
      this.$router.push({ name: "addChannel" });
    },
    decimal(value) {
      if (typeof value != "string") {
        return parseFloat(value).toFixed(2);
      } else {
        return value;
      }
    },
    Checkout() {
      // not defined error
    },
    totalWithGST(total_channers_price, gst_price) {
      return total_channers_price + parseInt(gst_price);
    },
    async optimizeAlgorithm() {
      this.overlay = true;
      var userData = JSON.parse(localStorage.getItem("in:user"));
      const payload = {
        channelIds: userData.channelIds,
        quality: userData.quality,
        region: userData.region
      };
      const result = await getOptimizeAlgoritm(payload);
      if (result.statusCode === 200) {
        console.log(result.message);
        const data = result.message;
        this.optimizeResult = data.bouquets;
        console.log(this.optimizeResult)
        this.totalPrice = data.price;
        this.overlay = false;
      } else {
        this.overlay = false;
      }

      /*eslint no-console: "off"*/
      // var bouquetId = result.response.data.bouquets.bouquetId
      // if (data) {
      //   this.optimizeResult = { ...data };
      //   const channelsPrice = _.sumBy(data.channels, "price");
      //   const bouquetsPrice = _.sumBy(data.bouquets, "bouquetPrice");
      //   console.log(this.optimizeResult)
      //   this.optimizeResultCost[1].price = channelsPrice; // No. of Pay Channels
      //   this.optimizeResultCost[1].qty = data.channels.length; // No. of Pay Channels
      //   this.optimizeResultCost[2].price = bouquetsPrice; // No. of Bouquet
      //   this.optimizeResultCost[2].qty = data.bouquets.length; // No. of Bouquet
      //   this.optimizeResultCost[3].qty = 25 + data.channels.length; // Total No. of unique Channels
      //   this.optimizeResultCost[3].price = channelsPrice; // Total No. of unique Channels
      //   this.optimizeResultCost[4].qty = null // data.bouquets.length + this.optimizeResultCost[3].qty; // Price(Channel+Bouquet)
      //   this.optimizeResultCost[4].price = channelsPrice + bouquetsPrice; // Price(Channel+Bouquet)
      //   this.optimizeResultCost[5].price = 130; // Network Capacity Fees
      //   this.optimizeResultCost[6].price = ((this.optimizeResultCost[5].price + this.optimizeResultCost[4].price) * 18) / 100;
      //   this.optimizeResultCost[7].price = this.optimizeResultCost[6].price + this.optimizeResultCost[5].price +  + this.optimizeResultCost[4 ].price;
      // }
    }
  },
  // computed: {
  //   getCart() {
  //     return this.$store.getters["channel/getCartList"];
  //   },
  async mounted() {
    this.optimizeAlgorithm();
    console.log("3333333333");
  }
};
</script>
<style>
.loginmain1 {
  background: rgb(73, 184, 237);
  background: linear-gradient(
    73deg,
    rgb(241, 241, 241) 27%,
    rgb(211, 211, 211) 100%
  );
}
.loginmain2 {
  padding: 10px !important;
  color: #fff;
  font-weight: 600;
  /* background: linear-gradient(
    73deg,
    rgb(241, 241, 241) 27%,
    rgb(211, 211, 211) 100%
  ); */
  background: linear-gradient(
    13deg,
    rgba(73, 184, 237, 1) 0%,
    rgba(133, 50, 142, 1) 57%,
    rgba(147, 58, 148, 1) 93%,
    rgba(150, 60, 149, 1) 96%,
    rgba(153, 62, 150, 1) 100%
  );
}
</style>

<style scoped>
.section1-card {
  box-shadow: none !important;
}
.dataTable {
  color: #080851;
  font-size: 0px !important;
  height: 15px;
  padding: 0px;
}
.text-color-080851 {
  color: #080851;
}
.header-detail {
  padding: 2px 10px;
  text-transform: capitalize;
  border: 1px solid #aba9a9;
  color: #676666;
  border-radius: 4px;
}
.theme--light.v-data-table thead tr:last-child th {
  border-bottom: none !important;
}
</style>
