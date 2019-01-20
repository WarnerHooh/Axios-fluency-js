<template>
  <div class="hello">
    <div v-for="user of users" :key="user.id">
      {{user.name}} - {{user.gender}}
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService';
import {Convoy} from '../utils/axios';

const userService = new UserService();

export default {
  data() {
    return {
      users: []
    }
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    // @Convoy
    fetchUsers() {
      return userService.fetchUsers()
        .then((resp) => {
          this.users = resp.data;
        });
    },

    deleteUser(id) {
      return userService.deleteUser(id, Gender.MALE)
        .then((resp) => {
          console.log(resp);
        })
        .catch(error => {
          console.log(error);
          console.log('I want to handle the error by myself.');
        });
    },

    // PROMISE CALL
    // @Convoy
    // createUser() {
    //   return userService.createUser({
    //     name: this.name,
    //     gender: this.gender
    //   });
    // },

    // ASYNC CALL
    // @Convoy
    async createUser() {
      try {
        const data = await userService.createUser({
          name: this.name,
          gender: this.gender
        });
        console.log(data)
      } catch (error) {
        console.log('I just want to catch the 403 error, throw the others out!');

        if (error.response && error.response.status === '403') {
          console.error('Forbidden');
          return;
        }

        throw error;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
