import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import TutorView from '../views/TutorView.vue';
import ContactView from '../views/ContactView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import AdminView from '../views/AdminView.vue';
import AdminTutorDetails from '../views/AdminTutorDetails.vue';
import AdminTutorEdit from '../views/AdminTutorEdit.vue';
import AdminContactDetails from '../views/AdminContactDetails.vue';
import AdminContactEdit from '../views/AdminContactEdit.vue';
import AdminRegistrationDetails from '../views/AdminRegistrationDetails.vue';
import AdminRegistrationEdit from '../views/AdminRegistrationEdit.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import TutorList from '../views/TutorList.vue';
import ClassroomView from '../views/ClassroomView.vue';
import MathView from '../views/MathView.vue';
import BusinessView from '../views/BusinessView.vue';
import EnglishView from '../views/EnglishView.vue';
import ScienceView from '../views/ScienceView.vue';
import ArtsView from '../views/ArtsView.vue';
import ExamView from '../views/ExamView.vue';
import CodingView from '../views/CodingView.vue';
import HomeworkView from '../views/HomeworkView.vue';
import ParentsDashBoard from '../views/ParentsDashBoard.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactView
    },
    {
        path: '/tutor',
        name: 'Tutor',
        component: TutorView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegistrationView
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminView,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    },
    {
        path: '/admin/tutor/:id/details',
        name: 'AdminTutorDetails',
        component: AdminTutorDetails,
        props: true
    },
    {
        path: '/admin/tutor/:id/edit',
        name: 'AdminTutorEdit',
        component: AdminTutorEdit,
        props: true
    },
    {
        path: '/admin/contact/:id/details',
        name: 'AdminContactDetails',
        component: AdminContactDetails,
        props: true
    },
    {
        path: '/admin/contact/:id/edit',
        name: 'AdminContactEdit',
        component: AdminContactEdit,
        props: true
    },
    {
        path: '/admin/registration/:id/details',
        name: 'AdminRegistrationDetails',
        component: AdminRegistrationDetails,
        props: true
    },
    {
        path: '/admin/registration/:id/edit',
        name: 'AdminRegistrationEdit',
        component: AdminRegistrationEdit,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/tutorlist',
        name: 'TutorList',
        component: TutorList
    },
    {
        path: '/classroom/:sessionId',
        name: 'Classroom',
        component: ClassroomView
    },
    {
        path: '/maths',
        name: 'Maths',
        component: MathView
    },
    {
        path: '/business',
        name: 'Business',
        component: BusinessView
    },
    {
        path: '/english',
        name: 'English',
        component: EnglishView
    },
    {
        path: '/science',
        name: 'Science',
        component: ScienceView
    },
    {
        path: '/arts',
        name: 'Arts',
        component: ArtsView
    },
    {
        path: '/exams',
        name: 'Exam',
        component: ExamView
    },
    {
        path: '/coding',
        name: 'Coding',
        component: CodingView
    },
    {
        path: '/homework',
        name: 'Homework',
        component: HomeworkView
    },
    {
        path: '/parentsdashboard',
        name: 'ParentsDashboard',
        component: () => import('../views/ParentsDashBoard.vue'),
        meta: { requiresAuth: true, roles: 'parents' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard to protect admin routes (original: used undefined `auth` variable)
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.roles) {
        if (!authStore.user) return next('/login');
        if (!authStore.hasRole(to.meta.roles)) return next('/forbidden');
    }
    if (to.meta.requiresClassroom) {
        if (!authStore.user) return next('/login');

        // Only alllow tutors and students to access classroom sessions
        if (!['tutor', 'child'].includes(authStore.user.role)) {
            return next('/forbidden');
        }
    }
    next();
});

export default router