<template>
  <v-layout row wrap>
    <v-flex class="order-table">
      <v-btn class="amber darken-3" dark>Nova Venda</v-btn>
      <v-data-table :headers="orderHeaders" :items="orders" hide-actions class="elevation-1 mt-2">
        <template slot="items" slot-scope="props">
          <tr @click="select(props.item)">
            <td>{{ formatDate(props.item.createdAt) }}</td>
            <td>{{ formatPrice(props.item.value) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex>
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
        :disabled="!(selectedOrder.id)"
      ></v-textarea>
      <v-btn class="amber darken-3" dark :visible="!(selectedOrder.id)">Adicionar Produto</v-btn>
      <v-data-table :headers="productHeaders" :items="selectedOrder.products" hide-actions class="elevation-1 mt-2">
        <template slot="items" slot-scope="props">
          <td>
            <v-select
              :items="products"
              v-model="props.item"
              item-text="name"
              single-line
              return-object
              :disabled="!(selectedOrder.id)"/>
          </td>
          <td>
            <v-text-field
              v-model="props.item.orderProduct.amount"
              type="number"
              :disabled="!(selectedOrder.id)"
            ></v-text-field>
          </td>
          <td>{{ formatPrice(props.item.orderProduct.value) }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      orderHeaders: [
        { text: 'Data', value: 'createdAt' },
        { text: 'Valor', value: 'value' }
      ],
      productHeaders: [
        { text: 'Produto', value: 'product' },
        { text: 'Quantidade', value: 'amount' },
        { text: 'Valor', value: 'value' }
      ],
      orders: [],
      products: [],
      selectedOrder: {
        value: 0,
        notes: '',
        user: {},
        products: []
      },
      defaultOrder: {
        value: 0,
        notes: '',
        user: this.$store.user,
        products: []
      }
    }
  },
  async mounted () {
    this.orders = [
      {
        id: 1,
        value: 15,
        notes: '',
        createdAt: '2019-06-20T22:25:16.000Z',
        updatedAt: '2019-06-20T22:25:16.000Z',
        userId: 1,
        user: {
          id: 1,
          name: 'Administrador',
          login: 'admin',
          email: '',
          password: 'admin',
          createdAt: '2019-06-20T22:25:16.000Z',
          updatedAt: '2019-06-20T22:25:16.000Z'
        },
        products: [
          {
            id: 1,
            name: 'coxinha',
            code: '002',
            price: 3,
            type: 'salgado',
            quantity: 5,
            minimum_quantity: -1,
            createdAt: '2019-06-20T22:25:16.000Z',
            updatedAt: '2019-06-20T22:25:16.000Z',
            orderProduct: {
              amount: 1,
              value: 2,
              createdAt: '2019-06-20T22:25:16.000Z',
              updatedAt: '2019-06-20T22:25:16.000Z',
              orderId: 1,
              productId: 1
            }
          },
          {
            id: 2,
            name: 'café',
            code: '003',
            price: 2,
            type: 'bebida',
            quantity: 20,
            minimum_quantity: -1,
            createdAt: '2019-06-20T22:25:16.000Z',
            updatedAt: '2019-06-20T22:25:16.000Z',
            orderProduct: {
              amount: 1,
              value: 2,
              createdAt: '2019-06-20T22:25:16.000Z',
              updatedAt: '2019-06-20T22:25:16.000Z',
              orderId: 1,
              productId: 2
            }
          }
        ]
      }
    ]
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
      select(order) 
    },
    select (order) {
      this.selectedOrder = Object.assign({}, order)
      selectedOrder.createdAt = formatDate(selectedOrder.createdAt)
    }
  }
}
</script>

<style scoped>

</style>
