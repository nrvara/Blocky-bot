import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../lib/api';
import Sidebar from '../Sidebar.jsx';
import { FiSearch, FiBell, FiPlus, FiTrash2, FiUser, FiMail, FiLayers } from 'react-icons/fi';
import '../dashboard.css';

const AdminDashboard = () => {
    const [schools, setSchools] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);

    const history = useHistory(); // Needed for redirect

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
            return;
        }
        loadSchools();
    }, []);

    const loadSchools = async () => {
        try {
            const data = await api.getSchools();
            setSchools(data || []);
        } catch (err) {
            console.error("Failed to load schools", err);
        }
    };

    const handleAddClick = () => {
        setSelectedSchool(null); // Clear selection for new school
        setShowAddModal(true);
    };

    const handleEditClick = (school) => {
        setSelectedSchool(school);
        setShowAddModal(true);
    };

    return (
        <div className="layout-container">
            <Sidebar role="admin" />

            <div className="main-content">
                {/* Header with Search and Profile */}
                <div className="dashboard-header">
                    <h2>Overview</h2>
                    <div className="header-actions">
                        <div className="search-bar" style={{ background: 'white', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#718EBF' }}>
                            <FiSearch />
                            <input placeholder="Search for something" style={{ border: 'none', background: 'transparent', outline: 'none', color: '#343C6A', width: '200px' }} />
                        </div>
                        <div className="icon-btn" style={{ background: '#F5F7FA', padding: '10px', borderRadius: '50%', color: '#718EBF', cursor: 'pointer' }}>
                            <FiBell size={20} />
                        </div>
                        <div className="profile-pic" style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#ffccc7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Admin
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: '#343C6A' }}>Registered Schools</h3>
                    <button className="btn btn-primary" onClick={handleAddClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiPlus /> Add School
                    </button>
                </div>

                {/* Card with full width */}
                <div className="card">
                    {schools.length === 0 ? <p style={{ padding: '30px', textAlign: 'center', color: '#718EBF' }}>No schools registered yet.</p> : (
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={{ paddingLeft: '30px' }}>School Name</th>
                                    <th>Type</th>
                                    <th>ID</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schools.map(s => (
                                    <tr key={s.id} onClick={() => handleEditClick(s)} style={{ cursor: 'pointer', transition: 'background 0.2s' }} className="table-row-hover">
                                        <td style={{ paddingLeft: '30px', fontWeight: '500' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '30px', height: '30px', background: '#E9F1FC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏫</div>
                                                {s.name}
                                            </div>
                                        </td>
                                        <td>{s.type}</td>
                                        <td style={{ color: '#718EBF', fontSize: '13px' }}>{s.id}</td>
                                        <td>
                                            <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '13px' }} onClick={(e) => { e.stopPropagation(); handleEditClick(s); }}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {showAddModal && <AddSchoolModal school={selectedSchool} onClose={() => setShowAddModal(false)} onSave={() => { setShowAddModal(false); loadSchools(); }} />}
            </div>
        </div>
    );
};

const AddSchoolModal = ({ school, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('primary');

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [temp, setTemp] = useState({ name: '', email: '', className: '' }); // Shared temp state for simplification
    const [activeSection, setActiveSection] = useState('teachers'); // teachers or students

    useEffect(() => {
        if (school) {
            setName(school.name);
            setType(school.type);

            // Fetch users for this school to populate the lists
            const fetchSchoolUsers = async () => {
                try {
                    const users = await api.getUsers(school.id);
                    setTeachers(users.filter(u => u.role === 'teacher'));
                    setStudents(users.filter(u => u.role === 'student'));
                } catch (e) {
                    console.error("Failed to load school users", e);
                }
            };
            fetchSchoolUsers();
        } else {
            // Reset for Add Mode
            setName('');
            setType('primary');
            setTeachers([]);
            setStudents([]);
        }
    }, [school]);

    const addToSection = () => {
        if (!temp.name || !temp.email) return;
        const newItem = { ...temp };
        if (activeSection === 'teachers') {
            setTeachers([...teachers, newItem]);
        } else {
            setStudents([...students, newItem]);
        }
        setTemp({ name: '', email: '', className: '' });
    };

    const removeItem = (index, section) => {
        if (section === 'teachers') {
            setTeachers(teachers.filter((_, i) => i !== index));
        } else {
            setStudents(students.filter((_, i) => i !== index));
        }
    };

    const handleSave = async () => {
        const schoolData = { name, type, teachers, students };
        if (school) {
            // Update
            await api.updateSchool({ ...schoolData, id: school.id });
        } else {
            // Create
            await api.addSchool(schoolData);
        }
        onSave();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ width: '700px', padding: '0' }}>
                {/* Header */}
                <div style={{ padding: '30px', borderBottom: '1px solid #F5F7FA' }}>
                    <h3 style={{ margin: 0, fontSize: '20px', color: '#343C6A' }}>{school ? 'Edit School' : 'Add New School'}</h3>
                </div>

                <div style={{ padding: '30px', maxHeight: '60vh', overflowY: 'auto' }}>
                    {/* Main Info Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                        <div className="form-group">
                            <label>School Name</label>
                            <div style={{ position: 'relative' }}>
                                <FiLayers style={{ position: 'absolute', top: '15px', left: '15px', color: '#B1B5C3' }} />
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g. Springfield High"
                                    style={{ paddingLeft: '45px' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>School Type</label>
                            <select value={type} onChange={e => setType(e.target.value)}>
                                <option value="primary">Primary School</option>
                                <option value="high">High School</option>
                            </select>
                        </div>
                    </div>

                    {/* Member Management Tabs */}
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #F5F7FA', marginBottom: '20px' }}>
                            <div
                                onClick={() => setActiveSection('teachers')}
                                style={{
                                    paddingBottom: '10px',
                                    cursor: 'pointer',
                                    borderBottom: activeSection === 'teachers' ? '2px solid #2D60FF' : '2px solid transparent',
                                    color: activeSection === 'teachers' ? '#2D60FF' : '#718EBF',
                                    fontWeight: 500
                                }}
                            >
                                Teachers ({teachers.length})
                            </div>
                            <div
                                onClick={() => setActiveSection('students')}
                                style={{
                                    paddingBottom: '10px',
                                    cursor: 'pointer',
                                    borderBottom: activeSection === 'students' ? '2px solid #2D60FF' : '2px solid transparent',
                                    color: activeSection === 'students' ? '#2D60FF' : '#718EBF',
                                    fontWeight: 500
                                }}
                            >
                                Students ({students.length})
                            </div>
                        </div>

                        {/* Add Form */}
                        <div style={{ background: '#F5F7FA', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px auto', gap: '10px', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <FiUser style={{ position: 'absolute', top: '12px', left: '10px', color: '#B1B5C3' }} />
                                    <input
                                        placeholder="Name"
                                        value={temp.name}
                                        onChange={e => setTemp({ ...temp, name: e.target.value })}
                                        style={{ margin: 0, paddingLeft: '35px', borderRadius: '10px', border: 'none', padding: '10px 10px 10px 35px' }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <FiMail style={{ position: 'absolute', top: '12px', left: '10px', color: '#B1B5C3' }} />
                                    <input
                                        placeholder="Email"
                                        value={temp.email}
                                        onChange={e => setTemp({ ...temp, email: e.target.value })}
                                        style={{ margin: 0, paddingLeft: '35px', borderRadius: '10px', border: 'none', padding: '10px 10px 10px 35px' }}
                                    />
                                </div>
                                <input
                                    placeholder="Class"
                                    value={temp.className}
                                    onChange={e => setTemp({ ...temp, className: e.target.value })}
                                    style={{ margin: 0, borderRadius: '10px', border: 'none', padding: '10px' }}
                                />
                                <button className="btn btn-primary" type="button" onClick={addToSection} style={{ padding: '10px 15px', borderRadius: '10px' }}>
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {(activeSection === 'teachers' ? teachers : students).map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid #F5F7FA' }}>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <div style={{ width: '35px', height: '35px', background: activeSection === 'teachers' ? '#E9F1FC' : '#FFF5F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeSection === 'teachers' ? '#2D60FF' : '#FF5C5C' }}>
                                            {activeSection === 'teachers' ? '👨‍🏫' : '👨‍🎓'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '14px', color: '#343C6A' }}>{item.name}</div>
                                            <div style={{ fontSize: '12px', color: '#718EBF' }}>{item.email}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ background: '#F5F7FA', padding: '5px 10px', borderRadius: '8px', fontSize: '12px', color: '#718EBF' }}>{item.className || 'N/A'}</div>
                                        <FiTrash2 style={{ cursor: 'pointer', color: '#FF5C5C' }} onClick={() => removeItem(i, activeSection)} />
                                    </div>
                                </div>
                            ))}
                            {(activeSection === 'teachers' ? teachers : students).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#B1B5C3', fontStyle: 'italic' }}>
                                    No {activeSection} added yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '20px 30px', background: '#F9FAFB', borderTop: '1px solid #F5F7FA', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderRadius: '0 0 20px 20px' }}>
                    <button className="btn btn-secondary" onClick={onClose} style={{ color: '#718EBF' }}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save School</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
