<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div v-if="!paidFor" class="text-center">
      <div ref="paypal"></div>
    </div>

    <div v-if="paidFor" class="text-center">
      <h1 class="text-3xl font-bold text-green-500 mb-4">thanh toán thành công, xin cảm ơn !</h1>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import VueConfetti from 'vue-confetti'

export default {
  name: 'PaypalComponent',
  components: {
    VueConfetti
  },

  data() {
    return {
      loaded: false,
      paidFor: false,
      orderData: {}
    }
  },

  mounted() {
    this.loadPayPalScript(),
    this.fetchcart();

  },

  computed: {
    ...mapGetters('user', ['cart', 'User']),
    totalCartPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    }
  },

  methods: {
    ...mapActions('user', ['updateAddress', 'fetchcurrentuser', 'fetchcart']),
    ...mapActions('order', ['orderproduct']),
    
   

    async saveOrder() {
      try {
        this.orderData = {
          orderBy: this.User._id,
          products: this.cart,
          total: this.totalCartPrice,
          address: this.User.address,
          status: 'success',
        };
        const response = await this.orderproduct(this.orderData);
        if (response) {
          await Promise.all([
            this.updateAddress({ address: this.User.address })
          ]);
          setTimeout(() => this.redirectToHomePage(), 3000);
        }
      } catch (error) {
        this.handleError(error);
      }
    },

    redirectToHomePage() {
      this.$router.push({ name: 'Home-Page' });
    },

    loadPayPalScript() {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=AduTwFe3bUjZ7kAGgm2-B1Qy-JqOsszatesYcL7vvtdqkwVSdUsv2G1thrtWARGEcJ3njsAUo6qgtJpK&vault=false`
      script.addEventListener('load', () => {
        this.loaded = true;
        this.createPayPalButtons();
      });
      document.body.appendChild(script);
    },

    createPayPalButtons() {
      window.paypal.Buttons({
        createOrder: this.createOrder.bind(this),
        onApprove: this.handleApproval.bind(this),
        onError: this.handleError.bind(this)
      }).render(this.$refs.paypal)
    },

    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalCartPrice
            },
           
            
          }
        ]
      }).then(orderId => orderId)
    },

    async handleApproval(data, actions) {
      try {
        const response = await actions.order.capture()
        if (response.status === 'COMPLETED') {
          this.paidFor = true
          this.orderData.status = 'success'
          await this.saveOrder();
        }
      } catch (error) {
        this.handleError(error)
      }
    },

    handleError(error) {
      console.error(error)
      alert('An error occurred while processing the payment.')
    }
  }
}
</script>
