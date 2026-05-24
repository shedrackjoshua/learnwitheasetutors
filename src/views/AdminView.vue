<template>
    <main class="admin">
        <div class="container">
            <h1>{{ formHeading }}</h1>
            <div class="switch-type">
                <button @click="switchType('tutors')" class="btn-switch">View Tutors</button>
                <button @click="switchType('contacts')" class="btn-switch">View Contacts</button>
                <button @click="switchType('registrations')" class="btn-switch">View Registrations</button>
            </div>
            <div v-if="loading" class="loading">
                loading {{ currentType }}...
            </div>
            <div v-else-if="entries.length === 0" class="no-entries">No {{ currentType }} found.</div>
            <table v-else class="entry-table">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in entries" :key="entry._id">
                        <td v-for="column in columns" :key="column.key">
                            {{ column.formatter ? column.formatter(entry[column.key]) : entry[column.key]  }}
                        </td>
                        <td class="action">
                            <button @click="viewDetails(entry._id)" class="btn-view">View Details</button>
                            <button @click="editEntry(entry._id)" class="btn-edit">Edit</button>
                            <button @click="deleteEntry(entry._id)" class="btn-delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
// default to registrations so the admin sees registrations on mount
const currentType = ref('registrations') // 'tutors', 'contacts' or 'registrations'
const entries = ref([]);
const loading = ref(false);

const fetchEntries = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`http://localhost:3000/${currentType.value}`)
        entries.value = response.data || [];
    } catch (err) {
        console.error(`Error fetching ${currentType.value}`, err)
    } finally {
        loading.value = false;
    }
}

const deleteEntry = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${currentType.value.slice(0, -1)}?`))
        return;
    alert(`Delete ${currentType.value.slice(0, -1)}...`)
    try {
        const response = await axios.delete(`http://localhost:3000/${currentType.value}/${id}`)
        entries.value = entries.value.filter(entry => entry._id !== id);
    } catch (err) {
        console.error(`Error deleting ${currentType.value}:`, err)
        alert(`Failed to delete ${currentType.value}`)
    }
}

const viewDetails = (id) => {
    if (currentType.value === 'tutors') {
        router.push(`/admin/tutor/${id}/details`);
    } else if (currentType.value === 'contacts') {
        router.push(`/admin/contact/${id}/details`);
    } else if(currentType.value === 'registrations') {
        router.push(`/admin/registration/${id}/details`);
    }
}

const editEntry = (id) => {
    if (currentType.value === 'tutors') {
        router.push(`/admin/tutor/${id}/edit`);
    } else if (currentType.value === 'contacts') {
        router.push(`/admin/contact/${id}/edit`);
    } else if (currentType.value === 'registrations') {
        router.push(`/admin/registration/${id}/edit`);
    }
}

const switchType = (type) => {
    currentType.value = type
    fetchEntries();
}

// Centralized configuration for each type of entry
const typeConfig = {
    tutors: {
        headings: 'Tutors Forms Submitted',
        columns: [
            { key: 'name', label: 'Name'},
            { key: 'email', label: 'Email'},
            { key: 'phone', label: 'Phone'},
            { key: 'subjects_taught', label: 'Subjects Taught'},
            { key: 'years_of_experience', label: 'Years of Experience'}
        ]
    },
    contacts: {
        headings: 'Contacts Form Submitted',
        columns: [
            { key: 'full_name', label: 'Full Name'},
            { key: 'email', label: 'Email'},
            { key: 'programme', label: 'Programme'},
            { key: 'phone', label: 'Phone'},
            { key: 'message', label: 'Message'}
        ]
    },
    registrations: {
        headings: 'Registration Forms Submitted',
        columns: [
            { key: 'parents_name', label: "Parent's Name" },
            { key: 'parents_email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'country_or_region', label: 'Country/Region' },
            { key: 'children', label: 'Children', formatter: (children) => Array.isArray(children) ? children.map(c => c.wards_name).join(', ') : '' }
        ]
    }
};
// computed headings and columns based on currentType
const formHeading = computed(() => {
    return typeConfig[currentType.value]?.headings || 'Registration Forms Submitted';
})

const columns = computed(() => {
    return typeConfig[currentType.value]?.columns || [];
})

onMounted(() => {
    fetchEntries();
})
</script>

<style scoped>
.admin {
    padding: 2rem 0;
}
.switch-type {
    margin-bottom: 1rem;
}
.btn-switch {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-switch:hover {
    background-color: #0056b3;
}
.loading, .no-entries {
    text-align: center;
    font-size: 1.2rem;
    color: #555;
}
.entry-table {
    width: 100%;
    border-collapse: collapse;
}
.entry-table th, .entry-table td {
    border: 1px solid #ddd;
    padding: 8px;
}
.entry-table th {
    background-color: #f2f2f2;
    text-align: left;
}
.action {
    display: flex;
    gap: 0.5rem;
}
.btn-view, .btn-edit, .btn-delete {
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-view {
    background-color: #28a745;
    color: white;
}
.btn-edit {
    background-color: #ffc107;
    color: white;
}
.btn-delete {
    background-color: #dc3545;
    color: white;
}
</style>