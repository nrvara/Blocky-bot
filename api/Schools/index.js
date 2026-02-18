const { initDatabase } = require('../lib/database');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    const { method } = req;
    const db = await initDatabase();
    const schoolsContainer = db.container("Schools");
    const usersContainer = db.container("Users");

    if (method === 'GET') {
        // List all schools
        const { resources: schools } = await schoolsContainer.items.query("SELECT * FROM c").fetchAll();
        context.res = {
            body: schools
        };
        return;
    }

    if (method === 'POST') {
        try {
            const { name, logo, type, teachers = [], students = [] } = req.body;

            // 1. Create School
            const schoolId = uuidv4();
            const schoolDoc = {
                id: schoolId,
                name,
                logo,
                type // e.g., 'primary', 'high'
            };
            await schoolsContainer.items.create(schoolDoc);

            // 2. Create Teachers
            for (const t of teachers) {
                const teacherDoc = {
                    id: uuidv4(),
                    schoolId,
                    role: 'teacher',
                    name: t.name,
                    email: t.email,
                    password: null, // First time login will set this
                    class: t.className // Teachers might be assigned to a class?
                };
                await usersContainer.items.create(teacherDoc);
            }

            // 3. Create Students
            for (const s of students) {
                // Generate random 4 digit code for student password
                const code = Math.floor(1000 + Math.random() * 9000).toString();
                const studentDoc = {
                    id: uuidv4(),
                    schoolId,
                    role: 'student',
                    name: s.name,
                    email: s.email, // "identify is teacher or student" -> implies email is unique identifier
                    password: code, // Pre-set password for students
                    class: s.className
                };
                await usersContainer.items.create(studentDoc);
            }

            context.res = {
                body: { message: "School and users created successfully", schoolId }
            };
        } catch (error) {
            context.log.error(error);
            context.res = {
                status: 500,
                body: "Error creating school: " + error.message
            };
        }
        return;
    }

    context.res = { status: 405, body: "Method Not Allowed" };
};
