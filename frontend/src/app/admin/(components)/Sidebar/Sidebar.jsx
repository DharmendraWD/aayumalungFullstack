"use client"; // Must be a client component to use useState and handle clicks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ Added for active route highlighting
// Import necessary icons from react-icons/fa and react-icons/io
import { FaHome, FaUsers, FaCog, FaChartLine, FaBars, FaTimes, FaLayerGroup } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

function SidebarItem({ item, email, username }) {
  const pathname = usePathname(); // ✅ Get current route
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenus = item.submenus && item.submenus.length > 0;

  // ✅ Auto-open submenu if current route is inside it
  useEffect(() => {
    if (hasSubmenus && item.submenus.some((sub) => pathname.startsWith(sub.href))) {
      setIsOpen(true);
    }
  }, [pathname, hasSubmenus, item.submenus]);

  const handleClick = () => {
    if (hasSubmenus) {
      setIsOpen(!isOpen);
    }
  };

  const IconComponent = item.icon;

  // ✅ Check if this item (or one of its submenus) matches the current route
  const isActive =
    pathname === item.href ||
    (hasSubmenus && item.submenus.some((sub) => pathname.startsWith(sub.href)));

  const ContentTag = hasSubmenus ? 'div' : Link;
  const contentProps = hasSubmenus ? { onClick: handleClick } : { href: item.href || '#' };

  return (
    <li className="relative">
      <ContentTag
        {...contentProps}
        className={`flex items-center justify-between p-3 text-sm font-medium cursor-pointer transition-colors duration-200 rounded-md
          ${
            isActive
              ? 'bg-blue-700 text-white' // ✅ Active highlight
              : hasSubmenus
              ? 'text-gray-200 hover:bg-gray-700'
              : 'text-gray-300 hover:bg-blue-600 hover:text-white'
          }`}
      >
        <div className="flex items-center">
          {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
          <span className="truncate">{item.title}</span>
        </div>

        {/* Toggle Arrow Icon */}
        {hasSubmenus && (
          <IoIosArrowDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </ContentTag>

      {/* Submenu Container (Collapsible Animation) */}
      {hasSubmenus && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 py-1' : 'max-h-0 opacity-0'
          }`}
          style={{ transitionProperty: 'max-height, opacity, padding' }}
        >
          <ul className="pl-8 space-y-1 bg-gray-700/50 border-l border-gray-600">
            {item.submenus.map((sub, idx) => {
              const subActive = pathname === sub.href; // ✅ Highlight active submenu too
              return (
                <li key={idx}>
                  <Link
                    href={sub.href || '#'}
                    className={`block p-2 text-xs rounded transition-colors duration-200 ${
                      subActive
                        ? 'bg-blue-700 text-white' // ✅ Active submenu highlight
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {sub.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

// =================================================================
// 3. MAIN COMPONENT: SidebarMenu (Handles Mobile Logic)
// =================================================================

export default function SidebarMenu({ email, username }) {
  var MENU_ITEMS = [
    {
      title: 'Dashboard',
      icon: FaHome,
      href: '/admin/dashboard',
    },
    {
      title: 'Hero',
      icon: FaChartLine,
      href: '/admin/dashboard/hero',
    },
    {
      title: 'About Us Section',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'Mission Section',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'Our Team',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'Gallary',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'News and Case',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'Contact Us',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'FAQs',
      icon: FaCog,
      href: '/settings',
    },
    {
      title: 'Footer',
      icon: FaLayerGroup,
      submenus: [
        { title: 'CTA', href: '/products' },
        { title: 'Footer Links', href: '/products/new' },
        { title: 'Map Links', href: '/products/categories' },
        { title: 'Copyright By', href: '/products/categories' },
      ],
    },
    {
      title: 'User Management',
      icon: FaUsers,
      submenus: [
        { title: 'Change Password', href: `/admin/change-password/${email}` },
        { title: 'Permissions', href: '/users/permissions' },
      ],
    },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mobileTranslateClass = isMobileOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <>
      {/* 1. Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-[1050] p-2 rounded-lg text-white bg-blue-700 lg:hidden transition-transform duration-300"
      >
        {isMobileOpen ? (
          <FaTimes className="w-6 h-6 transform rotate-90 transition duration-300" />
        ) : (
          <FaBars className="w-6 h-6 transition duration-300" />
        )}
      </button>

      {/* 2. Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-[990] bg-black/50 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* 3. Sidebar */}
      <nav
        className={`fixed left-0 top-0 z-[1000] h-full w-64 bg-gray-800 shadow-xl p-4 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${mobileTranslateClass} lg:translate-x-0`}
      >
        <div className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
          Next.js App
        </div>

        <ul className="space-y-1">
          {MENU_ITEMS.map((item, index) => (
            <SidebarItem key={index} item={item} email={email} username={username} />
          ))}
        </ul>
      </nav>

      {/* 4. Layout Spacer */}
      <div className="hidden lg:block w-64 h-full flex-shrink-0" />
    </>
  );
}
