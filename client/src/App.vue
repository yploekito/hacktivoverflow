<template>
  <div>
      <b-navbar id="nav" class="p-3" sticky >
        <b-col class="d-flex">
          <router-link to="/" class="px-4">Home</router-link>
          <router-link to="/postQuestion" class="px-4" v-if='islogin'>Ask Question</router-link>
        </b-col>
        <b-col class="d-flex justify-content-center">
          <div style='color:green'><h3><b>flowOver</b><i>Hacktiv</i></h3></div>
        </b-col>
        <b-col class="d-flex flex-row justify-content-end">
          <a class="px-4" @click="$bvModal.show('login-modal')" href="#" v-if="!islogin">
            <div v-if="!register">login</div>
            <div v-else>register</div>
          </a>
          <a class="px-4" href="#" v-else @click.prevent="logout">logout</a>
        </b-col>
      </b-navbar>
    <router-view/>
    <b-modal id="login-modal" hide-footer>
      <template slot="modal-title">Login Here</template>
      <div class="d-block text-center">
        <div>
          <b-form @submit.prevent="submit">
            <b-form-group id="name" label="Your Name:" label-for="name" v-if="register">
              <b-form-input id="input-name" v-model="name" required placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Password:" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
          <a href="#" v-if="!register" @click.prevent="toRegister(true)">no account yet? click here</a>
          <a
            href="#"
            v-if="register"
            @click.prevent="toRegister(false)"
          >already have an account? click here</a>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "app",
  data() {
    return {
      // islogin: false,
      email: "",
      password: "",
      name: "",
      register: false
    };
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  },
  watch:{
    islogin(){
      if(this.islogin === false){
        this.$router.push('/')
      }
    }
  },
  methods: {
    submit() {
      if (this.register) {
        console.log(this.password);
        api
          .post("/signup", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(({ data }) => {
            console.log("registered");
            this.register = false
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .post("/signin", { email: this.email, password: this.password })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("id", data.data._id)
            this.$bvModal.hide("login-modal");
            this.$store.commit("loggedIn");
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.email = "";
      this.name = "";
      this.password = "";
    },
    toRegister(data) {
      this.register = data;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id")
      this.$store.commit("logout");
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("loggedIn");
    }
  }
};
</script>

