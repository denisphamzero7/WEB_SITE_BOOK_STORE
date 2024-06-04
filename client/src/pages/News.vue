<template>
    <div class="md:container mx-auto flex-col mt-[100px]">
        <span class="text-5xl font-bold py-4">Tin tức</span>
        <div class="my-3 overflow-scroll">
            <News v-for="blog in blogs" :blog="blog" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import News from '@/components/News.vue';
export default {
    components: {
        News
    },
    computed: {
        ...mapGetters('blog', ['blogs'])
    },
    mounted() {
        this.fetchBlog();
    },
    methods: {
        ...mapActions('blog', ['fetchBlog']),
    }
}
</script>

<style lang="scss" scoped></style>