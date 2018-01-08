<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h3>Добавить новую встречу</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex>
              <v-text-field
                name="title"
                label="Название мероприятия"
                id="title"
                v-model="title"
                aria-describedby="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field
                name="location"
                label="Место проведения"
                id="location"
                v-model="location"
                aria-describedby="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-btn raised class="primary" @click="onPickFile">Загрузить изображение</v-btn>
              <input
                type="file"
                class="hidden-lg-and-down"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <img :src="imageUrl" height="200">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex>
              <v-text-field
                name="description"
                label="Описание"
                id="description"
                multi-line
                v-model="description"
                aria-describedby="description"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-4">
            <v-flex xs12 sm8 offset-sm2>
              <h4>Выберите дату и время</h4>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="md-5 mb-4">
            <v-flex md6 lg6>
              <v-date-picker
                v-model="date"
                id="date"
                aria-describedby="date"
                landscape></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-4">
            <v-flex md6 lg6>
              <v-time-picker
                v-model="time"
                format="24hr"
                id="time"
                aria-describedby="time"
                landscape></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Создать мероприятие
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date(),
        time: new Date(),
        image: null
      }
    },
    props: {
      date: {
        type: Number
      },
      time: {
        type: Number
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      },
      submitDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submitDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Пожалуйста, добавьте правильный файл!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
