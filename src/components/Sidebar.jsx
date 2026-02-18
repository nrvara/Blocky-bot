import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiGrid, FiBook, FiUser, FiLayers } from 'react-icons/fi';
import './dashboard.css';

const Sidebar = ({ role }) => {
    const history = useHistory();
    const location = useLocation();
    const active = location.pathname;

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <div className="sidebar">
            <h2 style={{ color: '#2D60FF', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px' }}>
                <FiGrid size={28} /> BlockyBot
            </h2>

            <div style={{ width: '100%' }}>
                <div style={{ color: '#B1B5C3', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', paddingLeft: '15px' }}>MENU</div>

                {role === 'admin' && (
                    <>
                        <NavItem icon={<FiHome />} label="Overview" active={active === '/admin'} onClick={() => history.push('/admin')} />
                        <NavItem icon={<FiUsers />} label="Users" active={active === '/admin/users'} onClick={() => { }} />
                        <NavItem icon={<FiLayers />} label="Scratch Editor" active={active === '/editor'} onClick={() => history.push('/editor')} />
                        <NavItem icon={<FiSettings />} label="Settings" onClick={() => { }} />
                    </>
                )}

                {role === 'teacher' && (
                    <>
                        <NavItem icon={<FiUsers />} label="Students" active={active === '/teacher'} onClick={() => history.push('/teacher')} />
                        <NavItem icon={<FiBook />} label="Assignments" onClick={() => { }} />
                        <NavItem icon={<FiLayers />} label="Scratch Editor" active={active === '/editor'} onClick={() => history.push('/editor')} />
                        <NavItem icon={<FiUser />} label="My Profile" onClick={() => { }} />
                    </>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #F5F7FA' }}>
                    <NavItem icon={<FiLogOut />} label="Logout" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <div
        onClick={onClick}
        className={`nav-item ${active ? 'active' : ''}`}
        style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            marginBottom: '5px',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: active ? '#F5F7FA' : 'transparent',
            color: active ? '#2D60FF' : '#B1B5C3',
            position: 'relative'
        }}
    >
        {active && <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '4px', background: '#2D60FF', borderRadius: '0 4px 4px 0' }}></div>}
        <span style={{ marginRight: '15px', fontSize: '20px', display: 'flex' }}>{icon}</span>
        <span style={{ fontWeight: 500, fontSize: '15px' }}>{label}</span>
    </div>
);

export default Sidebar;
