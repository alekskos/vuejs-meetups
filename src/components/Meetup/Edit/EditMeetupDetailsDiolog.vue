<template>
  <v-dialog width="30em" v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Редактировать событие</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                label="Заголовок"
                id="title"
                v-model="editedTitle"
                required>
              </v-text-field>
              <v-text-field
                name="location"
                label="Место проведения"
                id="location"
                v-model="editedLocation"
                required>
              </v-text-field>
              <v-text-field
                name="description"
                label="Описание"
                id="description"
                multi-line
                v-model="editedDescription"
                required>
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="red--text darken-1"
                @click="editDialog = !editDialog"
                tabindex="0">Закрыть</v-btn>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="onSaveChanges"
                tabindex="0">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedLocation: this.meetup.location
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' || this.editedLocation.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription,
          location: this.editedLocation
        })
      }
    }
  }
</script>
<style scoped>
  /**:focus {*/
    /*outline: 2px solid DodgerBlue;*/
    /*outline-offset: -1px;*/
  /*}*/
</style>
