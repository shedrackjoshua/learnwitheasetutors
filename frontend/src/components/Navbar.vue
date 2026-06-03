<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="nav-logo">
        <img src="/cropped4.png" alt="Learn With Ease Tutors" class="logo">
      </RouterLink>
      <button class="dark-toggle" @click="toggleDark">
        <i v-if="isDark" class="fas fa-sun"></i>
        <i v-else class="fas fa-moon"></i>
      </button>
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>

      <ul class="nav-menu" :class="{ open: menuOpen }">
        <li>
          <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">About
          </RouterLink>
        </li>
        <li class="nav-item-with-dropdown" style="position: relative;" @mouseenter="openDropdownHover"
          @mouseleave="closeDropdownHover">

          <div style="display:flex;align-items:center;gap:0.4rem;">
            <!-- Parent trigger (no navigation) -->
            <span class="nav-link">Subjects</span>
            <button class="caret-btn" @click.stop="toggleDropdown" aria-label="Toggle subjects menu">▾</button>
          </div>

          <!-- Dropdown menu -->
          <transition name="dropdown">
            <ul v-if="dropdownOpen" class="dropdown-menu" @click.stop
              style="position:absolute;left:0;top:100%;margin-top:8px;">
              <li>
                <RouterLink to="/maths" class="dropdown-link" :class="{ active: $route.path === '/maths' }">Maths
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/english" class="dropdown-link" :class="{ active: $route.path === '/english' }">English
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/science" class="dropdown-link" :class="{ active: $route.path === '/science' }">Science
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/business" class="dropdown-link" :class="{ active: $route.path === '/business' }">
                  Business &amp; Economics</RouterLink>
              </li>
              <li>
                <RouterLink to="/arts" class="dropdown-link" :class="{ active: $route.path === '/arts' }">Arts &amp;
                  Humanities</RouterLink>
              </li>
              <li>
                <RouterLink to="/exams" class="dropdown-link" :class="{ active: $route.path === '/exams' }">Exam Prep
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/coding" class="dropdown-link" :class="{ active: $route.path === '/coding' }">Coding
                </RouterLink>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <RouterLink to="/contact" class="nav-link" :class="{ active: $route.path === '/contact' }">Contact
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/register" class="nav-link" :class="{ active: $route.path === '/register' }">Register
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`/classroom/${authStore.sessionId}`" class="nav-link"
            :class="{ active: $route.path.startsWith('/classroom') }">Classroom</RouterLink>
        </li>
      </ul>

      <!-- AUTH + DARK MODE + AVATAR -->
      <div class="auth-action">

        <!-- DARK MODE -->

        <span v-if="authStore.user">Welcome, {{ authStore.user.username || authStore.user.name }}</span>
        <button v-if="authStore.user" @click="handleLogout">Logout</button>
        <RouterLink v-else to="/login" class="nav-links login-btn" :class="{ active: $route.path === '/login' }">Login
        </RouterLink>
        <RouterLink to="/signup" class="nav-links signup-btn" :class="{ active: $route.path === '/signup' }">Signup
        </RouterLink>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';


const authStore = useAuthStore();
const router = useRouter();
const menuOpen = ref(false);
const isDark = ref(false);
const dropdownOpen = ref(false);
const _openTimer = { id: null };
const _closeTimer = { id: null };

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function openDropdownHover() {
  // clear any pending close
  if (_closeTimer.id) { clearTimeout(_closeTimer.id); _closeTimer.id = null; }
  if (!dropdownOpen.value) {
    _openTimer.id = setTimeout(() => { dropdownOpen.value = true; _openTimer.id = null; }, 120);
  }
}

function closeDropdownHover() {
  if (_openTimer.id) { clearTimeout(_openTimer.id); _openTimer.id = null; }
  _closeTimer.id = setTimeout(() => { dropdownOpen.value = false; _closeTimer.id = null; }, 160);
}

