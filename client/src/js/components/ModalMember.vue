<template>
  <div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Project Members</v-card-title>
        <v-card-text>
          <h3 v-for="(member, i) in projectMembers" :key="i">
            {{ member.email }}
          </h3>
        </v-card-text>
        <v-text-field
          v-if="invite"
          v-model="email"
          type="text"
          label="Title"
          style="padding: 20px;"
        ></v-text-field>
        <v-btn color="green darken-1" text @click.prevent="close">
          Close
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click.prevent="sendInvite"
          v-if="invite"
        >
          Invite
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'modalMembers',
  data() {
    return {
      email: null
    }
  },
  props: ['projectMembers', 'dialog', 'invite'],
  methods: {
    sendInvite() {
      return this.$emit('sendInvite', this.email)
    },
    close() {
        return this.$emit('CLOSE_MODAL')
    }
  }
}
</script>

<style lang="css" scoped></style>
