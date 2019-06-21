<template>
  <div>
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
export default {
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Última atualização', value: 'updatedAt' },
        { text: 'Usuário', value: 'user' },
        { text: 'Login', value: 'login' },
        { text: 'Email', value: 'email' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      users
    }
  }
}
</script>

<style scoped>

</style>
