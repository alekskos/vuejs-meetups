<template>
  <v-dialog width="20em" v-model="editDialog">
    <v-btn accent slot="activator">
      Редактировать дату
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Редактировать дату события</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker
              v-model="editableDate"
              style="width: 100%;"
              actions
              locale="ru-RU"
              tabindex="0">
              <template slot-scope="{save, cancel}">
                <v-card-action>
                  <v-btn
                    class="red--text darken-1"
                    flat
                    @click="editDialog = false">Закрыть</v-btn>
                  <v-btn
                    class="blue--text darken-1"
                    flat
                    @click="onSaveChanges">Сохранить</v-btn>
                </v-card-action>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      meetup: Object
    },
    data () {
      return {
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableDate = new Date(this.meetup.date)
    }
  }
</script>
