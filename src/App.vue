<template>
  <v-app>
    <v-navigation-drawer
      temporary
      absolute
      v-model="sideNav"
      role="navigation">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          tabindex="0">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenficated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Выйти</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="indigo darken-4" role="navigation">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" style="cursor: pointer" role="banner">
          <picture title="На главную" tabindex="0" @keyup.enter="home">
            <source srcset="../static/logo_MU.svg" type="image/svg+xml">
            <source srcset="../static/logo_MU.png 1x ../static/logo_MU@2.png 2x" type="image/png">
            <img src="../static/logo_MU.png" alt="Логотип MeetUps">
          </picture>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          tabindex="0">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-if="userIsAuthenficated"
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main id="main" role="main">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'person_add', title: 'Зарегистрироваться', link: '/signup'},
          {icon: 'lock_open', title: 'Войти', link: '/signin'}
        ]
        if (this.userIsAuthenficated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'Просмотреть', link: '/meetups'},
            {icon: 'room', title: 'Организовать', link: '/meetup/new'},
            {icon: 'person', title: 'Профиль', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenficated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      },
      home () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  picture img
    width: 3em
    margin-top: 0.35em
</style>
