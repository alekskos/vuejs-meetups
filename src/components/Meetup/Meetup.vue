<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="warning--text"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3" v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3 class="headline primary--text">{{ meetup.title }}</h3>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="50vh"
          ></v-card-media>
          <v-card-text>
            <h5 class="title warning--text">
              {{ meetup.date | date }} &mdash; {{ meetup.location }}
            </h5>
            <p class="body-1 mt-3">{{ meetup.description }}</p>
          </v-card-text>
          <v-card-actions v-if="!userIsCreator">
            <v-spacer></v-spacer>
            <v-btn class="error">Регистрация</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
