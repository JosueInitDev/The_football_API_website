<script setup>
import { COLORS, PLANS } from '@/constants';
import Header from '../components/Header.vue'
import Footer from '@/components/Footer.vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const router = useRouter()

const selectPlan = (plan)=>{
    if (plan.name == "Enterprise") return router.push("contact");
    
    localStorage.setItem("selectedPlan", plan.name);

    if (auth.token && plan.name=="Premium") {
        router.push('subscribe');
    } else {
        router.push("register");
    }
}
</script>

<template>
    <Header title="Pricing" description="Start for free, no credit card required" />

    <section class="pricing">
        <h2>Choose Your Plan</h2>
        <p class="subtitle">
            Start for free, <b>no credit card</b> — upgrade anytime.
            Made for fans, devs & analysts.
        </p>

        <div class="plans">
            <div
                v-for="plan in PLANS"
                :key="plan.name"
                :class="{
                    card: true,
                    best: plan.name === 'Premium'
                }"
            >
                <div class="badge" v-if="plan.name=='Premium'">Most Popular</div>
                <h2>{{ plan.name }}</h2>
                <p class="price" v-if="!plan.custom">${{ plan.price }}/<span>/mo</span></p>
                <p class="price custom" v-else>Custom</p>
                <ul>
                    <li v-for="item in plan.content" :key="item">
                        {{ item }}
                    </li>
                </ul>
                <button :class="{btn: true, primary: plan.name == 'Premium'}" @click="selectPlan(plan)">{{ plan.buttonText }}</button>
            </div>
        </div>
    </section>

    <Footer />
</template>

<style scoped>
.pricing {
    padding: 40px 20px;
    text-align: center;
    max-width: 1100px;
    margin: auto;
}

h1 {
    font-size: 42px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #222;
}

.subtitle {
    color: #666;
    margin-bottom: 50px;
}

.plans {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
}

.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 30px;
    width: 280px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    transition: transform .2s;
}

.card:hover {
    transform: translateY(-6px);
}

.best {
    border: 2px solid v-bind('COLORS.color1');
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.badge {
    position: absolute;
    top: -12px;
    right: 12px;
    background: v-bind('COLORS.color1');
    color: #fff;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 6px;
}

.price {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
    color: v-bind('COLORS.color1');
}

.price span {
    font-size: 14px;
    color: #555;
}

.price.custom {
    color: #333;
}

ul {
    text-align: left;
    margin: 0 auto 25px;
    padding: 0;
    list-style: none;
}

ul li {
    margin: 8px 0;
    color: #444;
}

.btn {
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    background: #ddd;
    font-weight: bold;
    transition: background .2s;
}

.btn:hover {
    background: #ccc;
}

.btn.primary {
    background: v-bind('COLORS.color1');
    color: white;
}

.btn.primary:hover {
    background: v-bind('COLORS.color1');
}

/* Mobile */
@media(max-width: 768px) {
    .plans {
        flex-direction: column;
        align-items: center;
    }
}
</style>
