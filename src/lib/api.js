const API_BASE = '/api'; // In Azure Static Web Apps, functions are at /api

// Mock Data for development without backend
const MOCK_MODE = true;

const mockSchools = [
    { id: 'school-1', name: 'Greenwood High', type: 'high', logo: 'https://via.placeholder.com/50' }
];

const mockUsers = [
    { id: 'user-1', schoolId: 'school-1', role: 'teacher', name: 'John Doe', email: 'teacher@school.com', password: 'password', class: '10A' },
    { id: 'user-2', schoolId: 'school-1', role: 'student', name: 'Alice', email: 'alice@school.com', password: '1234', class: '10A' }
];

export const api = {
    login: async (email, password, role) => {
        if (MOCK_MODE) {
            console.log('Mock Login:', email, role);
            if (role === 'admin' && email === 'admin@test.com' && password === 'admin') {
                return { user: { role: 'admin', name: 'Admin' }, token: 'mock-admin' };
            }
            const user = mockUsers.find(u => u.email === email && u.role === role);
            if (user && user.password === password) {
                return { user, token: 'mock-token' };
            }
            throw new Error('Invalid credentials');
        }

        const res = await fetch(`${API_BASE}/Login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getSchools: async () => {
        if (MOCK_MODE) return mockSchools;
        const res = await fetch(`${API_BASE}/Schools`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addSchool: async (schoolData) => {
        if (MOCK_MODE) {
            const newSchool = { id: `school-${Date.now()}`, ...schoolData };
            mockSchools.push(newSchool);
            return { message: 'Success', schoolId: newSchool.id };
        }
        const res = await fetch(`${API_BASE}/Schools`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schoolData)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    updateSchool: async (schoolData) => {
        if (MOCK_MODE) {
            const index = mockSchools.findIndex(s => s.id === schoolData.id);
            if (index !== -1) {
                // Update School Metadata
                mockSchools[index] = { ...mockSchools[index], ...schoolData };

                // Update Users: Remove old users for this school, then add current ones
                const invalidIds = mockUsers.filter(u => u.schoolId === schoolData.id).map(u => u.id);
                // Actually, filtering implies we replace the global array's relevant entries.
                // Simpler approach for mock: Remove all users for this school
                for (let i = mockUsers.length - 1; i >= 0; i--) {
                    if (mockUsers[i].schoolId === schoolData.id) {
                        mockUsers.splice(i, 1);
                    }
                }

                // Add Teachers
                if (schoolData.teachers) {
                    schoolData.teachers.forEach(t => {
                        mockUsers.push({
                            id: t.id || `user-${Date.now()}-${Math.random()}`,
                            schoolId: schoolData.id,
                            role: 'teacher',
                            name: t.name,
                            email: t.email,
                            password: t.password || 'password',
                            class: t.className
                        });
                    });
                }

                // Add Students
                if (schoolData.students) {
                    schoolData.students.forEach(s => {
                        mockUsers.push({
                            id: s.id || `user-${Date.now()}-${Math.random()}`,
                            schoolId: schoolData.id,
                            role: 'student',
                            name: s.name,
                            email: s.email,
                            password: s.password || Math.floor(1000 + Math.random() * 9000).toString(),
                            class: s.className
                        });
                    });
                }

                return { message: 'Success', school: mockSchools[index] };
            }
            throw new Error('School not found');
        }
        const res = await fetch(`${API_BASE}/Schools`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(schoolData)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    getUsers: async (schoolId, role) => {
        if (MOCK_MODE) {
            return mockUsers.filter(u => u.schoolId === schoolId && (!role || u.role === role));
        }
        const url = `${API_BASE}/Users?schoolId=${schoolId}${role ? `&role=${role}` : ''}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },

    addUser: async (userData) => {
        if (MOCK_MODE) {
            const newUser = { id: `user-${Date.now()}`, ...userData };
            // Auto-generate password for student if not present
            if (newUser.role === 'student' && !newUser.password) {
                newUser.password = Math.floor(1000 + Math.random() * 9000).toString();
            }
            mockUsers.push(newUser);
            return newUser;
        }
        const res = await fetch(`${API_BASE}/Users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    }
};
