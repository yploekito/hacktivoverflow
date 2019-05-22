<template>
  <div class="home">
    <div class="container">
      <div class="mt-5 row">
        <h2 class='mx-4'>Questions</h2>
      <b-form-input class='col-sm-8' v-model='search' placeholder="search"></b-form-input>
      </div>
      <div v-for="(question, index) in filteredQuestions" :key="index">
        <EachQuestion :question="question" :index="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EachQuestion from "@/components/EachQuestion.vue";
import api from "@/api/api.js";

export default {
  name: "home",
  data(){
    return {
      search : ''
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    filteredQuestions() {
      if (this.search) {
        let result = [];
        result = this.questions.filter(item => {
          return item.title.toLowerCase().includes(this.search.toLowerCase());
        });
        if (result.length === 0) {
          return this.questions;
        } else {
          return result;
        }
      } else {
        return this.questions;
      }
    }
  },
  components: {
    EachQuestion
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
