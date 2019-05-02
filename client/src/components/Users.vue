<template>
  <div>
    <!-- User editor -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" class="amber darken-3" dark>Novo Usuário</v-btn>
      <v-card >
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Nome" v-model="editedUser.name" />
          <v-text-field label="Login" v-model="editedUser.login" />
          <v-text-field label="Email" v-model="editedUser.email" />
          <v-text-field label="Senha" type="password" v-model="editedUser.password" />
        </v-card-text>
        <v-alert type="error" :value="error" :key="error" v-html="error" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
          <v-btn class="blue darken-1" dark flat @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- User table -->
    <v-data-table :headers="headers" :items="users" hide-actions class="elevation-1 mt-2">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.login }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ formatDate(props.item.createdAt) }}</td>
        <td>{{ formatDate(props.item.updatedAt) }}</td>
        <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="editUser(props.item)">
          <v-icon color="blue">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="deleteUser(props.item)">
          <v-icon color="red">delete</v-icon>
        </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
const moment = require('moment')

export default {
  data () {
    return {
      dialog: false,
      error: null,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Login', value: 'login' },
        { text: 'Email', value: 'email' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Última atualização', value: 'updatedAt' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedUser: {
        name: '',
        login: '',
        email: '',
        password: ''
      },
      defaultUser: {
        name: '',
        login: '',
        email: '',
        password: ''
      }
    }
  },
  async mounted () {
    this.users = (await UserService.index()).data
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    editUser (user) {
      this.editedIndex = this.users.indexOf(user)
      this.editedUser = Object.assign({}, user)
      this.dialog = true
    },
    async deleteUser (user) {
      if (confirm('Você tem certeza que deseja excluir esse usuário?')) {
        await UserService.delete(user)
        this.users.splice(this.users.indexOf(user), 1)
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedIndex = -1
        this.error = null
      }, 300)
    },
    async save () {
      try {
        if (this.editedIndex !== -1) {
          this.users.splice(this.editedIndex, 1, (await UserService.put(this.editedUser)).data)
        } else {
          this.users.push((await UserService.post(this.editedUser)).data)
        }
        this.close()
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.error
        } else {
          console.log(error)
        }
      }
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY HH:mm:ss')
    }
  }
}
</script>

<style scoped>
</style>
