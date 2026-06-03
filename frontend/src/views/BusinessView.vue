<template>
    <div class="business-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Excel in Business & Economics</h1>
            <p class="hero-subtitle">
                Build strong foundations in economics, accounting, and commerce —
                empowering students with practical skills for academic success and future careers.
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

        <!-- Benefits Section -->
        <section class="benefits">
            <h2>Why Study Business with Us?</h2>
            <ul>
                <li>📊 Personalized learning paths tailored to each student’s goals.</li>
                <li>💼 Expert tutors with real‑world business experience.</li>
                <li>⚖️ Practical case studies and interactive exercises.</li>
                <li>📈 Confidence building for exams and career readiness.</li>
            </ul>
        </section>

        <!-- Career Pathways -->
        <section class="career">
            <h2>Career Pathways</h2>
            <p>
                Studying business subjects opens doors to diverse opportunities:
            </p>
            <ul>
                <li>Finance & Accounting</li>
                <li>Entrepreneurship & Startups</li>
                <li>Marketing & Commerce</li>
                <li>Law & Business Ethics</li>
                <li>Economics & Policy Analysis</li>
            </ul>
        </section>

        <!-- Testimonials -->
        <section class="testimonials">
            <h2>What Parents & Students Say</h2>
            <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
                <p class="quote">“{{ t.quote }}”</p>
                <p class="author">— {{ t.name }}, {{ t.role }}</p>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <h2>Prepare for Success in Business Studies</h2>
            <RouterLink to="/register" class="cta-button">Book a Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const topics = [
    { title: "Economics", icon: "📈", description: "Microeconomics, macroeconomics, supply & demand, market structures." },
    { title: "Accounting", icon: "📒", description: "Bookeeping, financial statements, auditing basics, management accounting." },
    { title: "Commerce", icon: "💼", description: "Trade, entrepreneurship, marketing, and business studies." },
    { title: "Personal Finance", icon: "💰", description: "Budgeting, saving, investing, and financial literacy." },
    { title: "Law & Business Ethics", icon: "⚖️", description: "Legal frameworks, contracts, and ethical decision‑making." },
];

const testimonials = [
    { quote: "My child’s confidence in accounting has skyrocketed!", name: "Sarah M.", role: "Parent" },
    { quote: "The economics lessons helped me ace my A‑Level exams.", name: "James L.", role: "Student" },
    { quote: "Interactive commerce sessions made learning practical and fun.", name: "Priya K.", role: "Student" },
];
</script>

<style scoped>
.business-view {
    font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    color: #0f172a;
    padding: 2.4rem;
    background: linear-gradient(180deg, #fbfdff 0%, #f8fafc 100%);
}

.hero {
    display: grid;
    place-items: center;
    text-align: center;
    margin-bottom: 2.25rem;
    padding: 2.4rem 1.4rem;
    border-radius: 14px;
    background: linear-gradient(135deg, #0f172a 0%, #2b0f5a 60%);
    color: #fff;
    box-shadow: 0 10px 30px rgba(11, 15, 34, 0.12);
}

.hero-title {
    font-size: 2rem;
    line-height: 1.05;
    margin-bottom: 0.6rem;
    font-weight: 700;
}

.hero-subtitle {
    font-size: 1rem;
    max-width: 860px;
    margin: 0 auto;
    opacity: 0.92;
}

.subjects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin: 1.4rem 0 2rem 0;
}

.subject-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    transition: transform 260ms cubic-bezier(.2, .9, .3, 1), box-shadow 260ms;
    border: 1px solid rgba(15, 23, 42, 0.03);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.subject-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 48px rgba(15, 23, 42, 0.10);
}

.subject-card h2 {
    margin: 0;
    font-size: 1.05rem
}

.icon {
    font-size: 1.9rem
}

.benefits,
.career,
.testimonials {
    margin: 1.6rem 0;
}

.benefits h2,
.career h2,
.testimonials h2 {
    margin-bottom: 0.8rem;
    color: #0f172a;
}

.benefits ul,
.career ul {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 0.6rem
}

.benefits li,
.career li {
    background: #fff;
    padding: 0.75rem;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(2, 6, 23, 0.04)
}

.testimonial-card {
    background: linear-gradient(90deg, #ffffff, #f7fbff);
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 12px 30px rgba(2, 6, 23, 0.06);
    transition: transform 220ms ease, box-shadow 220ms ease;
}

.testimonial-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 60px rgba(2, 6, 23, 0.09)
}

.quote {
    font-style: italic;
    color: #0f172a
}

.author {
    font-weight: 600;
    margin-top: 0.5rem;
    color: #374151
}

.cta {
    text-align: center;
    margin-top: 2rem
}

.cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.14);
    transition: transform 180ms ease
}

.cta-button:hover {
    transform: translateY(-3px);
}

/* layout helpers */
.timeline-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem
}

.timeline-item {
    background: #fff;
    padding: 0.9rem;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(2, 6, 23, 0.04)
}

.test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem
}

/* small screens */
@media (max-width:720px) {
    .hero {
        padding: 1.6rem
    }

    .hero-title {
        font-size: 1.5rem
    }

    .subjects {
        gap: 0.8rem
    }
}

/* subtle entrance */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(8px)
    }

    to {
        opacity: 1;
        transform: translateY(0)
    }
}

.subject-card,
.testimonial-card,
.timeline-item {
    animation: fadeUp 360ms ease both
}
</style>