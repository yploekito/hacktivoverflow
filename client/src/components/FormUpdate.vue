<template>
  <div>
    <div v-if="use == 'questions' ">
      <b-form @submit.prevent="postQuestion" style="color:black">
        <b-form-group label="Title" label-for="title">
          <b-form-input id="title" v-model="question.title"/>
        </b-form-group>
        <vue-editor style="background-color:white" id="editor" v-model="question.description"></vue-editor>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div v-else-if="use == 'answers' ">
      <b-form @submit.prevent="postQuestion" style="color:black">
        <b-form-group label="Title" label-for="title">
          <b-form-input id="title" v-model="answer.title"/>
        </b-form-group>
        <vue-editor style="background-color:white" id="editor" v-model="answer.description"></vue-editor>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import api from "@/api/api.js"
api.defaults.headers.common['token'] = localStorage.getItem('token')

export default {
  name: "formUpdate",
  props: ["index", "use"],
  components: {
    VueEditor
  },
  computed: {
    question: {
      get() {
        return this.$store.state.question;
      },
      set(value) {
        return this.$store.commit("setQuestion", value);
      }
    },
    answer: {
      get() {
        return this.$store.state.answers[this.index];
      },
      set(value) {
        return this.$store.commit("updateAnswer", {
          index: this.index,
          data: value
        });
      }
    }
  },
  methods: {
    postQuestion() {
      if (this.use === "questions") {
        console.log(this.question.title)
        // let payload = {
        //   title: this.question.title,
        //   description: this.question.description
        // };
        // this.$store.commit("setQuestion", this.question);
        let questionId = this.$route.params.id
        // api
        //   .patch(`questions/${questionId}`)
        //   .then(({data})=>{
        //     console.log(data)
        //   })
        //   .catch(err=>{
        //     console.log(err)
        //   })
        this.$store.dispatch('updateQuestion', {question:this.question, questionId})
        this.$emit("editOff");

        // // this.$store.dispatch('newQuestion',{
        // //     title:this.title,
        // //     description:this.description
        // // })
      } else if (this.use === "answers") {
        // let payload = {
        //   index: this.index,
        //   title: this.question.title,
        //   description: this.question.description
        // };
        // return this.$store.commit("updateAnswer", payload);
        console.log(this.answer)
        let answerId = this.answer._id
        this.$store.dispatch('updateAnswer', {answerId, answer:this.answer, index:this.index})
        // api
        //   .patch(`answers/${answerId}`, this.answer)
        //   .then(({data})=>{
        //     console.log(data)
        //   })
        //   .catch(err=>{
        //     console.log(err)
        //   })
        this.$emit("editOff");
        // this.$store.dispatch(`newAnswer`, {
        //     questionId: this.$route.params.questionId,
        //     title:this.title,
        //     description:this.description})
      }
      // this.title = "";
      // this.description = "";
    }
  }
};
</script>