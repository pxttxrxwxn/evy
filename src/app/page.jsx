'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Zap, Navigation, Star, Clock, Phone, Filter, Menu, User, Heart, Battery, Car } from 'lucide-react';

const EVYApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Mock data สถานีชาร์จ
  const stations = [
    {
      id: 1,
      name: 'PTT Station Central World',
      address: '999/9 Rama I Road, Pathumwan, Bangkok',
      distance: '0.8 km',
      available: 3,
      total: 4,
      price: '8 บาท/kWh',
      chargerType: 'DC Fast',
      power: '150 kW',
      rating: 4.8,
      status: 'available',
      lat: 13.7563,
      lng: 100.5018,
      location:'https://www.google.com/maps/dir//%E0%B8%9B%E0%B8%B1%E0%B9%8A%E0%B8%A1%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99+%E0%B9%81%E0%B8%A5%E0%B8%B0+%E0%B8%AD%E0%B8%B5%E0%B8%A7%E0%B8%B5+%E0%B8%9B%E0%B8%95%E0%B8%97.%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%99+1323+%E0%B8%96.+%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1%E0%B8%97%E0%B8%B5%E0%B9%88+4+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B1%E0%B8%99+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10330/@19.0318719,99.8949598,3271m/data=!3m1!1e3!4m10!4m9!1m1!4e2!1m5!1m1!1s0x30e29916093b5f61:0xb3c1c30d315b0173!2m2!1d100.5249486!2d13.734663!3e2?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 2,
      name: 'Total Access Communication PLC.',
      address: '286/24, Pahonyothin Road, Tambon Mae Tam Amphoe Muang Payao, 56000',
      distance: '1.2 km',
      available: 2,
      total: 6,
      price: '7.5 บาท/kWh',
      chargerType: 'AC/DC',
      power: '22-50 kW',
      rating: 4.6,
      status: 'available',
      lat: 13.7460,
      lng: 100.5340,
      location:'https://www.google.com/maps/dir/19.0318734,99.8949544/Total+Access+Communication+PLC.,+286%2F24,+Pahonyothin+Road,+Tambon+Mae+Tam+Amphoe+Muang+Payao,+56000/@19.0824452,99.9059407,13078m/data=!3m2!1e3!4b1!4m19!1m8!3m7!1s0x30d82d37acd036c1:0x9a4e4c46bbe2b42!2sTotal+Access+Communication+PLC.!8m2!3d19.136229!4d99.910226!15sCiBldiBzdGF0aW9uIOC5g-C4geC4peC5ieC4ieC4seC4mSIDkAEBkgEhZWxlY3RyaWNfdmVoaWNsZV9jaGFyZ2luZ19zdGF0aW9uqgFaEAEqDiIKZXYgc3RhdGlvbig1Mh8QASIbGLmHZL8rDyNrWw_--4l503frD8FMtMuXptUTMiUQAiIhZXYgc3RhdGlvbiDguYPguIHguKXguYkg4LiJ4Lix4LiZ4AEA!16s%2Fg%2F1pzrgqrz5!4m9!1m1!4e1!1m5!1m1!1s0x30d82d37acd036c1:0x9a4e4c46bbe2b42!2m2!1d99.910226!2d19.136229!3e0?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      id: 3,
      name: 'EA Anywhere EmQuartier',
      address: '693 Sukhumvit Road, Khlong Toei, Bangkok',
      distance: '2.1 km',
      available: 0,
      total: 4,
      price: '9 บาท/kWh',
      chargerType: 'DC Ultra Fast',
      power: '350 kW',
      rating: 4.9,
      status: 'busy',
      lat: 13.7307,
      lng: 100.5418,
      location:'https://www.google.com/maps/dir//%E0%B8%9B%E0%B8%B1%E0%B9%8A%E0%B8%A1%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A1%E0%B8%B1%E0%B8%99+%E0%B9%81%E0%B8%A5%E0%B8%B0+%E0%B8%AD%E0%B8%B5%E0%B8%A7%E0%B8%B5+%E0%B8%9B%E0%B8%95%E0%B8%97.%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%99+1323+%E0%B8%96.+%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1%E0%B8%97%E0%B8%B5%E0%B9%88+4+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B1%E0%B8%99+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10330/@19.0318719,99.8949598,3271m/data=!3m1!1e3!4m10!4m9!1m1!4e2!1m5!1m1!1s0x30e29916093b5f61:0xb3c1c30d315b0173!2m2!1d100.5249486!2d13.734663!3e2?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D'
    }
  ];

  const toggleFavorite = (stationId) => {
    setFavorites(prev => 
      prev.includes(stationId) 
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId]
    );
  };

  const MapView = () => (
    <div className="relative h-full bg-green-50 overflow-hidden">
      {/* Map Background - Bangkok Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-100">
        {/* River (Chao Phraya) */}
        <div className="absolute top-0 left-1/3 w-8 h-full bg-blue-200 transform rotate-12 opacity-60"></div>
        <div className="absolute top-0 left-1/3 w-6 h-full bg-blue-300 transform rotate-12 opacity-40 ml-1"></div>
        
        {/* Major Roads */}
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-400 opacity-70"></div>
        <div className="absolute top-2/4 left-0 w-full h-2 bg-gray-500 opacity-70"></div>
        <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-400 opacity-70"></div>
        
        <div className="absolute left-1/4 top-0 w-1 h-full bg-gray-400 opacity-70"></div>
        <div className="absolute left-2/4 top-0 w-2 h-full bg-gray-500 opacity-70"></div>
        <div className="absolute left-3/4 top-0 w-1 h-full bg-gray-400 opacity-70"></div>
        
        {/* BTS/MRT Lines */}
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-green-600 opacity-60"></div>
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-blue-600 opacity-60"></div>
        
        {/* Districts/Areas */}
        <div className="absolute top-8 left-8 w-20 h-16 bg-yellow-100 rounded opacity-50">
          <div className="text-xs text-gray-600 p-1">จตุจักร</div>
        </div>
        <div className="absolute top-16 right-12 w-24 h-20 bg-pink-100 rounded opacity-50">
          <div className="text-xs text-gray-600 p-1">สยาม</div>
        </div>
        <div className="absolute bottom-20 left-4 w-28 h-18 bg-purple-100 rounded opacity-50">
          <div className="text-xs text-gray-600 p-1">สีลม</div>
        </div>
        <div className="absolute bottom-12 right-8 w-26 h-16 bg-orange-100 rounded opacity-50">
          <div className="text-xs text-gray-600 p-1">อโศก</div>
        </div>
        
        {/* Parks */}
        <div className="absolute top-1/2 left-16 w-12 h-12 bg-green-200 rounded-full opacity-60"></div>
        <div className="absolute top-20 right-20 w-10 h-10 bg-green-200 rounded-full opacity-60"></div>
      </div>

      {/* EV Charging Stations */}
      {stations.map((station, index) => {
        const positions = [
          { top: '25%', left: '30%' }, // PTT Central World
          { top: '45%', left: '60%' }, // PEA Siam Paragon  
          { top: '65%', right: '25%' } // EA EmQuartier
        ];
        const position = positions[index] || { top: '50%', left: '50%' };
        
        return (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={position}
            onClick={() => setSelectedStation(station)}
          >
            {/* Station Pin */}
            <div className={`relative ${station.status === 'available' ? 'animate-pulse' : ''}`}>
              <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${
                station.status === 'available' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              } transition-colors`}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              
              {/* Availability Badge */}
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                station.status === 'available' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {station.available}
              </div>
              
              {/* Pulse Effect for Available Stations */}
              {station.status === 'available' && (
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping"></div>
              )}
            </div>
            
            {/* Station Info Popup on Hover */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-32 opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <h4 className="text-xs font-semibold text-gray-800 mb-1">{station.name}</h4>
              <p className="text-xs text-gray-600">{station.available}/{station.total} ว่าง</p>
              <p className="text-xs text-blue-600 font-medium">{station.price}</p>
            </div>
          </div>
        );
      })}

      {/* User Location */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white"></div>
          <div className="absolute inset-0 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Distance Circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 border border-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-blue-400 rounded-full opacity-40"></div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors">
          <Navigation className="w-5 h-5 text-gray-700" />
        </button>
        <button className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors">
          <MapPin className="w-5 h-5 text-gray-700" />
        </button>
        <button className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors">
          <span className="text-lg font-bold text-gray-700">+</span>
        </button>
        <button className="bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors">
          <span className="text-lg font-bold text-gray-700">-</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-xs font-semibold text-gray-800 mb-2">สถานีชาร์จ</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">ว่าง</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-600">เต็ม</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-xs text-gray-600">ตำแหน่งของคุณ</span>
        </div>
      </div>

      {/* Search Overlay */}
      <div className="absolute top-4 left-4 right-20">
        <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาสถานที่บนแผนที่"
            className="flex-1 text-sm outline-none text-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const StationCard = ({ station }) => (
    <div 
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setSelectedStation(station)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{station.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{station.address}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {station.distance}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {station.rating}
            </span>
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(station.id);
          }}
          className="p-2"
        >
          <Heart 
            className={`w-5 h-5 ${
              favorites.includes(station.id) 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-400'
            }`} 
          />
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
            station.status === 'available' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            <Zap className="w-3 h-3" />
            {station.available}/{station.total} ว่าง
          </div>
          <span className="text-xs text-gray-500">{station.chargerType}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-blue-600">{station.price}</p>
          <p className="text-xs text-gray-500">{station.power}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="backdrop-blur-md bg-white/20 bg-opacity-20 p-2 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">EVY</h1>
          </div>
          <button className="p-2">
            <User className="w-6 h-6" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative bg-white rounded-xl">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาสถานีชาร์จ หรือ สถานที่"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="absolute right-3 top-3 p-1 bg-blue-100 rounded-lg"
          >
            <Filter className="w-4 h-4 text-blue-600" />
          </button>
        </div>
        
        {/* Quick Stats */}
        <div className="flex justify-between mt-4 text-center">
          <div className="flex-1">
            <p className="text-white/80 text-xs">สถานีทั้งหมด</p>
            <p className="font-bold text-lg">2,847</p>
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-xs">ใกล้เคียง</p>
            <p className="font-bold text-lg">12</p>
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-xs">ว่าง</p>
            <p className="font-bold text-lg">8</p>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="bg-white p-4 border-b border-gray-200 text-black">
          <div className="flex gap-2 flex-wrap">
            {['ทั้งหมด', 'DC Fast', 'Ultra Fast', 'ว่าง', 'ใกล้ที่สุด', 'ราคาถูก'].map((filter) => (
              <button key={filter} className="px-3 py-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full text-sm transition-colors">
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'map', label: 'แผนที่', icon: MapPin },
            { id: 'list', label: 'รายการ', icon: Menu },
            { id: 'favorites', label: 'รายการโปรด', icon: Heart }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 ${
                activeTab === id 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden pb-20">
        {activeTab === 'map' && <MapView />}
        
        {activeTab === 'search' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">ค้นหาสถานีชาร์จ</h2>
            </div>
            
            {/* Search Results */}
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">ผลการค้นหา</h3>
                <p className="text-sm text-gray-600">ใส่คำค้นหาในช่องด้านบนเพื่อค้นหาสถานีชาร์จ</p>
              </div>
              
              {searchQuery && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">ผลลัพธ์สำหรับ "{searchQuery}"</h4>
                  {stations
                    .filter(station => 
                      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      station.address.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(station => (
                      <StationCard key={station.id} station={station} />
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'list' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">สถานีใกล้เคียง</h2>
              <span className="text-sm text-gray-600">{stations.length} แห่ง</span>
            </div>
            {stations.map(station => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        )}
        
        {activeTab === 'route' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="font-semibold text-gray-800 mb-2">วางแผนการเดินทาง</h2>
              <p className="text-gray-600 mb-6">เลือกจุดเริ่มต้นและปลายทางเพื่อวางแผนเส้นทางที่ดีที่สุด</p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <input 
                      type="text" 
                      placeholder="จุดเริ่มต้น" 
                      className="flex-1 bg-transparent outline-none text-gray-700"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <input 
                      type="text" 
                      placeholder="ปลายทาง" 
                      className="flex-1 bg-transparent outline-none text-gray-700"
                    />
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                  ค้นหาเส้นทาง
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="font-semibold text-gray-800 mb-4">รายการโปรด</h2>
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">ยังไม่มีรายการโปรด</p>
                <p className="text-sm text-gray-400 mt-2">แตะไอคอนหัวใจเพื่อเพิ่มสถานี</p>
              </div>
            ) : (
              stations
                .filter(station => favorites.includes(station.id))
                .map(station => <StationCard key={station.id} station={station} />)
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="p-4 h-full overflow-y-auto">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">สวัสดี!</h2>
              <p className="text-gray-600 mb-6">ผู้ใช้ EVY</p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h3 className="font-medium text-gray-800 mb-2">การใช้งาน</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• สถานีที่ใช้: 12 แห่ง</p>
                    <p>• ระยะทางรวม: 1,234 กม.</p>
                    <p>• พลังงานประหยัด: 245 kWh</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h3 className="font-medium text-gray-800 mb-2">การตั้งค่า</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-gray-600 py-2">แจ้งเตือน</button>
                    <button className="w-full text-left text-sm text-gray-600 py-2">ภาษา</button>
                    <button className="w-full text-left text-sm text-gray-600 py-2">เกี่ยวกับ</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Station Detail Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 max-w-md mx-auto">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedStation.name}</h3>
                <p className="text-gray-600 mb-3">{selectedStation.address}</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-sm text-black">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {selectedStation.distance}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-black">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {selectedStation.rating} (124 รีวิว)
                  </span>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStation(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl ml-4 flex-shrink-0"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-black">ความพร้อม</span>
                </div>
                <p className="text-lg font-bold text-green-600">
                  {selectedStation.available}/{selectedStation.total} ว่าง
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-black">ราคา</span>
                </div>
                <p className="text-lg font-bold text-blue-600">{selectedStation.price}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!selectedStation?.location) return;

                  // ใช้ Geolocation API ดึงตำแหน่งผู้ใช้
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;

                        // สร้างลิงก์ Google Maps จากตำแหน่งปัจจุบันไปยัง selectedStation
                        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(selectedStation.location)}`;
                        window.open(mapsUrl, '_blank');
                      },
                      (error) => {
                        alert('ไม่สามารถเข้าถึงตำแหน่งของคุณได้');
                      }
                    );
                  } else {
                    alert('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง');
                  }
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                นำทาง
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  alert('โทรหาสถานี');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                โทร
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white border-t border-gray-200 px-4 py-2 w-full max-w-md">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center py-2 ${
              activeTab === 'map' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs">แผนที่</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center py-2 ${
              activeTab === 'search' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">ค้นหา</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('route')}
            className={`flex flex-col items-center py-2 ${
              activeTab === 'route' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Car className="w-5 h-5 mb-1" />
            <span className="text-xs">เดินทาง</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`flex flex-col items-center py-2 ${
              activeTab === 'favorites' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Heart className="w-5 h-5 mb-1" />
            <span className="text-xs">โปรด</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">โปรไฟล์</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EVYApp;