<template>
    <div class="exam-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Ace Your Exams With Confidence</h1>
            <p class="hero-subtitle">
                Expert‑led preparation for GCSE, A‑Level, SAT, ACT, and other major exams —
                with personalized strategies, practice tests, and real‑time feedback.
            </p>
        </section>

        <!-- Exam Category Cards -->
        <section class="exam-cards">
            <div class="exam-card" v-for="exam in exams" :key="exam.title">
                <div class="icon">{{ exam.icon }}</div>
                <h2>{{ exam.title }}</h2>
                <p>{{ exam.description }}</p>
            </div>
        </section>

        <!-- What You’ll Master -->
        <section class="mastery">
            <h2>What You’ll Master</h2>
            <ul>
                <li>📘 Exam‑specific strategies and time management.</li>
                <li>🧠 Critical thinking and problem‑solving skills.</li>
                <li>📝 Practice questions with detailed explanations.</li>
                <li>📊 Performance tracking and personalized study plans.</li>
            </ul>
        </section>

        <!-- Interactive Benefits -->
        <section class="benefits">
            <h2>Why Our Exam Prep Works</h2>
            <div class="benefit-bar" v-for="benefit in benefits" :key="benefit.title">
                <span class="benefit-title">{{ benefit.title }}</span>
                <div class="bar">
                    <div class="fill" :style="{ width: benefit.level + '%' }"></div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="testimonials">
            <h2>Success Stories</h2>
            <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
                <p class="quote">“{{ t.quote }}”</p>
                <p class="author">— {{ t.name }}, {{ t.role }}</p>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <h2>Start Your Exam Prep Journey Today</h2>
            <RouterLink to="/trial" class="cta-button">Book a Free Trial Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const exams = [
    { title: "GCSE Prep", icon: "📘", description: "Master core subjects with targeted revision and practice." },
    { title: "A‑Level Prep", icon: "📚", description: "Deep subject understanding and exam‑focused strategies." },
    { title: "SAT Prep", icon: "🧠", description: "Math, reading, and writing mastery with timed drills." },
    { title: "ACT Prep", icon: "📝", description: "Science reasoning, math, English, and reading practice." },
    { title: "Mock Exams", icon: "⏱️", description: "Simulated exam environments to build confidence." },
];

const benefits = [
    { title: "Score Improvement", level: 95 },
    { title: "Confidence Boost", level: 90 },
    { title: "Exam Strategy Mastery", level: 92 },
    { title: "Time Management Skills", level: 88 },
];

const testimonials = [
    { quote: "My son improved his GCSE maths score by two grades!", name: "Helen A.", role: "Parent" },
    { quote: "The SAT prep helped me get into my dream university.", name: "Marcus J.", role: "Student" },
    { quote: "Mock exams made the real test feel easy.", name: "Rita S.", role: "Student" },
];
</script>

<style scoped>
.exam-view {
    font-family: 'Poppins', sans-serif;
    color: #222;
    padding: 2rem;
}

/* HERO */
.hero {
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    color: white;
    padding: 3rem;
    border-radius: 14px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.hero-title {
    font-size: 2.6rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero-subtitle {
    font-size: 1.2rem;
    max-width: 650px;
    margin: 0 auto;
    opacity: 0.95;
}

/* EXAM CARDS */
.exam-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.7rem;
    margin-bottom: 3rem;
}

.exam-card {
    background: white;
    border-radius: 14px;
    padding: 1.7rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    cursor: pointer;
}

.exam-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2.4rem;
    margin-bottom: 0.7rem;
}

/* MASTERY */
.mastery {
    margin-bottom: 3rem;
}

.mastery h2 {
    margin-bottom: 1rem;
    color: #1a237e;
    font-weight: 600;
}

.mastery ul {
    list-style: none;
    padding: 0;
}

.mastery li {
    margin-bottom: 0.6rem;
    font-size: 1.05rem;
}

/* BENEFIT BARS */
.benefits {
    margin-bottom: 3rem;
}

.benefits h2 {
    margin-bottom: 1rem;
    color: #4a148c;
    font-weight: 600;
}

.benefit-bar {
    margin-bottom: 1rem;
}

.benefit-title {
    font-weight: 600;
    margin-bottom: 0.3rem;
    display: block;
}

.bar {
    width: 100%;
    height: 12px;
    background: #eee;
    border-radius: 6px;
    overflow: hidden;
}

.fill {
    height: 100%;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    border-radius: 6px;
    transition: width 1s ease;
}

/* TESTIMONIALS */
.testimonials {
    margin-bottom: 3rem;
}

.testimonials h2 {
    margin-bottom: 1rem;
    color: #2575fc;
    font-weight: 600;
}

.testimonial-card {
    background: #f7f7ff;
    border-radius: 14px;
    padding: 1.2rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.quote {
    font-style: italic;
    font-size: 1.05rem;
}

.author {
    font-weight: bold;
    margin-top: 0.5rem;
}

/* CTA */
.cta {
    text-align: center;
    margin-top: 2rem;
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #1a237e, #4a148c);
    color: white;
    padding: 0.9rem 1.7rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
}

.cta-button:hover {
    background: linear-gradient(135deg, #4a148c, #1a237e);
}
</style>