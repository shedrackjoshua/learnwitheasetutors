<template>
    <div class="coding-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Learn Coding With Confidence</h1>
            <p class="hero-subtitle">
                Master programming fundamentals, build real projects, and develop future‑ready tech skills
                with expert guidance and interactive lessons.
            </p>
        </section>

        <!-- Coding Topic Cards -->
        <section class="topics">
            <div class="topic-card" v-for="topic in topics" :key="topic.title">
                <div class="icon">{{ topic.icon }}</div>
                <h2>{{ topic.title }}</h2>
                <p>{{ topic.description }}</p>
            </div>
        </section>

        <!-- What You’ll Build -->
        <section class="projects">
            <h2>What You’ll Build</h2>
            <ul>
                <li>💡 Interactive websites using HTML, CSS, and JavaScript.</li>
                <li>📱 Simple apps and games with real code.</li>
                <li>🤖 Beginner‑friendly AI and automation scripts.</li>
                <li>🗄️ Databases and backend logic for real projects.</li>
            </ul>
        </section>

        <!-- Skill Progress Bars -->
        <section class="skills">
            <h2>Your Skill Growth</h2>
            <div class="skill-bar" v-for="skill in skills" :key="skill.title">
                <span class="skill-title">{{ skill.title }}</span>
                <div class="bar">
                    <div class="fill" :style="{ width: skill.level + '%' }"></div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="testimonials">
            <h2>Student Success Stories</h2>
            <div class="testimonial-card" v-for="t in testimonials" :key="t.name">
                <p class="quote">“{{ t.quote }}”</p>
                <p class="author">— {{ t.name }}, {{ t.role }}</p>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta">
            <h2>Start Your Coding Journey Today</h2>
            <RouterLink to="/register" class="cta-button">Book a Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const topics = [
    { title: "HTML & CSS", icon: "🌐", description: "Build beautiful, responsive websites from scratch." },
    { title: "JavaScript", icon: "⚡", description: "Make websites interactive with real programming logic." },
    { title: "Python", icon: "🐍", description: "Learn the world’s most beginner‑friendly programming language." },
    { title: "Game Development", icon: "🎮", description: "Create simple games and animations using code." },
    { title: "AI & Automation", icon: "🤖", description: "Build smart scripts and explore beginner AI concepts." },
];

const skills = [
    { title: "Problem Solving", level: 92 },
    { title: "Coding Logic", level: 88 },
    { title: "Project Building", level: 90 },
    { title: "Debugging Skills", level: 85 },
];

const testimonials = [
    { quote: "My son built his first website in just 3 weeks!", name: "Daniel M.", role: "Parent" },
    { quote: "Coding lessons helped me understand logic and problem‑solving.", name: "Ava T.", role: "Student" },
    { quote: "I created my first game — it felt amazing!", name: "Leo R.", role: "Student" },
];
</script>

<style scoped>
.coding-view {
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

/* TOPIC CARDS */
.topics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.7rem;
    margin-bottom: 3rem;
}

.topic-card {
    background: white;
    border-radius: 14px;
    padding: 1.7rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    cursor: pointer;
}

.topic-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2.4rem;
    margin-bottom: 0.7rem;
}

/* PROJECTS */
.projects {
    margin-bottom: 3rem;
}

.projects h2 {
    margin-bottom: 1rem;
    color: #1a237e;
    font-weight: 600;
}

.projects ul {
    list-style: none;
    padding: 0;
}

.projects li {
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