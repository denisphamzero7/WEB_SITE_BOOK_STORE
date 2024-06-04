<template>
  <transition @before-leave="beforeLeave" @leave="onLeave">
    <div v-if="message" :class="[toastClasses, getbgcolor(), 'animate-fadeIn']"  >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      timeout: null,
    };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      type: String,
      default: 'top-right',
    },
    backgroundcolor: {
      type: String,
      default: '',
    },
  },
  computed: {
    toastClasses() {
      return [
        'absolute',
        'p-4',
        'rounded-md',
        this.getPositionClass(),
        'transform',
        'opacity-90',
        'hover:opacity-100',
        'transition-opacity',
        'duration-300',
        'mx-[20px]',
        'mt-[25px]',
      ];
    },
  },
  methods: {
    getPositionClass() {
      switch (this.position) {
        case 'top-left':
          return 'left-0 top-4';
        case 'top-right':
          return 'right-0 top-4';
          case 'top-center':
          return 'top-4 left-1/2 transform -translate-x-1/2';
        case 'bottom-right':
          return 'right-0 bottom-5';
        case '':
          return 'right-0 bottom-4';
        default:
          return 'right-0 top-4';
      }
    },
    getbgcolor() {
      switch (this.backgroundcolor) {
        case 'warning':
          return 'bg-yellow-500 text-white';
        case 'success':
          return 'bg-green-500 text-white';
        case 'error':
          return 'bg-red-500 text-white';
        default:
          return 'bg-blue-500 text-white';
      }
    },
    beforeLeave(el) {
      el.style.transition = 'opacity 0.5s';
    },
    onLeave(el) {
      el.style.opacity = '0';
    },
    closeToast() {
      this.$emit('close');
    },
  },
  watch: {
    message: function (newMessage) {
      clearTimeout(this.timeout);

      if (this.duration > 0) {
        this.timeout = setTimeout(() => {
          this.$emit('close');
        }, this.duration);
      }
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn ease-in-out 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> 