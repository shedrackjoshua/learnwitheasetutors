<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Learn With Ease Tutors</h1>
        <p class="hero-subtitle">Unlock Your Child's Potential With Personalized Online Tutoring</p>
        <RouterLink to="/contact" class="cta-button">Get In Touch</RouterLink>
      </div>
    </section>

    <section class="projects">
      <div class="container">
        <h2>How We Work</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-image">
              <img src="/yourchildneeds.png" alt="Project-Image">
            </div>
            <div class="project-header">
              <h3>Tell Us What your Child Needs</h3>
            </div>
            <p>Choose the subjects, grade level and learning goals, and we will match your child with a qualified tutor
              who fits their learning style and needs</p>

          </div>

          <div class="project-card">
            <div class="project-image">
              <img src="/liveclassroom.png" alt="Project-Image">
            </div>
            <div class="project-header">
              <h3>Join A Live, Interactive Classroom</h3>
            </div>
            <p>HD video, shared whiteboard, and real-time online classes with experienced tutors who guide your child
              through personalized lessons.</p>

          </div>

          <div class="project-card">
            <div class="project-image">
              <img src="/progess.png" alt="Project-image">
            </div>
            <div class="project-header">
              <h3>Track Progress and Achievements</h3>
            </div>
            <p>Parents receive monthly reports, session summaries, and progress updates to ensure their child is on
              track and achieving their learning goals.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="skills">
      <div class="container-skills">
        <div>
          <img src="/canva3.png" alt="Skills-Image" class="skills-image">
        </div>
        <div class="skills-grid">
          <h3>Why Choose Us</h3>
          <h4>Personalized 1-on-1 Tutoring</h4>
          <p>Our tutors tailor each session to your child's unique learning style, pace, strength and challenges.</p>
          <h4>Experienced and Qualified Tutors</h4>
          <p>Our tutors are highly qualified, experienced, and passionate about teaching. We carefully vet and train our
            tutors to ensure they provide the best possible learning experience for your child.</p>
          <h4>Modern, Engaging Classroom</h4>
          <p>Zoom-like interface with whiteboard, screen sharing, chat, and session recordings</p>
          <h4>Flexible Scheduling</h4>
          <p>Booking session anytime - morning, evening or weekends</p>
          <h4>Safe & Secure Learning Environment</h4>
          <p>Your child's safety and privacy comes first with encrypted sessions and monitored interactions.</p>
        </div>
      </div>
    </section>

    <!-- Fourth Section: Testimonials -->
    <section class="testimonials">
      <div class="testimonials-container">
        <h2 class="testimonials-title">What Our Students & Parents Say</h2>
        <p class="testimonials-subtitle">Join thousands achieving their learning goals with us</p>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">My daughter's grades improved dramatically within 3 months. The personalized
              approach and experienced tutors made all the difference!</p>
            <div class="testimonial-author">
              <div class="author-avatar">CS</div>
              <div class="author-info">
                <h4 class="author-name">Sarah Johnson</h4>
                <p class="author-role">Parent - Mathematics</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">I finally understand concepts that were confusing before. The tutors are
              patient, knowledgeable, and make learning fun!</p>
            <div class="testimonial-author">
              <div class="author-avatar">MO</div>
              <div class="author-info">
                <h4 class="author-name">Michael Oluwasegun</h4>
                <p class="author-role">Student - Physics</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">The flexible scheduling is perfect for our busy family. The interactive platform
              is user-friendly and engaging!</p>
            <div class="testimonial-author">
              <div class="author-avatar">AC</div>
              <div class="author-info">
                <h4 class="author-name">Alozie Chinedu</h4>
                <p class="author-role">Parent - English</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">Best decision we made for our son! His confidence in studying has increased
              tremendously and his performance is excellent.</p>
            <div class="testimonial-author">
              <div class="author-avatar">DO</div>
              <div class="author-info">
                <h4 class="author-name">David Ocha</h4>
                <p class="author-role">Parent - Science</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">The one-on-one sessions really help me focus on my weak areas. My tutor is
              always encouraging and supportive!</p>
            <div class="testimonial-author">
              <div class="author-avatar">MS</div>
              <div class="author-info">
                <h4 class="author-name">Morris Simon</h4>
                <p class="author-role">Student - Chemistry</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="card-header">
              <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <p class="testimonial-text">Exceptional service! The platform is intuitive, the tutors are experts, and the
              results speak for themselves. Highly recommended!</p>
            <div class="testimonial-author">
              <div class="author-avatar">JO</div>
              <div class="author-info">
                <h4 class="author-name">James Opaogun</h4>
                <p class="author-role">Parent - History</p>
              </div>
            </div>
          </div>
        </div>

        <div class="testimonials-stats">
          <div class="stat-box">
            <h3 class="stat-number">500+</h3>
            <p class="stat-label">Active Students</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">200+</h3>
            <p class="stat-label">Expert Tutors</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">95%</h3>
            <p class="stat-label">Success Rate</p>
          </div>
          <div class="stat-box">
            <h3 class="stat-number">50+</h3>
            <p class="stat-label">Subjects</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fifth Section: CTA for Registration -->
    <section class="cta-section">
      <div class="cta-wrapper">
        <div class="cta-content">
          <h2 class="cta-title">Give Your Child The Edge They Deserve</h2>
          <p class="cta-description">Join thousands of parents who've transformed their child's academic journey with
            personalized tutoring.</p>
          <RouterLink to="/register" class="register-button">Register Your Child Today</RouterLink>
        </div>
        <div class="cta-decorations">
          <div class="deco-circle deco-1"></div>
          <div class="deco-circle deco-2"></div>
          <div class="deco-circle deco-3"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue';

