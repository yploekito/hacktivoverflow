<template>
  <div class='p-2'>
    <i class="fas fa-star"></i>: {{vote}}
    <b-button @click.prevent="upvote" v-if="!upvoted" style="background-color:black"><i class="fas fa-chevron-up"></i></b-button>
    <b-button @click.prevent="netral" v-else-if="upvoted"><i class="fas fa-chevron-up"></i></b-button>
    <b-button @click.prevent="downvote" v-if="!downvoted" style="background-color:black"><i class="fas fa-chevron-down"></i></b-button>
    <b-button @click.prevent="netral" v-else-if="downvoted"><i class="fas fa-chevron-down"></i></b-button>
  </div>
</template>
<script>
import api from "@/api/api.js";
api.defaults.headers.common["token"] = localStorage.getItem("token");

export default {
  name: "votes",
  props: ["data", "type"],
  data() {
    return {
      upvoted: false,
      downvoted: false,
      vote: ""
    };
  },
  watch: {
    data() {
      this.getVote();
    }
  },
  methods: {
    getVote() {
        if (this.data.upvotes.includes(localStorage.getItem("id"))) {
          this.upvoted = true;
          this.downvoted = false;
        } else if (this.data.downvotes.includes(localStorage.getItem("id"))) {
          this.downvoted = true;
          this.upvoted = false;
        } else {
          this.downvoted = false;
          this.upvoted = false;
        }
        // console.log(this.data)
        this.vote = this.data.upvotes.length - this.data.downvotes.length;
    },
    upvote() {
        api
          .patch(`${this.type}/upvote/${this.data._id}`)
          .then(({ data }) => {
            this.$emit("updateData", data);
            //   this.question = data;
          })
          .catch(err => {
            console.log(err);
          });
    },
    downvote() {
        api
          .patch(`${this.type}/downvote/${this.data._id}`)
          .then(({ data }) => {
            //   this.question = data;
            this.$emit("updateData", data);
          })
          .catch(err => {
            console.log(err);
          });
    },
    netral() {
        api
          .patch(
            `${this.type}/removeUpvoteOrDownvote/${this.data._id}`
          )
          .then(({ data }) => {
            this.$emit("updateData", data);
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  created(){
    if(this.data){
      this.getVote()
    }
  }
};
</script>