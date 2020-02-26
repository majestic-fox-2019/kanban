<template>
  <b-modal 
    id="modalRegister" 
    title="Register" 
    @ok="onSubmit"
    @hidden="onHide"
   >
    <div class="form-group">
      <label>email</label>
      <input        
        type="text"
        class="form-control"
        placeholder="email"
        v-model="email"
      />
    </div>
    <div class="form-group">
      <label>Password</label>
      <input        
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
      />
    </div>
  </b-modal>
</template>
<script>
export default {
  props: ["backend_url"],
  data: function() {
    return {
        email: "",
        password: ""
    };
  },
  methods: {
    onSubmit: function() {
        console.log(this.backend_url);
        fetch(`${this.backend_url}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: this.email, password: this.password})
        })  
        .then(res => {
          console.log({res});
            // this.getTasks();
        })
        .catch(err => {
            console.log({err});
        })
    },
    onHide: function() {
        this.email = "";
        this.password = "";
    }
  }
};
</script>
<style>
</style>