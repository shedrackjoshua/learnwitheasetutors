<template>
    <div class="arts-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Unleash Creativity Through the Arts</h1>
            <p class="hero-subtitle">
                Inspire imagination and build artistic confidence with expert tutoring in visual arts,
                music, drama, media studies, and creative expression.
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
            <h2>Why Choose Our Arts Program?</h2>
            <ul>
                <li>🎨 Encourages creativity, imagination, and self‑expression.</li>
                <li>🎭 Builds confidence through performance and presentation.</li>
                <li>🎧 Develops artistic technique with expert guidance.</li>
                <li>📺 Modern approach using digital tools and media platforms.</li>
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
            <h2>Start Your Creative Journey Today</h2>
            <RouterLink to="/register" class="cta-button">Book a Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const topics = [
    { title: "Visual Arts", icon: "🎨", description: "Drawing, painting, digital art, design fundamentals." },
    { title: "Music", icon: "🎵", description: "Music theory, vocal training, instruments, composition." },
    { title: "Drama & Theatre", icon: "🎭", description: "Acting, script analysis, stage performance, confidence building." },
    { title: "Media Studies", icon: "📺", description: "Film analysis, digital media, storytelling, content creation." },
    { title: "Creative Writing", icon: "🖋️", description: "Poetry, short stories, narrative structure, expressive writing." },
];

const testimonials = [
    { quote: "My son discovered his passion for drawing thanks to these lessons!", name: "Caroline M.", role: "Parent" },
    { quote: "Drama classes helped me become more confident on stage.", name: "Liam S.", role: "Student" },
    { quote: "The music sessions were inspiring and fun every week.", name: "Nadia P.", role: "Student" },
];
</script>

<style scoped>
.arts-view {
    font-family: 'Poppins', sans-serif;
    color: #222;
    padding: 2rem;
}

/* HERO */
.hero {
    text-align: center;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
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

/* SUBJECT CARDS */
.subjects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.7rem;
    margin-bottom: 3rem;
}

.subject-card {
    background: white;
    border-radius: 14px;
    padding: 1.7rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    cursor: pointer;
}

.subject-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2.4rem;
    margin-bottom: 0.7rem;
}

/* BENEFITS */
.benefits {
    margin-bottom: 3rem;
}

.benefits h2 {
    margin-bottom: 1rem;
    color: #6a11cb;
    font-weight: 600;
}

.benefits ul {
    list-style: none;
    padding: 0;
}

.benefits li {
    margin-bottom: 0.6rem;
    font-size: 1.05rem;
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
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    padding: 0.9rem 1.7rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s ease;
}

.cta-button:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
}
</style>