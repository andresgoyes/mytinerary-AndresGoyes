import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/authActions';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Cities', href: '/cities' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const user = useSelector((state) => state.auth.user);  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleHamburgerMenuToggle = () => {
    setMenuOpen(prev => !prev);
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
  };

  const handleUserMenuToggle = () => {
    setUserMenuOpen(prev => !prev);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gray-800 z-20 relative max-w-8xl mx-auto h-16">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Menú hamburguesa */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            onClick={handleHamburgerMenuToggle} 
            className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img className="h-9 w-auto" src='https://cdn-icons-png.flaticon.com/512/2038/2038294.png' alt="Logo" />
            <span className="ml-3 text-white text-2xl font-bold hidden md:block">MyTinerary</span>
          </div>
        </div>

        {/* Navegación en pantallas grandes */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-5 text-sm font-bold'
                  )}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Menú de usuario */}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton
                onClick={handleUserMenuToggle} 
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-9 w-9 rounded-full"
                  src={user?.photoUrl || 'https://cdn-icons-png.flaticon.com/512/2990/2990279.png'}
                  alt="User"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-50 mt-2 w-50 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              {user ? (
                <>
                  <MenuItem>
                    {({ active }) => (
                      <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        {user.email}
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
                        </svg>
                        Logout
                      </a>
                    )}
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    {({ active }) => (
                      <Link to="/login" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Login
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link to="/register" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                        Register
                      </Link>
                    )}
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* Menú en móvil */}
      {menuOpen && (
        <div ref={menuRef} className="sm:hidden bg-gray-800 relative z-50">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}