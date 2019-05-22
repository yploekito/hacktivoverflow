<template>
  <b-form @submit.prevent="postQuestion" style='color:black'>
    <b-form-group label="Title" label-for="title">
      <b-form-input id="title" v-model="title"/>
    </b-form-group>
    <vue-editor
      style='background-color:white'
      id="editor"
      v-model="description"
    ></vue-editor>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import { VueEditor } from "vue2-editor";

export default {
  name: "formPosting",
  props: ["use", "index"],
  data() {
    return {
      title: "",
      //    content: '<h1>Some initial content</h1>'

      description: "Type here..."
    };
  },
  components: {
    VueEditor
  },
  methods: {
    postQuestion() {
      if (this.use === "question") {
          this.$store.dispatch('newQuestion',{
              title:this.title,
              description:this.description
              
          })
      } else if (this.use === "answer") {
        this.$store.dispatch(`newAnswer`, {
            questionId: this.$route.params.questionId,
            title:this.title,
            description:this.description})
      }
      this.title = "";
      this.description = "";
    }
  },
//   created(){
//       if(this.index){
//           console.log(this.index)
//           this.title = data.title
//           this.description = data.description
//       }
  
};
</script>
