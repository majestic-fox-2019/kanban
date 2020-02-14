<template>
  <b-modal :id="idName" title="BootstrapVue" hide-footer>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-taskTitle"
        label="Email address:"
        label-for="input-taskTitle"
      >
        <b-form-input
          id="input-taskTitle"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-taskDescription" label="Description" label-for="input-taskDescription">
        <b-form-input
          id="input-taskDescription"
          v-model="form.description"
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "AddTask",
  props: ["idName"],
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
      show: true
    };
  },
  methods: {
      onSubmit(evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.form, null, 2));
        this.$axios({
          url: `${this.$SERVER_URL}/kanbans/`,
          method: "post",
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: this.form
        })
        .then(() => {
          this.$bvModal.hide(this.idName);
          this.$socket.emit("dbChange");
        }).catch((err) => {
          console.error(err);
        });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.title = "";
        this.form.description = "";
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>

<style></style>
