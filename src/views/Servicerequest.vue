<template>
  <div>
    <div class="mt-12 mx-auto" style="max-width:90%;">
      <v-expansion-panels v-model="add">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <i class="fa fa-plus" />Add New Service Request
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              :items="categories"
              label="Ticket Category"
              v-model="category"
              @change="categorySelected"
            />
            <v-select
              :items="subCategories"
              label="Ticket Nature"
              v-model="subCategory"
            />
            <Input
              label="Remarks"
              v-model="form.comments"
              placeholder="Enter Description"
            />
            <v-btn
              rounded
              color="primary"
              @click="handleSubmit"
            >Create</v-btn>
            <v-btn
              text
              color="primary"
              @click="add = false"
            >
              Cancel
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-card max-width="90%" class="mt-4 mx-auto">
      <v-card-title>
        <div class="title">
          My Service Requests
        </div>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="requests"
        :search="search">
        <template slot="item.status" slot-scope="item">
          <div>
            {{
              !item.status ? 'open' : 'closed'
            }}
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :bottom="true"
      :timeout=2000
      :color="color"
    >
      {{ message }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >Close</v-btn>
    </v-snackbar>
  </div>
</template>
<style scoped>
  .title {
    font-size: 1.5rem;
    font-weight: 500;
  }
</style>
// <script>
// import { mapState } from 'vuex';
// // import Input from "@/components/Elements/Input.vue";
// // import {
// //   fetchCategories,
// //   fetchSubCategories,
// //   create as createService,
// //   getMyRequests
// // } from '../../services/serviceRequest';
// export default {
//   components: {
//     Input
//   },
//   data() {
//     return {
//       add: 0,
//       categories: [],
//       category: null,
//       subCategories: [],
//       subCategory: null,
//       form: {
//         comments: ''
//       },
//       requests: [],
//       snackbar: false,
//       message: '',
//       color: '',
//       items: ["Foo", "Bar", "Fizz", "Buzz"],
//       singleSelect: "",
//       desc: "",
//       search: "",
//       headers: [
//         {
//           text: "Ticket Number",
//           align: "left",
//           sortable: true,
//           value: "id"
//         },
//         {
//           text: "Ticket Category",
//           value: "categoryName" },
//         {
//           text: "Ticket Nature ",
//           value: "subCategoryName"
//         },
//         {
//           text: "Comment",
//           value: "comments"
//         },
//         {
//           text: "Status",
//           value: "status"
//         }
//       ],
//       detailed: [
//         {
//           number: 345678,
//           Ticket_Category: "HWR1",
//           Total_Nature: "HRW1234",
//           Status: "open",
//           Date: "22/3/2019"
//         }
//       ]
//     };
//   },
//   computed: {
//     ...mapState('auth', {
//       accountNo: state => state.accountNo,
//     }),
//   },
//   methods: {
//     showMessage(msg, color) {
//       this.message = msg;
//       this.color = color;
//       this.$nextTick(() => {
//         this.snackbar = true;
//       })
//     },
//     clearForm() {
//       this.category = null;
//       this.subCategory = null;
//       this.form = {
//         comments: '',
//       };
//     },
//     async categorySelected() {
//       try{
//         console.log('changed : ', this.category);
//         const subCategoriesResult = await fetchSubCategories(this.category);
//         const { response: { source: subCategories } } = subCategoriesResult;
//         console.log('sub : ', subCategoriesResult);
//         this.subCategories = subCategories.map(c => ({
//           text: c.subCategory,
//           value: c.subCategoryId
//         }));
//       }
//       catch(err) {
//         console.log(err);
//       }
//     },
//     async handleSubmit() {
//       try{
//         const { accountNo, subCategory, form } = this;
//         const result = await createService(accountNo, subCategory, form);
//         console.log('got result : ', result);
//         this.clearForm();
//         this.showMessage('Service request created successfully!', 'success');
//       }
//       catch(err){
//         console.log(err);
//       }
//     }
//   },
//   async mounted() {
//     try {
//       const categoriesResult = await fetchCategories();
//       const { response: { source: categories } } = categoriesResult;
//       // console.log('got categories : ', categories);
//       this.categories = categories.map(c => ({
//         text: c.category,
//         value: c.categoryId
//       }));
//       const myRequestsReult = await getMyRequests(this.accountNo);
//       console.log('my requests : ', myRequestsReult);
//       const { response: { source: { content: requests } } } = myRequestsReult;
//       this.requests = requests;
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }
// };
// </script>