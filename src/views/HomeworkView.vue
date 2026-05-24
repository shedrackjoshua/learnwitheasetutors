<template>
    <div class="homework-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Stay Ahead With Smart Homework Support</h1>
            <p class="hero-subtitle">
                Get step‑by‑step guidance, clear explanations, and personalized help across all subjects —
                making homework stress‑free and productive.
            </p>
        </section>

        <!-- Homework Categories -->
        <section class="categories">
            <div class="category-card" v-for="cat in categories" :key="cat.title">
                <div class="icon">{{ cat.icon }}</div>
                <h2>{{ cat.title }}</h2>
                <p>{{ cat.description }}</p>
            </div>
        </section>

        <!-- Productivity Tools -->
        <section class="tools">
            <h2>Smart Homework Tools</h2>
            <ul>
                <li>⏱️ Built‑in timers to improve focus and reduce procrastination.</li>
                <li>📚 Step‑by‑step explanations for tricky questions.</li>
                <li>🧠 Concept breakdowns to reinforce understanding.</li>
                <li>📊 Progress tracking to monitor daily improvement.</li>
            </ul>
        </section>

        <!-- Skill Progress Bars -->
        <section class="skills">
            <h2>Your Homework Skills Growth</h2>
            <div class="skill-bar" v-for="skill in skills" :key="skill.title">
                <span class="skill-title">{{ skill.title }}</span>
                <div class="bar">
                    <div class="fill" :style="{ width: skill.level + '%' }"></div>
                </div>
            </div>
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
            <h2>Make Homework Easier Starting Today</h2>
            <RouterLink to="/trial" class="cta-button">Book a Free Trial Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const categories = [
    { title: "Maths Homework", icon: "📐", description: "Clear steps, worked examples, and problem‑solving support." },
    { title: "English Homework", icon: "✍️", description: "Writing help, reading comprehension, and grammar guidance." },
    { title: "Science Homework", icon: "🔬", description: "Biology, chemistry, and physics explanations made simple." },
    { title: "Coding Homework", icon: "💻", description: "Debugging help, logic support, and project guidance." },
    { title: "Exam Revision Tasks", icon: "📘", description: "Structured revision plans and practice questions." },
    { title: "Business & Economics Homework", icon: "📈", description: "Concept explanations, case study support, and essay help." },
];

const skills = [
    { title: "Focus & Productivity", level: 90 },
    { title: "Understanding Concepts", level: 88 },
    { title: "Task Completion Speed", level: 85 },
    { title: "Independent Learning", level: 92 },
];

const testimonials = [
    { quote: "Homework time is no longer stressful — huge improvement!", name: "Maria L.", role: "Parent" },
    { quote: "I finally understand my assignments instead of guessing.", name: "Ethan P.", role: "Student" },
    { quote: "The step‑by‑step help boosted my confidence.", name: "Zara K.", role: "Student" },
];
</script>

<style scoped>
.homework-view {
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

/* CATEGORY CARDS */
.categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.7rem;
    margin-bottom: 3rem;
}

.category-card {
    background: white;
    border-radius: 14px;
    padding: 1.7rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    cursor: pointer;
}

.category-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2.4rem;
    margin-bottom: 0.7rem;
}

/* TOOLS */
.tools {
    margin-bottom: 3rem;
}

.tools h2 {
    margin-bottom: 1rem;
    color: #1a237e;
    font-weight: 600;
}

.tools ul {
    list-style: none;
    padding: 0;
}

.tools li {
    margin-bottom: 0.6rem;
    font-size: 1.05rem;
}

/* SKILL BARS */
.skills {
    margin-bottom: 3rem;
}

.skills h2 {
    margin-bottom: 1rem;
    color: #4a148c;
    font-weight: 600;
}

.skill-bar {
    margin-bottom: 1rem;
}

.skill-title {
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