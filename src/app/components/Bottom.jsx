'use client';
import React from 'react';
import { Search, MapPin, User, Heart, Car } from 'lucide-react';

export default function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'map', label: 'แผนที่', icon: MapPin },
    { id: 'search', label: 'ค้นหา', icon: Search },
    { id: 'route', label: 'เดินทาง', icon: Car },
    { id: 'favorites', label: 'โปรด', icon: Heart },
    { id: 'profile', label: 'โปรไฟล์', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 w-full">
      <div className="flex justify-around max-w-7xl mx-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center py-2 transition-colors ${
              activeTab === id ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6 mb-1 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ✅ Main App
const EVYApp = () => {
  const [activeTab, setActiveTab] = React.useState('map');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <FilterPanel showFilter={showFilter} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">EVY App</h2>
          <p className="text-gray-600">Navbar Components รองรับทุกหน้าจอ</p>
          <p className="text-sm text-gray-500 mt-4">
            ปัจจุบัน: <span className="font-semibold text-blue-600">{activeTab}</span>
          </p>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