document.addEventListener("scroll", () => {
  const skillsGrid = document.querySelector(".skills-grid");
  const rect = skillsGrid.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsGrid.classList.add("visible");
  }
});


onMounted(() => {
  const projectCards = document.querySelectorAll('.project-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const statBoxes = document.querySelectorAll('.stat-box');

  // Count-up animation for stats
  const animateCount = (el, target, delay) => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));

    setTimeout(() => {
      const timer = setInterval(() => {
        start += 1;
        el.textContent = start + '+'; // add + symbol
        if (start >= target) {
          clearInterval(timer);
          el.textContent = target + '+'; // final value
        }
      }, stepTime);
    }, delay);
  };

  // Intersection Observer for all elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible'); // fade-in effect

        // Animate stats only
        if (el.classList.contains('stat-box')) {
          const numberEl = el.querySelector('.stat-number');
          const target = parseInt(numberEl.textContent.replace(/\D/g, ''));
          animateCount(numberEl, target, index * 500); // staggered delay
        }

        observer.unobserve(el); // animate once
      }
    });
  }, { threshold: 0.3 });

  // Observe all cards and stats
  [...projectCards, ...testimonialCards, ...statBoxes].forEach(el => observer.observe(el));
});
</script>

<style scoped>
.home {
  width: 100%;
}

.hero {
  background-image: url('/newimage.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 6rem 1rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  animation: fadeInDown 0.6s ease;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.projects {
  padding: 0.1rem 1rem 2.5rem 1rem;
  background: #f3f4f6;
  position: relative;
  overflow: hidden;
}

.projects::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08), transparent);
  border-radius: 50%;
}

.projects h2 {
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #2563eb;
  font-weight: 800;
  letter-spacing: -1px;
  position: relative;
  z-index: 1;
  font-family: 'Georgia', 'Garamond', 'Serif';
  font-style: italic;
  background: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.projects h2::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 1rem auto 0;
  border-radius: 2px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
}

.project-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.project-card.visible {
  transform: translateY(0);
  opacity: 1;
}

.project-card,
.testimonial-card,
.stat-box {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.project-card.visible,
.testimonial-card.visible,
.stat-box.visible {
  opacity: 1;
  transform: translateY(0);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.4s ease;
  transform-origin: left;
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.project-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}

.project-image img {
  width: 80px;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.2));
  transition: all 0.4s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.15) rotate(5deg);
  filter: drop-shadow(0 8px 20px rgba(2, 7, 36, 0.3));
}

.project-header {
  margin-bottom: 1rem;
}

.project-header h3 {
  font-family: 'inter', sans-serif;
  color: #2563eb;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.project-card:hover .project-header h3 {
  color: #102068;
}

.project-card p {
  color: #475569;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Modern Skills Section */
.skills {
  padding: 2rem 2rem;
  background: linear-gradient(135deg, #f9fafc 0%, #eef2f7 100%);
  position: relative;
  overflow: hidden;
}

.container-skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.skills-image {
  width: 100%;
  max-width: 550px;
  height: 520px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.6s ease, box-shadow 0.6s ease;
  animation: floatImage 6s ease-in-out infinite;
}

.skills-image:hover {
  transform: scale(1.05) rotateY(3deg);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, opacity 0.6s ease;
  opacity: 0;
  transform: translateY(40px);
}

.skills-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.skills-grid h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.1rem;
  position: relative;
  margin-top: 0.1rem;
}

.skills-grid h3::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #2563eb;
  margin-top: 0.1rem;
  border-radius: 2px;
  animation: slideIn 1s ease forwards;
}

.skills-grid h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 0.1rem;
  transition: color 0.3s ease;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  margin-top: 0.1rem;
}

.skills-grid h4::before {
  content: "★";
  color: #facc15;
  margin-right: 8px;
  font-size: 1.2rem;
  animation: pulse 2s infinite;
}

.skills-grid h4:hover {
  color: #1e40af;
}

