import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../lib/api';
import Sidebar from '../Sidebar.jsx';
import { FiSearch, FiBell, FiEdit2, FiPlus } from 'react-icons/fi';
import '../dashboard.css';

const TeacherDashboard = () => {
    const history = useHistory();
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile'); // profile, students

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem('user'));
        if (!u || u.role !== 'teacher') {
            history.push('/login');
            return;
        }
        setUser(u);
        if (u && u.schoolId) {
            loadStudents(u.schoolId);
        }
    }, []);

    const loadStudents = async (schoolId) => {
        try {
            const data = await api.getUsers(schoolId, 'student');
            setStudents(data);
        } catch (err) {
            console.error("Failed to load students", err);
        }
    };

    if (!user) return <div className="login-wrapper">Loading...</div>;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '60vw',
            margin: '0 auto',
            minHeight: '100vh',
            backgroundColor: '#FAFBFC',
            boxShadow: '0 0 50px rgba(0,0,0,0.1)'
        }}>
            <div style={{ width: '250px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
                <Sidebar role="teacher" />
            </div>

            <div className="main-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h2>{activeTab === 'profile' ? 'Edit Profile' : 'Student Management'}</h2>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div className="search-bar" style={{ background: 'white', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#718EBF' }}>
                            <FiSearch />
                            <input placeholder="Search query" style={{ border: 'none', background: 'transparent', outline: 'none', color: '#343C6A', width: '200px' }} />
                        </div>
                        <div className="icon-btn" style={{ background: '#F5F7FA', padding: '10px', borderRadius: '50%', color: '#718EBF', cursor: 'pointer' }}>
                            <FiBell size={20} />
                        </div>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#ffccc7', overflow: 'hidden' }}>
                            <img src="https://ui-avatars.com/api/?name=Teacher+User&background=random" alt="Profile" style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '40px', borderBottom: '1px solid #DFEAF2', marginBottom: '30px' }}>
                    <div
                        onClick={() => setActiveTab('profile')}
                        style={{
                            paddingBottom: '10px',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'profile' ? '3px solid #2D60FF' : '3px solid transparent',
                            color: activeTab === 'profile' ? '#2D60FF' : '#718EBF',
                            fontWeight: 500
                        }}
                    >
                        Edit Profile
                    </div>
                    <div
                        onClick={() => setActiveTab('students')}
                        style={{
                            paddingBottom: '10px',
                            cursor: 'pointer',
                            borderBottom: activeTab === 'students' ? '3px solid #2D60FF' : '3px solid transparent',
                            color: activeTab === 'students' ? '#2D60FF' : '#718EBF',
                            fontWeight: 500
                        }}
                    >
                        Class Roster
                    </div>
                    <div style={{ paddingBottom: '10px', cursor: 'pointer', color: '#718EBF' }}>Preferences</div>
                    <div style={{ paddingBottom: '10px', cursor: 'pointer', color: '#718EBF' }}>Security</div>
                </div>

                {activeTab === 'profile' && (
                    <div className="card" style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
                        {/* Avatar Section */}
                        <div style={{ position: 'relative' }}>
                            <img src="https://ui-avatars.com/api/?name=Teacher+User&size=150&background=random" style={{ borderRadius: '50%', width: '130px', height: '130px' }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                background: '#2D60FF',
                                color: 'white',
                                padding: '8px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: '3px solid white'
                            }}>
                                <FiEdit2 size={16} />
                            </div>
                        </div>

                        {/* Form Section */}
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input defaultValue={user.name} />
                            </div>
                            <div className="form-group">
                                <label>User Name</label>
                                <input defaultValue="teacher_users_123" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input defaultValue={user.email} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" defaultValue="********" />
                            </div>
                            <div className="form-group">
                                <label>Class Name</label>
                                <input defaultValue={user.class} />
                            </div>
                            <div className="form-group">
                                <label>School ID</label>
                                <input defaultValue={user.schoolId} disabled style={{ opacity: 0.7 }} />
                            </div>

                            <button className="btn btn-primary" style={{ gridColumn: 'span 2', marginTop: '10px', maxWidth: '200px' }}>Save Profile</button>
                        </div>
                    </div>
                )}

                {activeTab === 'students' && (
                    <StudentManager students={students} schoolId={user.schoolId} onUpdate={() => loadStudents(user.schoolId)} />
                )}

            </div>
        </div>
    );
};

const StudentManager = ({ students, schoolId, onUpdate }) => {
    const [newStudent, setNewStudent] = useState({ name: '', email: '', className: '' });

    const handleAdd = async (e) => {
        e.preventDefault();
        await api.addUser({ schoolId, role: 'student', ...newStudent });
        setNewStudent({ name: '', email: '', className: '' });
        onUpdate();
    };

    return (
        <div>
            <div className="card">
                <h3 style={{ marginBottom: '20px' }}>Add New Student</h3>
                <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '20px', alignItems: 'end' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label>Student Name</label>
                        <input value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label>Email</label>
                        <input value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} required />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                        <label>Class</label>
                        <input value={newStudent.className} onChange={e => setNewStudent({ ...newStudent, className: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '50px', padding: '0 30px' }}>Add</button>
                </form>
            </div>

            <div className="card" style={{ padding: '0 0 20px 0', overflow: 'hidden' }}>
                <table style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={{ paddingLeft: '30px' }}>Name</th>
                            <th>Email</th>
                            <th>Class</th>
                            <th>Access Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.id}>
                                <td style={{ paddingLeft: '30px', fontWeight: '500' }}>{s.name}</td>
                                <td>{s.email}</td>
                                <td><span style={{ background: '#F5F7FA', padding: '5px 10px', borderRadius: '10px', fontSize: '13px' }}>{s.class}</span></td>
                                <td><span className="access-code">{s.password}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeacherDashboard;
