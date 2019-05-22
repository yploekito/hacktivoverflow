<template>
  <div class="container-fluid">
    <div class="row" >
      <div class="col-md-6 col-sm-12 p-4" style='border-right: 1px solid #e2e2e2'>
          <div>
            <h1>{{question.title}}</h1>
            <b-button
              v-if="question.creator._id == userId"
              class="bg-primary m-1"
              @click.prevent="edit"
            >edit</b-button>
            <b-button
              v-if="question.creator._id == userId"
              class="bg-danger"
              @click.prevent="deleteThis"
            >delete</b-button>
            <p class="text-muted" v-if="question.creator">Asked by: {{question.creator.name}}</p>
            <p>
              description:
              <span style='font-size:large' v-html="question.description"></span>
            </p>
            <vote :data="question" :type="'questions'" @updateData="updateData"/>
            <!-- @updateAnswer="updateAnswer" inside eachAnswer-->
            <!-- @delete="afterDeleteAnswer" inside eachAnswer -->
            <b-card v-if="showEdit">
              <formUpdate :index="index" :use="'questions'" @editOff="edit"/>
              <b-button @click.prevent="edit"></b-button>
            </b-card>
          </div>
          <div>
            <b-card v-if="islogin" title="Answer">
              <formPosting :use="'answer'"/>
            </b-card>
          </div>
      </div>
      <div class="col-md-6 col-sm-12" style="height:100vh; overflow:scroll">
        <eachAnswer
          v-for="(answer, index) in answers"
          :key="index"
          :answer="answer"
          :index="index"
        />
        <div
          v-if="zeroAnswer"
          class="m-5 text-muted"
          style="text-align:center"
        >No answer yet! Be the first to answer</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import vote from "@/components/Votes.vue";
import eachAnswer from "@/components/EachAnswer.vue";
import formPosting from "@/components/Form.vue";
import formUpdate from "@/components/FormUpdate.vue";
export default {
  name: "Question",
  data() {
    return {
      //   question: "",
      index: "",
      //   answers: [],
      zeroAnswer: true,
      showEdit: false,
      userId: ""
    };
  },
  watch: {
    answers() {
      if (this.answers.length > 0) {
        this.zeroAnswer = false;
      } else {
        this.zeroAnswer = true;
      }
    }
  },
  components: {
    vote,
    eachAnswer,
    formPosting,
    formUpdate
  },
  computed: {
    answers() {
      return this.$store.state.answers;
    },
    question() {
      return this.$store.state.question;
    },
    islogin() {
      return this.$store.state.islogin;
    }
  },
  methods: {
    edit() {
      this.showEdit = !this.showEdit;
    },
    // newAnswer(data) {
    // //   this.answers.push(data);
    // this.$store.commit('newAnswer', data)
    // },
    updateData(data) {
      //   this.question = data;
      this.$store.commit("setQuestion", data);
    },
    // updateAnswer(data) {
    //   console.log("answerupdated");
    //   this.$store.commit('updateAnswer', data)
    // //   this.$set(this.answers, data.index, data.data);
    // },
    // afterDeleteAnswer(data) {
    //     //cannot auto update after deletion of an element within an array
    //   this.fetchAnswers();
    // }
    deleteThis(){
      let questionId = this.$route.params.questionId
      this.$store.dispatch('deleteQuestion', questionId)
      this.$router.push('/')

    }
  },
  created() {
    console.log(this.$route.params);
    this.$store.dispatch("getQuestion", this.$route.params.questionId);
    this.$store.dispatch("getAnswers", this.$route.params.questionId);
    // this.vote = this.question.upvotes.length - this.question.downvotes.length
    this.userId = localStorage.getItem("id");
  }
};
</script>