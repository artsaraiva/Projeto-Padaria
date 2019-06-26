<template>
  <v-layout row fill-height>
    <v-layout column class="order-table">
      <v-btn class="amber darken-3" dark v-if="selectedOrder.id !== 0" @click="addOrder()">Nova Venda</v-btn>
      <v-btn class="amber darken-3" dark v-if="selectedOrder.id === 0" @click="saveOrder()">Salvar Venda</v-btn>
      <v-flex fill-height>
        <v-data-table :headers="orderHeaders" :items="orders" hide-actions class="elevation-1 mt-2">
          <template slot="items" slot-scope="props">
            <tr :style="{ cursor: 'pointer', backgroundColor: (props.item.id === selectedOrder.id ? '#ffd59e' : '') }" @click="select(props.item)">
              <td>{{ formatDate(props.item.createdAt) }}</td>
              <td>{{ formatPrice(props.item.value) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout column fill-height v-if="selectedIndex !== -1">
      <v-text-field
        v-model="selectedOrder.createdAt"
        label="Data"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-text-field
        v-model="selectedOrder.user.name"
        label="Usuário"
        prepend-icon="person"
        readonly
      ></v-text-field>
      <v-textarea
        v-model="selectedOrder.notes"
        label="Observações"
        :readonly="selectedOrder.id !== 0"
      ></v-textarea>
      <v-btn class="amber darken-3" dark v-if="selectedOrder.id === 0" @click="addProduct()">Adicionar Produto</v-btn>
      <v-data-table :headers="productHeaders" :items="selectedOrder.products" item-key="" hide-actions class="elevation-1 mt-2">
        <template slot="items" slot-scope="props">
          <td>
            <v-select
              :items="getAvailableProducts(props.index)"
              v-model="props.item.id"
              item-text="name"
              item-value=id
              single-line
              @change="updateProduct(props.item)"
              :readonly="selectedOrder.id !== 0"/>
          </td>
          <td>
            <v-text-field
              v-model="props.item.orderProduct.amount"
              type="number"
              min=0
              @input="updateProduct(props.item)"
              :readonly="selectedOrder.id !== 0"
            ></v-text-field>
          </td>
          <td>{{ formatPrice(props.item.orderProduct.value) }}</td>
          <td style="padding: 0">
            <v-btn icon class="mx-0" :disabled="selectedOrder.id !== 0" @click="deleteProduct(props.index)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <currency-field v-bind="{ label: 'Valor Total', prefix: 'R$ ', readonly: true }" v-model="selectedOrder.value" />
    </v-layout>
  </v-layout>
</template>

<script>
import OrderService from '@/services/OrderService'
import ProductService from '@/services/ProductService'
import CurrencyField from '@/components/CurrencyField'
const moment = require('moment')

export default {
  components: {
    CurrencyField
  },
  data () {
    return {
      orderHeaders: [
        { text: 'Data', value: 'createdAt' },
        { text: 'Valor', value: 'value' }
      ],
      productHeaders: [
        { text: 'Produto', value: 'product', width: '70%', sortable: false },
        { text: 'Quantidade', value: 'amount', width: '15%', sortable: false },
        { text: 'Valor', value: 'value', width: '15%', sortable: false },
        { text: '', value: 'actions', width: '0', sortable: false }
      ],
      orders: [],
      products: [],
      productMap: {},
      selectedIndex: -1,
      selectedOrder: {
        value: 0,
        notes: '',
        user: {},
        products: []
      },
      defaultOrder: {
        id: 0,
        value: 0,
        notes: '',
        createdAt: new Date(),
        user: this.$store.state.user,
        products: []
      }
    }
  },
  async mounted () {
    this.orders = (await OrderService.index()).data
    this.products = (await ProductService.index()).data

    this.products.forEach(product => {
      this.productMap[product.id] = product
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY HH:mm:ss')
    },
    formatPrice (price) {
      return 'R$ ' + price.toString().replace('.', ',')
    },
    addOrder () {
      const order = Object.assign({}, this.defaultOrder)
      this.orders.push(order)
      this.select(order)
    },
    select (order) {
      this.selectedIndex = this.orders.indexOf(order)
      this.selectedOrder = Object.assign({}, order)
      this.selectedOrder.createdAt = this.formatDate(this.selectedOrder.createdAt)
    },
    getAvailableProducts (index) {
      return this.products.filter(product => {
        return !this.selectedOrder.products.find(p => {
          return this.selectedOrder.products.indexOf(p) !== index &&
                 p.id === product.id
        })
      })
    },
    addProduct () {
      this.selectedOrder.products.push({
        id: 0,
        orderProduct: {
          amount: 1,
          value: 0
        }
      })
    },
    updateProduct (product) {
      const temp = this.productMap[product.id]

      if (temp) {
        product.orderProduct.value = temp.price * product.orderProduct.amount
        this.updateOrder()
      }
    },
    deleteProduct (index) {
      this.selectedOrder.products.splice(index, 1)
      this.updateOrder()
    },
    updateOrder () {
      let value = 0
      this.selectedOrder.products.forEach(product => {
        value += product.orderProduct.value
      })
      this.selectedOrder.value = value
    },
    async saveOrder () {
      let order = this.orders[this.selectedIndex]
      order.value = this.selectedOrder.value
      order.notes = this.selectedOrder.notes
      order.userId = this.selectedOrder.user.id
      order.products = this.selectedOrder.products.filter(product => product.id)
      order = (await OrderService.post(order)).data
      this.orders.splice(this.selectedIndex, 1, order)
      this.select(order)
    },
    randomId () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }

      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    }
  }
}
</script>

<style scoped>
.order-table {
  max-width: 30%;
  padding-right: 24px;
}
</style>
