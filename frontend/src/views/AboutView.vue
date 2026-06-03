<template>
  <div class="about-container">
    <!-- Section 1: Hero/Mission -->
    <section class="about-hero">
      <div class="hero-content">
        <h1 class="hero-title">Learn With Ease Tutors</h1>
        <p class="hero-subtitle">Transforming Education, One Student at a Time</p>
      </div>
      <div class="hero-accent"></div>
    </section>

    <!-- Section 2: Our Story -->
    <section class="about-section story-section">
      <div class="section-wrapper">
        <div class="section-content">
          <h2 class="section-title">Our Story</h2>
          <p class="section-text">
            Learn With Ease Tutors was founded with a simple mission: to make quality education accessible to every
            student.
            We believe that every child deserves personalized attention and expert guidance to unlock their full
            potential.
          </p>
          <p class="section-text">
            Our platform combines cutting-edge technology with experienced educators to create an interactive learning
            experience
            that adapts to each student's unique learning style and pace.
          </p>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">📚</div>
              <h3>Expert Tutors</h3>
              <p>Highly qualified educators with years of experience</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎯</div>
              <h3>Personalized Learning</h3>
              <p>Tailored lessons for each student's needs</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💡</div>
              <h3>Interactive Platform</h3>
              <p>Modern tools for engaging online classes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Our Values -->
    <section class="about-section values-section">
      <div class="section-wrapper">
        <h2 class="section-title">Our Core Values</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-number">01</div>
            <h3 class="value-title">Excellence</h3>
            <p class="value-description">
              We are committed to providing the highest quality education and support to our students.
            </p>
            <div class="value-accent"></div>
          </div>
          <div class="value-card">
            <div class="value-number">02</div>
            <h3 class="value-title">Accessibility</h3>
            <p class="value-description">
              Education should be available to everyone, everywhere, at any time they need it.
            </p>
            <div class="value-accent"></div>
          </div>
          <div class="value-card">
            <div class="value-number">03</div>
            <h3 class="value-title">Innovation</h3>
            <p class="value-description">
              We continuously evolve our platform to incorporate the latest in educational technology.
            </p>
            <div class="value-accent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Call to Action -->
    <section class="about-cta">
      <h2>Ready to Transform Your Learning Journey?</h2>
      <p>Join thousands of students who are already achieving their goals with Learn With Ease Tutors</p>
      <RouterLink to="/signup" class="cta-button">Get Started Today</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.about-container {
  width: 100%;
  overflow: hidden;
}

/* Hero Section */
.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

.about-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(30px);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  animation: slideUp 0.8s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 300;
  opacity: 0.95;
}

.hero-accent {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: white;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    width: 80px;
    opacity: 1;
  }

  50% {
    width: 120px;
    opacity: 0.7;
  }
}

/* Story Section */
.story-section {
  background: linear-gradient(to bottom, #f8f9fa 0%, #f0f0f0 100%);
}

.section-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 100%;
}

.section-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: #667eea;
  margin: 1rem auto 0;
  border-radius: 2px;
}

.section-text {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-item h3 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.feature-item p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Values Section */
.values-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  padding: 6rem 2rem;
}

.values-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 1;
}

.value-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.value-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.value-number {
  font-size: 4rem;
  font-weight: 800;
  color: #667eea;
  opacity: 0.15;
  position: absolute;
  top: 10px;
  right: 15px;
}

.value-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.value-description {
  color: #475569;
  line-height: 1.7;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.value-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.4s ease;
}

.value-card:hover .value-accent {
  width: 100%;
}

/* CTA Section */
.about-cta {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.about-cta::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent);
  border-radius: 50%;
}

.about-cta h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.about-cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-cta h2 {
    font-size: 1.8rem;
  }

  .about-cta p {
    font-size: 1rem;
  }

  .feature-item {
    padding: 1.5rem;
  }
}
</style>
