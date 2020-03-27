<template>
  <div>
    
     <v-card class="section1-card mt-4 ml-12 mr-12">
       
       <v-row style="color: rgb(73, 184, 237);" class="loginmain1 "> 
<v-col md="6">
        <h2 > <b>Welcome {{name}} !</b> </h2>
  
  </v-col>
  <v-col md="4">
    <v-card class="loginmain3"  >
     

          <span class="ml-4"  style="padding:0px">
      CHANNELS SELECTED    
          </span>
          <span class="mr-6 float-right">
      VIEW CART      
          </span>
          <br>
          <span class="ml-4" style="padding:0px">
      ALACARTE    
          </span>
      <span class="ml-12">
         BOUQUETS :            
          </span>
          <span class="ml-12">
            TOTAL PRICE 
          </span>
    </v-card>
  </v-col>
  <v-col md="2">
 <v-btn class="ml-auto d-block main-button" color="primary white--text text--lighten-1">Optimize </v-btn>  
  </v-col>
       </v-row>
        </v-card>
    <v-row>
      <v-col>
      <div>
<v-card
          class="mt-8 ml-12"
          color="primary white--text text--lighten-1"
          style="width:610px; margin-left:10px;"
        >
          <v-card-title class="loginmain2 justify-center">Current Active Packs</v-card-title>
          <v-data-table
            hide-default-header
            :headers="columns2"
            :items="verify1"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="my-table elevation-1"
            @page-count="pageCount = $event"
          >
          </v-data-table>
          <hr>
          <v-simple-table >
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
                  >{{ ( (params.totalPrice/100) * 18).toFixed(2) }} /-</th>
                </tr>
                <tr>
                  <th class="text-left" style="color:black;">Total Bill Amount</th>
                  <th
                    class="text-left"
                    style="color:black;"
                  >{{ totalWithGST(params.totalPrice, ( ((params.totalPrice/100) * 18).toFixed(2) ) ) }} /-</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="item in optimizeResultCost"
                        :key="item.name">
                          <td>{{ item.desc }}</td>
                          <td>{{ decimal(item.price) }}</td>
                </tr>-->
              </tbody>
            </template>
          </v-simple-table>
          <!-- <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>-->
        </v-card>
      

      </div>
        
      </v-col>
      <v-col>
        <h3 class="recommended-Packs mt-8 ml-4 mr-4">
          Recommended Packs
          <span class="recommended-Pack-Subtitle">(Optimised pack based on the user’s Current Active Packs ) 
</span>
        </h3>

        <v-card class="ml-4 mr-4 mt-8">
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Channel Name</th>
                    <th class="text-left">Bouquet Name</th>
                    <th class="text-left">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(items,
                                channelIndex) in optimizeResult.bouquets"
                    :key="channelIndex"
                  >
                    <td>{{ items.bouquetName }}</td>
                    <td>{{ items.bouquetDescription }}</td>
                    <td>{{ items.bouquetPrice }}/Month</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <hr>
             <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr v-for="(items,
                                channelInde) in  optimizeResult"
                    :key="channelInde">
                </tr>
                <tr>
                  <th class="text-left" style="color:black;">Content Amount</th>
                  <th class="text-left" style="color:black;">{{ decimal(totalPrice) }} /-</th>
                </tr>
                
                <tr>
                  <th class="text-left" style="color:black;">Total Tax (18% GST)</th>
                  <th
                    class="text-left"
                    style="color:black;"
                  >{{ ( (totalPrice/100) * 18).toFixed(2) }} /-</th>
                </tr>
                <tr>
                  <th class="text-left" style="color:black;">Total Bill Amount</th>
                  <th
                    class="text-left"
                    style="color:black;"
                  >{{ totalWithGST( decimal(totalPrice), ( ((totalPrice/100) * 18).toFixed(2) ) ) }} /-</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="item in optimizeResultCost"
                        :key="item.name">
                          <td>{{ item.desc }}</td>
                          <td>{{ decimal(item.price) }}</td>
                </tr>-->
              </tbody>
            </template>
          </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="main-button mx-auto d-block"
              color="primary white--text text--lighten-1"
              @click="Checkout"
            >Checkout</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              class="main-button mx-auto d-block"
              color="primary white--text text--lighten-1"
              @click="addMoreChannels"
            >Click Here to Add More Channels</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
     
    </v-row>
    <!-- <v-col style="margin-bottom:100px;">
<v-card color="primary white--text text--lighten-1" style="width:600px;">
                <v-card-text>
                 
                </v-card-text>
              </v-card>
    </v-col>-->
  </div>
</template>
<script>
// import _ from "lodash";
import { getOptimizeAlgoritm } from "../services/channel";
// import {create as createService,} from '../services/servicerequest';
export default {
  data() {
    return {
      page: 1,
      pageCount: 1,
      itemsPerPage: 5,
      loading: true,
      columns2: [
        { text: "BouquetName", value: "bouquetname" },
        { text: "price", value: "price" }
      ],
      verify1: this.$route.params.merged,
      params: this.$route.params,
      name: this.$route.params.firstname,
      accountno: this.$route.params.customerno,
      optimizeResult: null,
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
    addMoreChannels(){
this.$router.push({
  name: "addChannel"
})
    },
     decimal(value){
      if(typeof(value) != 'string'){
        return parseFloat(value).toFixed(2)
      } else {
        return value;
      }
    }, 
    totalWithGST(total_channers_price, gst_price) {
      return total_channers_price + parseInt(gst_price);
    },
    async optimizeAlgorithm() {
      this.overlay = true;
      var userData = JSON.parse(localStorage.getItem("in:user"));
      const payload = {
        channelIds: userData.channelIds,
        // channelIds: [1,2,3,4,7,9,15,13,71,311,328,31,44,264,460,197,198,229,27,154,175,265],
        quality: "SD",
        region: userData.region
      };
      const result = await getOptimizeAlgoritm(payload);
      console.log(result.message);
      const data = result.message;
      this.optimizeResult = data;
      this.totalPrice = data.price
      console.log( this.totalPrice)
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
  /* background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%); */
  background: rgb(73, 184, 237);
  background: linear-gradient(
    73deg,
    rgb(241, 241, 241) 27%,
    rgb(211, 211, 211) 100%
  );
}
.loginmain2{
  padding: 10px !important;
  background: rgb(73, 184, 237);
  color:black;
  background: linear-gradient(
    73deg,
    rgb(241, 241, 241) 27%,
    rgb(211, 211, 211) 100%
  );
}
</style>

<style scoped>
.section1-card{
  box-shadow: none !important;
}
.dataTable {
  color: blue;
  font-size: 0px !important;
  height: 15px;
  padding: 0px;
}
</style>