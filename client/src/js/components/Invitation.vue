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

export default {
  name: 'Invitation',
  data() {
    return {}
  },
  props: ['invitations'],
  methods: {
    acceptInvite(id) {
      axios
        .patch(
          `${this.$BASE_URL}/projects/accept/${id}`,
          {},
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(resp => {
          this.$emit('FETCH_INVITATIONS')
          this.$emit('LOAD_PROJECT')
          this.$socket.emit('acceptInvite', 'invitation accepted')
          Swal.fire('Yaay!!', 'Invitation accepted', 'success')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    declineInvite(val) {
      this.$emit('FETCH_INVITATIONS')
      this.$emit('LEAVE_PROJECT', val)
    }
  }
}
</script>
