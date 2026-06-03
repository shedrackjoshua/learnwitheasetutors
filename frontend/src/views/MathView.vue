<template>
    <div class="math-page">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Master Mathematics with Confidence</h1>
            <p class="hero-subtitle">
                Personalized lessons in arithmetic, algebra, geometry, calculus, and beyond —
                designed to build strong foundations and unlock academic success.
            </p>
        </section>

        <!-- Subject Cards -->
        <section class="subjects">
            <div class="subject-card" v-for="topic in topics" :key="topic.title">
                <div class="icon">{{ topic.icon }}</div>
                <h2>{{ topic.title }}</h2>
                <p>{{ topic.description }}</p>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <h2>Start Your Child’s Math Journey Today</h2>
            <RouterLink to="/register" class="cta-button">Book a Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const topics = [
    { title: "Arithmetic", icon: "➕", description: "Addition, subtraction, multiplication, division, fractions, decimals." },
    { title: "Algebra", icon: "∑", description: "Equations, inequalities, polynomials, functions." },
    { title: "Geometry", icon: "📐", description: "Shapes, angles, proofs, coordinate geometry." },
    { title: "Trigonometry", icon: "📏", description: "Sine, cosine, tangent, identities, applications." },
    { title: "Calculus", icon: "∫", description: "Limits, derivatives, integrals, real‑world applications." },
    { title: "Statistics & Probability", icon: "📊", description: "Data analysis, probability models, hypothesis testing." },
];
</script>

<style scoped>
.math-page {
    font-family: 'Poppins', sans-serif;
    color: #222;
    padding: 2rem;
}

.hero {
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    color: white;
    padding: 3rem;
    border-radius: 12px;
}

.hero-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
}

.subjects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.subject-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.subject-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.cta {
    text-align: center;
    margin-top: 2rem;
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
}

.cta-button:hover {
    background: linear-gradient(135deg, #4a148c, #1a237e);
}
</style>