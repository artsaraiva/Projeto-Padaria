<template>
  <div>
    <!-- Product editor -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" class="amber darken-3" dark>Novo Produto</v-btn>
      <v-card >
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Nome" v-model="editedProduct.name" />
          <v-text-field label="Código" v-model="editedProduct.code" />
          <v-text-field label="Preço" v-bind:min="0" v-bind:minus="false" v-bind:precision="2" separator="." v-model="editedProduct.price" />
          <v-text-field label="Tipo" v-model="editedProduct.type" />
          <v-text-field label="Estoque" v-bind:min="0" v-bind:minus="false" v-bind:precision="0" v-model="editedProduct.quantity" />
          <div class="notify">
            <v-checkbox label="Notificar falta de estoque" v-model="notifyStock" />
            <v-text-field label="Quantidade" v-if="notifyStock" v-bind:min="0" v-bind:minus="false" v-bind:precision="0" v-model="editedProduct.minimum_quantity" />
          </div>
        </v-card-text>
        <v-alert type="error" :value="error" :key="error" v-html="error" />
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
          <v-btn class="blue darken-1" dark flat @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Product table -->
    <v-data-table :headers="headers" :items="products" hide-actions class="elevation-1 mt-2">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.code }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.type }}</td>
        <td>{{ formatQuantity(props.item) }}</td>
        <td>{{ formatDate(props.item.createdAt) }}</td>
        <td>{{ formatDate(props.item.updatedAt) }}</td>
        <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="editProduct(props.item)">
          <v-icon color="blue">edit</v-icon>
        </v-btn>
        <v-btn icon class="mx-0" @click="deleteProduct(props.item)">
          <v-icon color="red">delete</v-icon>
        </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService'
import VueNumeric from 'vue-numeric'
const moment = require('moment')

export default {
  components: {
    VueNumeric
  },
  data () {
    return {
      dialog: false,
      notifyStock: false,
      error: null,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'Código', value: 'code' },
        { text: 'Preço', value: 'price' },
        { text: 'Tipo', value: 'type' },
        { text: 'Estoque', value: 'quantity' },
        { text: 'Criado em', value: 'createdAt' },
        { text: 'Última atualização', value: 'updatedAt' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      products: [],
      editedIndex: -1,
      editedProduct: {
        name: '',
        code: '',
        price: 0,
        type: '',
        quantity: 0,
        minimum_quantity: -1
      },
      defaultProduct: {
        name: '',
        code: '',
        price: 0,
        type: '',
        quantity: 0,
        minimum_quantity: -1
      }
    }
  },
  async mounted () {
    this.products = (await ProductService.index()).data
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Produto' : 'Editar Produto'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    notifyStock (val) {
      if (!val) {
        this.editedProduct.minimum_quantity = -1
      } else if (this.editedProduct.minimum_quantity === -1) {
        this.editedProduct.minimum_quantity = null
      }
    }
  },
  methods: {
    editProduct (product) {
      this.editedIndex = this.products.indexOf(product)
      this.editedProduct = Object.assign({}, product)
      this.notifyStock = this.editedProduct.minimum_quantity !== -1
      this.dialog = true
    },
    async deleteProduct (product) {
      if (confirm('Você tem certeza que deseja excluir esse produto?')) {
        await ProductService.delete(product)
        this.products.splice(this.products.indexOf(product), 1)
      }
    },
    close () {
      this.dialog = false
      this.notifyStock = false
      setTimeout(() => {
        this.editedProduct = Object.assign({}, this.defaultProduct)
        this.editedIndex = -1
        this.error = null
      }, 300)
    },
    async save () {
      try {
        if (this.editedIndex !== -1) {
          this.products.splice(this.editedIndex, 1, (await ProductService.put(this.editedProduct)).data)
        } else {
          this.products.push((await ProductService.post(this.editedProduct)).data)
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
    },
    formatQuantity (product) {
      let quantity = product.quantity

      if (product.minimum_quantity !== -1) {
        quantity += ' / ' + product.minimum_quantity
      }

      return quantity
    }
  }
}
</script>

<style scoped>
.notify {
  display: flex;
  align-items: center;
}
</style>
