<template>
  <div>
    <h4 v-if="invitations.length == 0">You dont have any invitations yet</h4>

    <v-alert
      v-else
      prominent
      type="success"
      v-for="(notif, i) in invitations"
      :key="i"
    >
      <v-row align="center">
        <v-col class="grow"
          >A new invitation from project :
          <strong>{{ notif.Project.name }}</strong></v-col
        >
        <v-col class="shrink">
          <v-btn color="primary" @click.prevent="acceptInvite(notif.ProjectId)"
            >Accept</v-btn
          >
        </v-col>
        <v-col class="shrink">
          <v-btn color="red" @click.prevent="declineInvite(notif.ProjectId)"
            >Decline</v-btn
          >
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const BASE_URL = 'http://localhost:3000'

export default {
  name: 'Invitation',
  data() {
    return {
      invitations: []
    }
  },
  methods: {
    fetchInvitation() {
      axios
        .get(`${BASE_URL}/projects/user/invitations`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(({ data }) => {
          this.invitations = data
        })
        .catch(({ response }) => {
          const error = response.data.err[0]
          if (response.data.code == 404) {
            this.invitations = []
          }
          console.log(error)
        })
    },
    acceptInvite(id) {
      axios
        .patch(
          `${BASE_URL}/projects/accept/${id}`,
          {},
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(resp => {
          this.fetchInvitation()
          this.$emit('LOAD_PROJECT')
          Swal.fire('Yaay!!', 'Invitation accepted', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    declineInvite(val) {
      this.fetchInvitation()
      return this.$emit('LEAVE_PROJECT', val)
    }
  },
  created() {
    this.fetchInvitation()
  }
}
</script>