function closeMenu() {
  menuOpen.value = false;
}
function toggleDark() {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-mode', isDark.value);
}

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 10) {
      nav.classList.add("nav-shadow");
    } else {
      nav.classList.remove("nav-shadow");
    }
  });
  // close dropdown when clicking outside
  const handleOutside = (e) => {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;
    if (!nav.contains(e.target)) {
      dropdownOpen.value = false;
    }
  };
  document.addEventListener('click', handleOutside);
  // store handler to remove later
  window.__navDropdownOutside = handleOutside;
});

onBeforeUnmount(() => {
  if (window.__navDropdownOutside) {
    document.removeEventListener('click', window.__navDropdownOutside);
    delete window.__navDropdownOutside;
  }
  if (_openTimer.id) { clearTimeout(_openTimer.id); _openTimer.id = null; }
  if (_closeTimer.id) { clearTimeout(_closeTimer.id); _closeTimer.id = null; }
});
</script>

<style scoped>
/* NAVBAR BASE */
.navbar {
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  backdrop-filter: blur(14px);
  background: rgba(255, 255, 255, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.nav-shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* DARK MODE */
.dark-mode .navbar {
  background: rgba(20, 20, 20, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-mode .nav-link,
.dark-mode .logo-text {
  color: #f1f1f1;
}

/* CONTAINER */
.nav-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-sizing: border-box;
}

/* LOGO */
.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
}

.logo {
  width: auto;
  height: 53px;
  object-fit: contain;
  margin-left: 2rem;
  padding: 0;
  display: block;
  background: transparent;
  vertical-align: middle;
}

/* NAV MENU */
.nav-menu {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.nav-link {
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  transition: 0.3s ease;
}

/* Animated underline */
.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 3px;
  background: #2563eb;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
  box-shadow: 0 0 8px #2563eb;
}

/* AUTH SECTION */
.auth-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* DARK MODE BUTTON */
.dark-toggle {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #333;
}

.dark-mode .dark-toggle {
  color: #fff;
}

/* AVATAR */
.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #2563eb;
}

/* DROPDOWN */
.dropdown {
  position: absolute;
  right: 0;
  top: 48px;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 180px;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 0;
  color: #333;
  cursor: pointer;
}

.dropdown-item.logout {
  color: red;
}

/* dropdown menu used under Subjects */
.dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  min-width: 200px;
  z-index: 1100;
}

.dropdown-menu .dropdown-link {
  display: block;
  padding: 0.6rem 1rem;
  color: #333;
  text-decoration: none;
}

.dropdown-menu .dropdown-link:hover {
  background: rgba(37, 99, 235, 0.06);
}

.caret-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  padding: 4px 6px;
  border-radius: 6px;
}

.caret-btn:hover {
  background: rgba(0, 0, 0, 0.04);
}

/* dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 180ms ease, transform 200ms cubic-bezier(.2, .9, .2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* LOGIN & SIGNUP BUTTONS */
.login-btn,
.signup-btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

/* LOGIN BUTTON - Glassmorphism Style */
.login-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  color: #2563eb;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
}

.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.login-btn:hover {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(37, 99, 235, 0.25);
}

.login-btn:hover::before {
  opacity: 1;
}

/* SIGNUP BUTTON - Gradient Luxury Style */
.signup-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
}

.signup-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.5);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.signup-btn:hover::before {
  opacity: 1;
}

.signup-btn.active {
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.6);
}

.login-btn.active {
  background: rgba(37, 99, 235, 0.2);
  border-color: rgba(37, 99, 235, 0.5);
}

/* DARK MODE */
.dark-mode .login-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #60a5fa;
}

.dark-mode .login-btn:hover {
  background: rgba(96, 165, 250, 0.15);
  border-color: rgba(96, 165, 250, 0.3);
}

/* MOBILE */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: #333;
  transition: 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

/* MOBILE MENU */
@media (max-width: 768px) {
  .nav-container {
    padding: 0.8rem 1rem;
    gap: 0.5rem;
  }

  .nav-menu {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    padding: 1rem 0;
    display: none;
  }

  .nav-menu.open {
    display: flex;
    animation: slideDown 0.3s ease;
  }

  .auth-action {
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hamburger {
    display: flex;
  }
}
</style>