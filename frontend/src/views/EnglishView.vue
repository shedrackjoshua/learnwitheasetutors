<template>
    <div class="english-view">
        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Unlock the Power of English</h1>
            <p class="hero-subtitle">
                From grammar and writing to literature and exam prep — our English tutors help students
                build confidence, sharpen communication skills, and excel academically.
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
            <h2>Why Study English with Us?</h2>
            <ul>
                <li>📚 Strengthen grammar and writing foundations.</li>
                <li>🖋️ Develop creative and analytical skills through literature.</li>
                <li>🎤 Improve communication and public speaking confidence.</li>
                <li>📖 Tailored support for GCSE, A‑Level, SAT, and ACT exams.</li>
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
            <h2>Start Your Child’s English Journey Today</h2>
            <RouterLink to="/register" class="cta-button">Book a Lesson</RouterLink>
        </section>
    </div>
</template>

<script setup>
const topics = [
    { title: "Grammar & Writing", icon: "✍️", description: "Sentence structure, punctuation, essay writing, creative writing." },
    { title: "Reading Comprehension", icon: "📖", description: "Analyzing texts, understanding themes, critical reading skills." },
    { title: "English Literature", icon: "📚", description: "Poetry, novels, plays, literary analysis and appreciation." },
    { title: "Public Speaking", icon: "🎤", description: "Confidence building, presentations, persuasive communication." },
    { title: "Exam Prep", icon: "📝", description: "GCSE, A‑Level, SAT, ACT, and standardized test strategies." },
];

const testimonials = [
    { quote: "My daughter’s essay writing improved dramatically!", name: "Linda P.", role: "Parent" },
    { quote: "The literature sessions made Shakespeare fun and engaging.", name: "Tom R.", role: "Student" },
    { quote: "I gained confidence in public speaking thanks to these lessons.", name: "Aisha K.", role: "Student" },
];
</script>

<style scoped>
.english-view {
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

.benefits,
.testimonials {
    margin-bottom: 3rem;
}

.benefits h2,
.testimonials h2 {
    margin-bottom: 1rem;
    color: #1a237e;
}

.benefits ul {
    list-style: none;
    padding: 0;
}

.benefits li {
    margin-bottom: 0.5rem;
}

.testimonial-card {
    background: #f9f9f9;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.quote {
    font-style: italic;
}

.author {
    font-weight: bold;
    margin-top: 0.5rem;
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