.skills-grid p {
  font-size: 1rem;
  color: #374151;
  line-height: 1.5;
  margin: 0;
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.skills-grid p:hover {
  opacity: 0.85;
}

/* Animations */
@keyframes floatImage {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 60px;
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered animation for skill items */
.skills-grid.visible h4:nth-of-type(1),
.skills-grid.visible p:nth-of-type(1) {
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 0.2s;
}

.skills-grid.visible h4:nth-of-type(2),
.skills-grid.visible p:nth-of-type(2) {
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 0.4s;
}

.skills-grid.visible h4:nth-of-type(3),
.skills-grid.visible p:nth-of-type(3) {
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 0.6s;
}

.skills-grid.visible h4:nth-of-type(4),
.skills-grid.visible p:nth-of-type(4) {
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 0.8s;
}

.skills-grid.visible h4:nth-of-type(5),
.skills-grid.visible p:nth-of-type(5) {
  animation: fadeUp 0.6s ease forwards;
  animation-delay: 1s;
}

@media (max-width: 900px) {
  .container-skills {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .skills-image {
    margin: 0 auto;
  }
}

.project-image img {
  width: 7rem;
  height: auto;
  border-radius: 8px;
  display: block;
}

.project-image {
  display: flex;
  justify-content: center;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
  font-weight: 500;
}

/* ============ TESTIMONIALS SECTION ============ */
.testimonials {
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #eef2f7 50%, #e0e7ff 100%);
  position: relative;
  overflow: hidden;
}

.testimonials::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

.testimonials::after {
  content: '';
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.1), transparent);
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

.testimonials-container {
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.testimonials-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  text-align: center;
  margin-bottom: 0.2rem;
  letter-spacing: -0.5px;
  font-family: 'Trebuchet MS', 'Lucida Grande', sans-serif;
}

.testimonials-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 1rem auto 0;
  border-radius: 2px;
}

.testimonials-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  text-align: center;
  margin-bottom: 0.8rem;
}

/* Testimonials Grid with Flexbox */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Testimonial Cards */

.testimonial-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.testimonial-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.testimonial-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(79, 70, 229, 0.25);
}

/* Stars shimmer effect */
.stars {
  background: linear-gradient(90deg, #4f46e5, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.8;
  }
}

.card-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.stars {
  font-size: 1rem;
  letter-spacing: 0.2rem;
  order: -1;
  text-align: center;
  width: 100%;
}

.quote-icon {
  font-size: 2.5rem;
  color: #667eea;
  opacity: 0.2;
  line-height: 1;
}

.testimonial-text {
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-style: italic;
}

/* Author Section with Flexbox */
.testimonial-author {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
  justify-content: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  color: #1e293b;
  font-weight: 700;
  margin: 0;
  font-size: 1rem;
}

.author-role {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0.2rem 0 0 0;
}

/* Stats Section */
.testimonials-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid rgba(102, 126, 234, 0.2);
}

/* Stat Box Styling */
.stat-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin: 0 0 0.5rem 0;
}

.stat-label {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials {
    padding: 3rem 1rem;
  }

  .testimonials-title {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .testimonials-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonial-card {
    padding: 1.5rem;
  }
}

/* Fifth Section: CTA */
.cta-section {
  padding: 3rem 1rem 0 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  position: relative;
  overflow: hidden;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.cta-wrapper {
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
  animation: slideUp 0.6s ease-out;
}

.cta-description {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
  font-weight: 300;
  animation: slideUp 0.6s ease-out 0.1s both;
}

.register-button {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  animation: slideUp 0.6s ease-out 0.2s both;
}

.register-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.register-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  background: #f8f9fa;
}

.register-button:hover::before {
  left: 100%;
}

/* Decorative Circles */
.cta-decorations {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.deco-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  background: white;
  animation: float 6s ease-in-out infinite;
}

.deco-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  background: white;
  animation: float 8s ease-in-out infinite reverse;
}

.deco-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 10%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 10s ease-in-out infinite;
}

/* Responsive CTA */
@media (max-width: 768px) {
  .cta-section {
    padding: 2.5rem 1rem 0 1rem;
    min-height: 250px;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .register-button {
    padding: 0.9rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .cta-section {
    padding: 2rem 1rem 0 1rem;
    height: 60vh;
  }

  .cta-title {
    font-size: 1.6rem;
  }

  .cta-description {
    font-size: 0.95rem;
  }

  .register-button {
    padding: 0.85rem 1.8rem;
    font-size: 0.95rem;
  }

  .deco-1 {
    width: 200px;
    height: 200px;
  }

  .deco-2 {
    width: 150px;
    height: 150px;
  }

  .deco-3 {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    display: flex;
    flex-direction: column;
    /* single column */
    align-items: center;
    /* center grid items */
  }

  .project-card {
    width: 100%;
    /* shrink card width */
    max-width: 320px;
    /* prevent oversized cards */
  }
}
</style>