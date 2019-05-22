import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.js'
import router from '@/router.js'

api.defaults.headers.common['token'] = localStorage.getItem('token')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin:false,
    name: '',
    id: '',
    questions: [],
    answers: [],
    question :''
  },
  mutations: {
    loggedIn(state, payload){
      state.islogin = true
    },
    logout(state){
      state.id = '',
      state.name = ''
      state.islogin = false
    },
    setQuestions(state, payload){
      state.questions = payload
    },
    setAnswers(state, payload){
      state.answers = payload
    },
    setQuestion(state, payload){
      state.question = payload
    },
    updateAnswer(state, payload){
      Vue.set(state.answers, payload.index, payload.data)
    },
    newAnswer(state, payload){
      state.answers.push(payload)
    },
    newQuestion(state, payload){
      state.questions.push(payload)
    },
    deleteQuestion(state){
      state.question = ''
    }
  },
  actions: {
    getQuestions(context){
      api
      .get('questions')
      .then(({data})=>{
        context.commit('setQuestions', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getQuestion(context, payload){
      api
        .get(`/questions/${payload}`)
        .then(({ data }) => {
          context.commit('setQuestion', data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAnswers(context, payload){
      api
        .get(`/answers/${payload}`)
        .then(({ data }) => {
          context.commit('setAnswers', data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAnswer(context, payload){
      // payload.answerId is ${this.answer._id}
      // payload.questionId is ${this.$route.params.questionId}
      // payload.index is ${this.index}
      api
        .delete(`/answers/${payload.answerId}`)
        .then(({data})=>{
            // let payload = {data:{}, index:this.index}
            context.dispatch('setAnswers', payload.questionId)
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    deleteQuestion(context, payload){
      // payload.answerId is ${this.answer._id}
      // payload.questionId is ${this.$route.params.questionId}
      // payload.index is ${this.index}
      api
        .delete(`/questions/${payload}`)
        .then(({data})=>{
            // let payload = {data:{}, index:this.index}
            context.commit('deleteQuestion')
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    newQuestion(context, payload){
      api
          .post("/questions", {
            title: payload.title,
            description: payload.description
          })
          .then(({ data }) => {
            console.log(data);
            context.commit('newQuestion', data)
          })
          .catch(err => {
            console.log(err);
          });
    },
    newAnswer(context, payload){
      api
          .post(`/answers/${payload.questionId}`, {
            title: payload.title,
            description: payload.description
          })
          .then(({ data }) => {
            context.commit('newAnswer', data)
          })
          .catch(err => {
            console.log(err);
          });
    },
    // upvote(context,payload){
    //   api
    //       .patch(`${payload.type}/upvote/${payload.dataId}`)
    //       .then(({ data }) => {
    //         if(payload.type === 'answers'){

    //           context.commit("updateAnswer", data);

    //         }
    //         //   this.question = data;
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    // }
    updateQuestion(context,payload){
      api
      .patch(`questions/${payload.questoinId}`, payload.question)
      .then(({data})=>{
        // console.log(data)
        context.commit("setQuestion", data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    updateAnswer(context,payload){
      api
      .patch(`answers/${payload.answerId}`, payload.answer)
      .then(({data})=>{
        // console.log(data)
        context.commit("updateAnswer", {
          index: payload.index,
          data: data
        });
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
})
