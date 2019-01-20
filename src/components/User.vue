<template>
  <div class="user-container">
    <div class="users">
      <h3>Users: </h3>
      <div v-for="user of users" :key="user.id">
        <span>{{user.name}} - {{user.gender}}</span>
        <i class="icon el-icon-delete" @click="deleteUser(user)"></i>
      </div>
    </div>

    <hr />

    <div class="user-create">
      <h3>User create: </h3>
      <div class="row">
        <label for="name">Name: </label>
        <el-input id="name" type="text" v-model="name" />
      </div>

      <div class="row">
        <label>Gender: </label>
        <el-radio v-model="gender" label="male">Male</el-radio>
        <el-radio v-model="gender" label="female">Female</el-radio>
      </div>

      <div class="row">
        <el-button class="create-btn" type="default" @click="createUser">Submit</el-button>
      </div>
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
      name: '',
      gender: '',
      users: [],
    }
  },

  created() {
    this.healthCheck();
    this.fetchUsers();
  },

  methods: {
    @Convoy
    healthCheck() {
      return userService.healthCheck()
        .then((resp) => {
          console.log(resp)
        }, (error) => {
          // console.log('I just want to catch the 403 error, throw the others out!');

          if (error.response && error.response.status === 403) {
            console.info(' ---- Forbidden ---- ');
          } else {
            throw error;
          }
        });
    },

    @Convoy
    fetchUsers() {
      return userService.fetchUsers()
        .then((resp) => {
          this.users = resp.data;
        });
    },

    deleteUser(user) {
      return userService.deleteUser(user.id, user.gender)
        .then((resp) => {
          console.log(resp);
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
    @Convoy
    async createUser() {
      const data = await userService.createUser({
        name: this.name,
        gender: this.gender
      });
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-container {
    text-align: left;
  }

  .icon {
    margin-left: 20px;
    cursor: pointer;
  }

  hr {
    margin: 20px 0;
  }

  .user-create {
    width: 400px;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  label {
    flex: 1;
  }

  .el-input {
    flex: 4;
  }

  .create-btn {
    width: 100%;
  }
</style>
