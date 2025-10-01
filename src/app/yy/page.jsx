{/*
'use client';
import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Bottom from './components/bottom/Bottom';

import MapView from './components/pages/MapView';
import SearchPage from './components/pages/SearchPage';
import ListPage from './components/pages/ListPage';
import RoutePage from './components/pages/RoutePage';
import FavoritesPage from './components/pages/FavoritesPage';
import ProfilePage from './components/pages/ProfilePage';

const EVYApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-gray-50 h-screen overflow-hidden">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />

      <div className="flex-1 overflow-hidden pb-20">
        {activeTab === 'map' && <MapView />}
        {activeTab === 'search' && <SearchPage searchQuery={searchQuery} />}
        {activeTab === 'list' && <ListPage />}
        {activeTab === 'route' && <RoutePage />}
        {activeTab === 'favorites' && <FavoritesPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>

      <Bottom activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default EVYApp;
*/}