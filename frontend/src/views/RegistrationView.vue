<template>
    <div class="registration-container">
        <section class="registration-section">
            <div class="registration-details">
                <h1>Register your child</h1>
                <p>Please fill out the information below to register your child.</p>
            </div>
            <form @submit.prevent="submitForm" class="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
                <transition name="fade-slide" mode="out-in">
                    <div :key="step">
                        <!-- STEP 1: Parent + First Child-->
                        <div v-if="step === 1">
                            <h2 class="text-xl font-semibold mb-4">Parent Information</h2>
                            <div class="mb-4">
                                <input type="text" id="parents_name" v-model="form.parents_name"
                                    placeholder="Parent's Full Name" required>
                            </div>
                            <div class="mb-4">
                                <input type="text" id="parents_email" v-model="form.parents_email"
                                    placeholder="Parent's Email" required>
                            </div>
                            <div class="mb-4">
                                <input type="tel" id="phone" v-model="form.phone" placeholder="Phone" required>
                            </div>
                            <div class="mb-4">
                                <input type="text" id="state_or_province" v-model="form.state_or_province"
                                    placeholder="State/Province" required>
                            </div>
                            <div class="mb-6">
                                <input type="text" id="country_or_region" v-model="form.country_or_region"
                                    placeholder="Country/Region" required>
                            </div>

                            <h2 class="text-xl font-semibold mb-4">First Child Information</h2>

                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <input type="text" id="wards_name" class="input" v-model="child.wards_name"
                                        placeholder="Child's Name" required>
                                </div>
                                <div>
                                    <select id="gender" v-model="child.gender" class="input" required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="email" id="students_email" v-model="child.students_email" class="input"
                                        placeholder="Child's Email (Optional)">
                                </div>
                                <div>
                                    <input type="text" id="students_grade_or_year"
                                        v-model="child.students_grade_or_year" class="input" placeholder="Grade/Year"
                                        required>
                                </div>
                                <div>
                                    <select id="tutoring_type" v-model="child.tutoring_type" class="input" required>
                                        <option value="">Select Tutoring Type</option>
                                        <option value="Online">Online</option>
                                        <option value="In-Person">In-Person</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="text" id="subject_enrolment" v-model="child.subject_enrolment"
                                        class="input" placeholder="Subjects">
                                </div>
                                <div>
                                    <input type="text" id="tutoring_objective" v-model="child.tutoring_objective"
                                        class="input" placeholder="Objective" required>
                                </div>
                                <div>
                                    <input type="text" id="specific_goals" v-model="child.specific_goals" class="input"
                                        placeholder="Specific Goals" required>
                                </div>
                                <div>
                                    <input type="text" id="availability" v-model="child.availability" class="input"
                                        placeholder="Availabilty" required>
                                </div>
                            </div>

                            <label class="block mt-4">
                                <span class="font-medium">Register another child?</span>
                                <select name="" id="register_another_child" v-model="form.register_another_child"
                                    class="input mt-1" required>
                                    <option :value="true">Yes</option>
                                    <option :value="false">No</option>
                                </select>
                            </label>

                            <div class="mt-6">
                                <!--If Parent wants to register another child-->
                                <button v-if="form.register_another_child === true" type="button"
                                    @click="addChildAndContinue" class="btn-primary">
                                    Next
                                </button>
                                <!--If parent says no, show submit button-->
                                <button v-else type="submit" class="btn-primary">
                                    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                                </button>
                            </div>
                        </div>
                        <!-- Step 2+: Addtional Children-->
                        <div v-else>
                            <h2 class="text-xl font-semibold mb-4">Child {{ step }} Information</h2>
                            <div class="grid grid-cols-1 gap-4">
                                <div>
                                    <input type="text" id="wards_name" v-model="child.wards_name" class="input"
                                        placeholder="Child's Name" required>
                                </div>
                                <div>
                                    <select id="gender" v-model="child.gender" class="input" required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="email" id="students_email" v-model="child.students_email" class="input"
                                        placeholder="Child's Email" required>
                                </div>
                                <div>
                                    <input type="text" id="students_grade_or_year"
                                        v-model="child.students_grade_or_year" class="input" placeholder="Grade/Year"
                                        required>
                                </div>
                                <div>
                                    <select id="tutoring_type" v-model="child.tutoring_type" class="input" required>
                                        <option value="">Select Tutoring Type</option>
                                        <option value="Online">Online</option>
                                        <option value="In-Person">In-Person</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="text" id="subject_enrolment" v-model="child.subject_enrolment"
                                        class="input" placeholder="Subjects" required>
                                </div>
                                <div>
                                    <input type="text" id="tutoring_objective" v-model="child.tutoring_objective"
                                        class="input" placeholder="Objectives" required>
                                </div>
                                <div>
                                    <input type="text" id="specific_goals" v-model="child.specific_goals" class="input"
                                        placeholder="Specific Goals" required>
                                </div>
                                <div>
                                    <input type="text" id="availability" v-model="child.availability" class="input"
                                        placeholder="Availability" required>
                                </div>
                            </div>

                            <label class="block mt-4">
                                <span class="font-medium">Register another child?</span>
                                <select id="register_another_child" v-model="form.register_another_child"
                                    class="input mt-1" required>
                                    <option :value="true">Yes</option>
                                    <option :value="false">No</option>
                                </select>
                            </label>

                            <div class="mt-6">
                                <button v-if="form.register_another_child === true" type="button"
                                    @click="addChildAndContinue" class="btn-primary">
                                    Next
                                </button>
                                <button v-else type="submit" class="btn-primary">
                                    {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- Submit messages -->
                <div class="mt-6">
                    <div v-if="submitMessage" class="text-green-600 mt-4">
                        {{ submitMessage }}
                    </div>
                    <div v-if="submitError" class="text-red-600 mt-4">
                        {{ submitError }}
                    </div>
                </div>
            </form>
            <div v-if="referralLink" class="mt-6">
                <h2 class="text-xl font-semibold mb-4">Your Referral Link</h2>
                <p>Share this link with others to refer them:</p>
                <input type="text" :value="referralLink" readonly class="input mt-2 w-full">
            </div>
        </section>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const referralLink = ref('');
const step = ref(1);

const form = ref({
    parents_name: '',
    parents_email: '',
    phone: '',
    state_or_province: '',
    country_or_region: '',
    register_another_child: false,
    children: []
});

const child = ref({
    wards_name: '',
    gender: '',
    students_email: '',
    students_grade_or_year: '',
    tutoring_type: '',
    subject_enrolment: '',
    tutoring_objective: '',
    specific_goals: '',
    availability: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitError = ref('');

onMounted(() => {
    if (route.query.ref) {
        form.value.referredBy = route.query.ref;
    }
});

const isChildEmpty = (c = child.value) => {
    return Object.values(c).every(v => v === '' || v == null);
};

const nextStep = () => {
    if (form.value.register_another_child === true) {
        step.value++;
    } else {
        submitForm();
    }
};

const addChildAndContinue = () => {
    form.value.children.push({ ...child.value });

    child.value = {
        wards_name: '',
        gender: '',
        students_email: '',
        students_grade_or_year: '',
        tutoring_type: '',
        subject_enrolment: '',
        tutoring_objective: '',
        specific_goals: '',
        availability: ''
    };

    if (form.value.register_another_child === true) {
        step.value++;
    } else {
        submitForm();
    }
};

const submitForm = async () => {
    isSubmitting.value = true;
    submitMessage.value = '';
    submitError.value = '';

    if (!isChildEmpty()) {
        form.value.children.push({ ...child.value });

        child.value = {
            wards_name: '',
            gender: '',
            students_email: '',
            students_grade_or_year: '',
            tutoring_type: '',
            subject_enrolment: '',
            tutoring_objective: '',
            specific_goals: '',
            availability: ''
        };
    }

    try {
        const response = await api.post('/registrations', form.value);

        //capture referral link from backend response
        referralLink.value = response.data.referralLink;

        submitMessage.value = 'Your registration was successful!';

        form.value = {
            parents_name: '',
            parents_email: '',
            phone: '',
            state_or_province: '',
            country_or_region: '',
            register_another_child: false,
            children: []
        };

        setTimeout(() => {
            submitMessage.value = '';
        }, 3000);
    } catch (error) {
        console.error('Registration error:', error);
        submitError.value =
            error.response?.data?.message ||
            'There was an error with your registration, please try again later';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped lang="postcss">
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.registration-container {
    background-color: #f9f9f9;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.registration-section {
    background-color: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
}

.registration-details {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 3px;
}

.registration-details h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1E3A8A;
    /* blue-800 */
}

.registration-details p {
    font-size: 1rem;
    color: #4B5563;
    /* gray-700 */
}

.input {
    width: 100%;
    border: 1px solid #D1D5DB;
    /* gray-300 */
    border-radius: 0.375rem;
    /* rounded-md */
    padding: 0.75rem;
    /* p-3 */
}

.input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    /* approximate ring-2 ring-blue-500 */
}

.btn-primary {
    background-color: #2563EB;
    /* blue-600 */
    color: #FFFFFF;
    /* text-white */
    font-weight: 600;
    /* font-semibold */
    padding: 0.5rem 1rem;
    /* py-2 px-4 */
    border-radius: 0.375rem;
    /* rounded-md */
}

.btn-primary:hover {
    background-color: #1D4ED8;
    /* blue-700 */
}

.btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

.btn-primary:disabled {
    background-color: #6B7280;
    /* gray-500 */
    color: #D1D5DB;
    /* gray-300 */
    cursor: not-allowed;
}

.btn-success {
    background-color: #16A34A;
    /* green-600 */
    color: #FFFFFF;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
}

.btn-success:hover {
    background-color: #15803D;
    /* green-700 */
}

.btn-success:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
}

.mt-4 {
    margin-top: 1rem;
}

.mt-6 {
    margin-top: 1.5rem;
}
</style>