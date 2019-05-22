<template>
  <div class="container" style="color:white">
    <formPosting :use='"question"'/>
  </div>
</template>


<script>
import api from "@/api/api.js";
api.defaults.headers.common['token'] = localStorage.getItem('token')
import formPosting from '@/components/Form.vue'
export default {
  name: "AskQuestion",
  components:{
      formPosting
  }
};
</script>