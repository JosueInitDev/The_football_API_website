<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import { COLORS, CONSTS } from '@/constants';

const props = defineProps({
    title: String,
    description: String
})
</script>

<template>
    <Navbar />

    <section class="header">
        <div class="header-content">
            <div>
                <h1>{{ props?.title }}</h1>
                <p>{{ props?.description }}</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.header {
    background: v-bind('COLORS.color1');
    color: #fff;
    text-align: center;
    background-image: url('@/images/the-football-api-home.png');
    background-size: cover;
    background-position: center;
}
.header-content{
    background-color: #0000009d;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    padding-top: 50px;
}
.header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 20px;
}

.header p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
}
</style>