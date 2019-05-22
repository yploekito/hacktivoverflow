<template>
  <div @click='toCurrentQuestion'>
    <b-card  v-if='this.question.creator' >
      <b-card-text>
        <h5>{{question.title}}</h5>
        <p class='text-muted'>Asked by: {{question.creator.name}} || score: {{vote}}  </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
    props:['question'],
    computed:{
        vote(){
            return this.question.upvotes.length - this.question.downvotes.length
        }
    },
    methods:{
      toCurrentQuestion(){
        this.$router.push(`/question/${this.question._id}`)
      }
    }
};
</script>