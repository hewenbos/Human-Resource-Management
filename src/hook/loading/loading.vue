<template>
    <transition name="loadingtran">
        <div class="loading-overlay">
            <span class="el-icon-loading"></span>
            {{ text }}
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            text: ''
        };
    },
    methods: {},
    computed: {},
    components: {},
    filters: {},
    watch: {},
    created() { },
    mounted() { },
};
</script>

<style lang="scss" scoped>
.loading-overlay {
    width: 100%;
    z-index: 9999;
    opacity: 0.8;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    color: #fff;

}

.loading-overlay {
  /* ...其他样式... */
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

.loadingtran-enter-active, .loadingtran-leave-active {
  transition: opacity 0.3s ease;
}

.loadingtran-enter, .loadingtran-leave-to  {
  opacity: 0;
}
</style>