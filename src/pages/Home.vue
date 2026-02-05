
<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import { COLORS, CONSTS } from '@/constants';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <Navbar />

    <div class="home-container">

        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <div>
                    <h1>{{CONSTS.app_name}}</h1>
                    <p>Access fixtures, live, odds, and historical football data from leagues worldwide. Free, fast, and easy to
                        integrate — built for football lovers.</p>
                    <a href="/docs" target="__blank" class="cta-btn">Get Started</a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features">
            <h2>Why Choose <span :style="{color: COLORS.color1}">{{CONSTS.app_name}}</span>?</h2>
            <p>Start for free, <b>no credit card!</b></p>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="icon">⚡</div>
                    <h3>Fast & Reliable</h3>
                    <p>Get live updates instantly with our lightweight API designed for speed and reliability.</p>
                    <a href="#features" class="url-btn">See features</a>
                </div>
                <div class="feature-card">
                    <div class="icon">💰</div>
                    <h3>Free</h3>
                    <p>Start for free, no credit card required. Premium tier unlocks extra requests and features.</p>
                    <a href="/pricing" class="url-btn">See pricing</a>
                </div>
                <div class="feature-card">
                    <div class="icon">🌍</div>
                    <h3>All Major Leagues</h3>
                    <p>Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa League, and more!</p>
                    <a href="#leagues" class="url-btn">See all leagues</a>
                </div>
            </div>
        </section>

        <!-- Leagues Section -->
        <section class="leagues" id="leagues">
            <div style="background-color: #310013a8; padding: 40px 20px 90px 20px;">
                <h2 style="color: #fff;">Leagues Covered</h2>
                <p style="color: #fff;">All these leagues are available for all plans (free and premium).</p>
                <div class="league-grid">
                    <div class="league-card" v-for="league in CONSTS.leagues" :key="league.name">
                        <img :src="`/${league.league_logo}`" :alt="league.name">
                        <h3>{{ league.name }}</h3>
                        <p>{{ league.country }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Example Code Section -->
        <section class="example-code">
            <h2>Example API Request</h2>
            <p>Fetch match data in just a few lines of code:</p>
            <pre>
fetch("https://api.yourapp.com/fixtures/premier_league")
    .then(r => r.json())
    .then(data => console.log(data))
            </pre>
            <p>NB: All API calls required a token, <a href="/docs" target="__blank" class="url-btn">check docs</a> to learn more.</p>
        </section>

        <!-- Features -->
        <section class="leagues" id="features" style="background-image: none; background: #ffbed5ff; padding: 20px 20px 60px 20px;">
            <h2>Features</h2>
            <div class="league-grid">
                <div class="league-card">
                    <h3>Fixtures</h3>
                    <p>Get all upcoming matches</p>
                </div>
                <div class="league-card">
                    <h3>Lives</h3>
                    <p>Get live scores and more</p>
                </div>
                <div class="league-card">
                    <h3>Odds</h3>
                    <p>Get some of the best available odds</p>
                </div>
                <div class="league-card">
                    <h3>Images</h3>
                    <p>Yep, the logos of leagues and teams are also available</p>
                </div>
            </div>
            <p><br></p>
            <p>Want to test our API? Try our app built on top of our API for fun betting.</p>
            <a href="#" class="google-btn">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                />
            </a>
        </section>

        <!-- Footer CTA -->
        <Footer />

    </div>
</template>


<style scoped>
/* Container */
.home-container {
    font-family: 'Helvetica Neue', sans-serif;
    color: #1f2937;
    background: #f9fafb;
}

/* Hero */
.hero {
    background: v-bind('COLORS.color1');
    color: #fff;
    text-align: center;
    background-image: url('@/images/the-football-api-home.png');
    background-size: cover;
    background-position: center;
    height: 60vh;
}
.hero-content{
    background-color: #0000009d;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 20px;
}
.hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
}

.cta-btn {
    display: inline-block;
    background: v-bind('COLORS.color1');
    color: #fff;
    padding: 12px 28px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.3s;
}

.cta-btn:hover {
    background: v-bind('COLORS.color2');
}

/* Features */
.features {
    padding: 80px 20px;
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
}

.features h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #111827;
}

.feature-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.feature-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    padding: 30px;
    width: 260px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.feature-card .icon {
    font-size: 2rem;
    margin-bottom: 15px;
}

/* Leagues */
.leagues {
    text-align: center;
    background-image: url('@/images/the-football-api-2.png');
    background-size: cover;
    background-position: center;
}

.leagues h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 40px;
}

.league-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}

.league-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    padding: 30px;
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.league-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.league-card img {
    height: 100px;
    margin-bottom: 15px;
}

.league-card h3 {
    font-weight: 600;
    margin-bottom: 5px;
}

.league-card p {
    color: #6b7280;
}

/* Example Code */
.example-code {
    background: #ffffff;
    padding: 60px 20px;
    text-align: center;
    margin: 40px auto;
    max-width: 700px;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.example-code h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.example-code p {
    color: #4b5563;
    margin-bottom: 20px;
}

.example-code pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 20px;
    border-radius: 12px;
    text-align: left;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
}

/* Pricing */
.pricing {
    padding: 80px 20px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
}

.pricing h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
}

.pricing-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
}

.pricing-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    padding: 30px;
    width: 250px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.pricing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.pricing-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.pricing-card p {
    color: #6b7280;
    margin-bottom: 15px;
}

.pricing-card ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
}

.pricing-card ul li {
    margin: 6px 0;
}

.url-btn{
    color: v-bind('COLORS.color1');
    font-weight: bold;
    text-decoration: none;
}
.url-btn:hover{
    color: v-bind('COLORS.color2');
    font-weight: bold;
}

.google-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #000;
  border-radius: 8px;
  padding: 10px 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.google-btn img {
  height: 40px;
  display: block;
}
.google-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}
.google-btn:active {
  transform: scale(0.97);
}
</style>
