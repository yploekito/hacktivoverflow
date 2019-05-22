<template>
  <div>
    <div>
      <b-card v-if='!showEdit ' :title="answer.title" :sub-title="answer.creator.name">
        <b-card-text><span v-html='answer.description'></span></b-card-text>
        <!-- @updateData="updateData" inside vote-->
        <vote :data="answer" :type="'answers'" @updateData="updateData"/>
        <b-button
          v-show="answer.creator._id == userId "
          class="bg-danger"
          @click.prevent="deleteThis"
        >delete</b-button>
        <b-button
          v-show="answer.creator._id == userId "
          class="bg-primary"
          @click.prevent="edit"
        >edit</b-button>
      </b-card>
      <b-card v-if='showEdit' >
            <formUpdate :index='index' :use='"answers"' @editOff='edit'/>
            <b-button @click.prevent='edit'>Cancel</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import vote from "@/components/Votes.vue";
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");
import formPosting from "@/components/Form.vue"
import formUpdate from "@/components/FormUpdate.vue"

export default {
  name: "eachAnswer",
  props: ["index"],
  computed: {
    answer() {
      return this.$store.state.answers[this.index];
    }
  },
  data() {
    return {
      userId: "",
      showEdit:false
    };
  },
  components: {
    vote,
    formUpdate
  },
  methods: {
    deleteThis() {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.questionId
      };
      this.$store.dispatch("deleteAnswer", payload);
      //   api
      //     .delete(`/answers/${this.answer._id}`)
      //     .then(({data})=>{
      //         let payload = {data:{}, index:this.index}
      //         this.$emit('delete', payload)
      //         console.log(data)
      //     })
      //     .catch(err=>{
      //         console.log(err)
      //     })
    },
    edit(){
        this.showEdit = !this.showEdit
    },
    updateData(data) {
      let payload = {
        data,
        index: this.index
      };
      this.$store.commit("updateAnswer", payload);
    }
  },
  created() {
    this.userId = localStorage.getItem("id");
  }
};
</script>