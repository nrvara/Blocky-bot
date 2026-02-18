const { initDatabase } = require('../lib/database');

module.exports = async function (context, req) {
    context.log('Login request received.');

    const { email, password, code, role } = req.body;
    const db = await initDatabase();
    const usersContainer = db.container("Users");
    const schoolsContainer = db.container("Schools");

    // Admin Login (Hardcoded for initial setup or check specific DB entry)
    if (role === 'admin') {
        // In a real app, use a secure auth provider or hashed password in DB
        // For prototype: Check against a hardcoded admin or strict DB lookup
        if (email === 'admin@blockybot.com' && password === 'admin123') {
            context.res = {
                body: { user: { role: 'admin', name: 'Administrator' }, token: 'mock-admin-token' }
            };
            return;
        } else {
            context.res = { status: 401, body: "Invalid admin credentials" };
            return;
        }
    }

    // Teacher Login
    if (role === 'teacher') {
        // Query Users container for email
        const querySpec = {
            query: "SELECT * FROM c WHERE c.email = @email AND c.role = 'teacher'",
            parameters: [{ name: "@email", value: email }]
        };
        const { resources: users } = await usersContainer.items.query(querySpec).fetchAll();

        if (users.length === 0) {
            context.res = { status: 404, body: "User not found" };
            return;
        }

        const user = users[0];

        // Check password (plain text for now as per requirements, strictly prototype)
        if (user.password === password) {
            context.res = {
                body: { user, token: 'mock-teacher-token' }
            };
        } else {
            context.res = { status: 401, body: "Invalid password" };
        }
        return;
    }

    // Student Login
    if (role === 'student') {
        // Students login with email + code provided by teacher? 
        // Requirement says: "student login, ask for email... then ask to enter password. The password should be available in teachers page as a random 4 digit no."
        // So students authenticate with email + that code.

        const querySpec = {
            query: "SELECT * FROM c WHERE c.email = @email AND c.role = 'student'",
            parameters: [{ name: "@email", value: email }]
        };
        const { resources: users } = await usersContainer.items.query(querySpec).fetchAll();

        if (users.length === 0) {
            context.res = { status: 404, body: "Student not found" };
            return;
        }

        const user = users[0];
        if (user.password === password) { // "password" here is the 4 digit code
            context.res = {
                body: { user, token: 'mock-student-token' }
            };
        } else {
            context.res = { status: 401, body: "Invalid code" };
        }
        return;
    }

    context.res = {
        status: 400,
        body: "Invalid role or missing data"
    };
}
