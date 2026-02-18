import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../lib/api';
import '../dashboard.css';

const LoginPage = () => {
    const history = useHistory();
    const [role, setRole] = useState('student'); // student, teacher, admin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.login(email, password, role);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            if (role === 'admin') history.push('/admin');
            else if (role === 'teacher') history.push('/teacher');
            else history.push('/editor');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div style={{ marginBottom: '30px' }}>
                    <span style={{ fontSize: '40px' }}>🤖</span>
                    <h1 style={{ color: '#2D60FF', margin: '10px 0', fontSize: '24px' }}>BlockyBot</h1>
                    <p style={{ color: '#718EBF', margin: 0 }}>Welcome! Please login to continue.</p>
                </div>

                <div className="role-selector">
                    <button className={`btn ${role === 'student' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRole('student')}>Student</button>
                    <button className={`btn ${role === 'teacher' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRole('teacher')}>Teacher</button>
                    <button className={`btn ${role === 'admin' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setRole('admin')}>Admin</button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>{role === 'student' ? 'Access Code' : 'Password'}</label>
                        <input type="password" placeholder={role === 'student' ? '1234' : '********'} value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>

                    {error && <p style={{ color: '#FF5C5C', fontSize: '0.9rem', marginBottom: '15px' }}>{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
