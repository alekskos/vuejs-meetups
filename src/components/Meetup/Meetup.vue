<template>
  <v-container>
    <v-layout row wrap class="mt-3">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="50vh"
          ></v-card-media>
          <v-card-text>
            <h6 class="warning--text">{{ meetup.date | date }} &mdash; {{meetup.location}}</h6>
            <div>{{ meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
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
      }
    }
  }
</script>
