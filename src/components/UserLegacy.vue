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
import axios from 'axios';
import {Loading, Message} from "element-ui";

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
    healthCheck() {
      axios.get('http://localhost:8882/health')
        .then((resp) => {
          console.log(resp)
        }, (error) => {
          if (error.response) {
            if (error.response.status === 401) {
              Message.error(' ---- Unauthorized ---- ');
            } else if(error.response.status === 403) {
              Message.error(' ---- Forbidden ---- ');
            } else if(error.response.status >= 400) {
              Message.error(' ---- Bad Request ---- ');
            } else if(error.response.status >= 500) {
              Message.error(' ---- Server Error ---- ');
            }
          }
        });
    },

    fetchUsers() {
      const loadingInstance = Loading.service({
        text: 'Loading...',
      });

      axios.get('http://localhost:8882/users')
        .then((resp) => {
          this.users = resp.data;

          loadingInstance.close();
        }, (error) => {
          if (error.response) {
            if (error.response.status === 401) {
              Message.error(' ---- Unauthorized ---- ');
            } else if(error.response.status === 403) {
              Message.error(' ---- Forbidden ---- ');
            } else if(error.response.status >= 400) {
              Message.error(' ---- Bad Request ---- ');
            } else if(error.response.status >= 500) {
              Message.error(' ---- Server Error ---- ');
            }
          }

          loadingInstance.close();
        });
    },

    deleteUser(user) {
      const loadingInstance = Loading.service({
        text: 'Loading...',
      });

      axios.delete('http://localhost:8882/user/' + user.id + '?gender=' + user.gender)
        .then((resp) => {
          console.log(resp);
          loadingInstance.close();

        }, (error) => {
          if (error.response) {
            if (error.response.status === 401) {
              Message.error(' ---- Unauthorized ---- ');
            } else if(error.response.status === 403) {
              Message.error(' ---- Forbidden ---- ');
            } else if(error.response.status >= 400) {
              Message.error(' ---- Bad Request ---- ');
            } else if(error.response.status >= 500) {
              Message.error(' ---- Server Error ---- ');
            }
          }

          loadingInstance.close();
        });
    },

    async createUser() {
      const loadingInstance = Loading.service({
        text: 'Loading...',
      });

      try {
        const data = await axios.post('http://localhost:8882/user', {
          name: this.name,
          gender: this.gender
        });
        loadingInstance.close();

        console.log(data)
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            Message.error(' ---- Unauthorized ---- ');
          } else if(error.response.status === 403) {
            Message.error(' ---- Forbidden ---- ');
          } else if(error.response.status >= 400) {
            Message.error(' ---- Bad Request ---- ');
          } else if(error.response.status >= 500) {
            Message.error(' ---- Server Error ---- ');
          }
        }

        loadingInstance.close();
      }
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
