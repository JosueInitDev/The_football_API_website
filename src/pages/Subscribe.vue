<script setup>
import { PLANS } from '@/constants';

</script>

<template>
    <div class="subscribe-page">
        <h1>Choose your plan</h1>

        <div class="plans">
            <div v-for="plan in PLANS" :key="plan.id" class="plan-card" :class="{ selected: selectedPlan === plan.id }"
                @click="selectPlan(plan.id)">
                <h3>{{ plan.name }}</h3>
                <p class="price">{{ plan.price }} / month</p>
            </div>
        </div>

        <button class="pay-btn" :disabled="loading || !selectedPlan" @click="subscribe">
            {{ loading ? "Redirecting..." : "Subscribe now" }}
        </button>
    </div>
</template>

<style scoped>
.subscribe-page {
    max-width: 600px;
    margin: 60px auto;
    text-align: center;
}

.plans {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 30px 0;
}

.plan-card {
    border: 2px solid #ccc;
    padding: 20px;
    width: 150px;
    cursor: pointer;
    border-radius: 10px;
}

.plan-card.selected {
    border-color: #007bff;
}

.price {
    font-size: 20px;
    font-weight: bold;
}

.pay-btn {
    padding: 12px 30px;
    font-size: 16px;
}
</style>
