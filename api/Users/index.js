const { initDatabase } = require('../lib/database');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
    const { method } = req;
    const db = await initDatabase();
    const usersContainer = db.container("Users");

    if (method === 'GET') {
        // Get users by schoolId and optional role
        const schoolId = req.query.schoolId;
        const role = req.query.role;

        if (!schoolId) {
            context.res = { status: 400, body: "schoolId is required" };
            return;
        }

        let query = "SELECT * FROM c WHERE c.schoolId = @schoolId";
        const parameters = [{ name: "@schoolId", value: schoolId }];

        if (role) {
            query += " AND c.role = @role";
            parameters.push({ name: "@role", value: role });
        }

        const { resources: users } = await usersContainer.items.query({ query, parameters }).fetchAll();
        context.res = { body: users };
        return;
    }

    if (method === 'POST') {
        // Add a new user (Student or Teacher)
        const { schoolId, role, name, email, className } = req.body;

        const id = uuidv4();
        let password = null;

        if (role === 'student') {
            password = Math.floor(1000 + Math.random() * 9000).toString();
        }

        const userDoc = {
            id,
            schoolId,
            role,
            name,
            email,
            password,
            class: className
        };

        try {
            await usersContainer.items.create(userDoc);
            context.res = { body: userDoc };
        } catch (err) {
            context.res = { status: 500, body: err.message };
        }
        return;
    }

    if (method === 'PUT') {
        // Update user (e.g., Set Password)
        const { id, schoolId, password, name } = req.body;

        try {
            // Read existing item first
            const { resource: userDoc } = await usersContainer.item(id, schoolId).read();

            if (password) userDoc.password = password;
            if (name) userDoc.name = name;

            const { resource: updated } = await usersContainer.item(id, schoolId).replace(userDoc);

            context.res = { body: updated };
        } catch (err) {
            context.res = { status: 500, body: err.message };
        }
        return;
    }

    context.res = { status: 405, body: "Method Not Allowed" };
};
