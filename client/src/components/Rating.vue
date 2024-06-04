<template>
  <div>
    <span v-for="n in maxStars" :key="n">
      <i class="pi px-2 text-xl" :class="starClass(n - 0.5)" @click="rate(n)"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    maxStars: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rating: this.value
    }
  },
  watch: {
    value(newVal) {
      this.rating = newVal
    }
  },
  methods: {
    rate(rating) {
      if (!this.disabled) {
        this.rating = this.rating === rating ? 0 : rating;
        this.$emit('change', this.rating);
      }
    },
    starClass(index) {
      if (Number.isInteger(index) && index + 0.5 <= this.rating) {
        return {
          'pi-star-half color-rating': true,
          'pi-star-fill text-yellow-400': false,
          'pi-star text-black': false,
        };
      }
      return {
        'pi-star-half color-rating': index < this.rating && index + 0.5 > this.rating,
        'pi-star-fill color-rating': index < this.rating,
        'pi-star text-black': index >= this.rating,
      };
    }
  }
}
</script>

<style scoped>
.color-rating {
  color: #fadb14;
}
</style>
