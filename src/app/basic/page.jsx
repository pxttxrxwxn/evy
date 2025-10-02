'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Zap, Navigation, Star, Phone, Filter, Menu, User, Heart, Battery, Car, Tickets, Brain } from 'lucide-react';
import Image from 'next/image';
import Swal from "sweetalert2";
const EVYApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapUrl(`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`);
        }
      );
    }
  }, []);
  // Mock data สถานีชาร์จ
  const stations = [
    {
      id: 1,
      name: 'PTT Station Central World',
      address: '999/9 Rama I Road, Pathumwan, Bangkok',
      distance: '0.8 km',
      total: 4,
      price: '8 บาท/kWh',
      chargerType: 'DC Fast',
      power: '150 kW',
      rating: 4.8,
      status: 'available',
      lat: 13.7563,
      lng: 100.5018
    },
    {
      id: 2,
      name: 'Total Access Communication PLC.',
      address: '286/24, Pahonyothin Road, Tambon Mae Tam Amphoe Muang Payao, 56000',
      distance: '1.2 km',
      total: 6,
      price: '7.5 บาท/kWh',
      chargerType: 'AC/DC',
      power: '22-50 kW',
      rating: 4.6,
      status: 'available',
      lat: 19.136111,
      lng: 99.91

    },
    {
      id: 3,
      name: 'EA Anywhere EmQuartier',
      address: '693 Sukhumvit Road, Khlong Toei, Bangkok',
      distance: '2.1 km',
      total: 4,
      price: '9 บาท/kWh',
      chargerType: 'DC Ultra Fast',
      power: '350 kW',
      rating: 4.9,
      status: 'available',
      lat: 19.0828495,
      lng: 99.7411272
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
      <div className="h-full w-full">
        {mapUrl ? (
          <iframe
            src={mapUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <p className="text-center mt-10 text-gray-500">กำลังโหลดแผนที่...</p>
        )}
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
            {station.total} หัวชาร์จ
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-[50%]">
              <Image src="/LOGO.png" alt="EVY Logo" width={24} height={24} />
            </div>
            <h1 className="text-xl font-bold">EVY</h1>
          </div>
          <button className="p-2">
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative bg-white rounded-xl">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาสถานีชาร์จ หรือ สถานที่"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim() !== '') {
                setActiveTab("search");
              } else {
                setActiveTab("map");
              }
              }}
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
      <div className="flex-1 relative mb-18 overflow-y-auto">
        {activeTab === 'map' && (
          <div className="absolute inset-0">
            <iframe
              src={mapUrl || "https://www.google.com/maps?q=19.032433,99.893658&z=15&output=embed"}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
        
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
          <div className="relative p-6 h-full overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-gray-50">
            <div className="text-center py-10">

              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <div className="w-28 h-28 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <User className="w-14 h-14 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-3 border-white shadow"></span>
              </div>

              {/* User Info */}
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">สวัสดี! 👋</h2>
              <p className="text-gray-500 mb-8 text-lg">ผู้ใช้ EVY</p>

              {/* Usage Section */}
              <div className="space-y-6 max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-left border border-gray-100 hover:shadow-xl transition">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                    📊 การใช้งาน
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-gray-500">สถานี</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">1,234</p>
                      <p className="text-xs text-gray-500">กม.</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">245</p>
                      <p className="text-xs text-gray-500">kWh</p>
                    </div>
                  </div>
                </div>

                {/* Settings Section */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-left border border-gray-100 hover:shadow-xl transition">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                    ⚙️ การตั้งค่า
                  </h3>
                  <div className="divide-y divide-gray-200">
                    <button className="w-full flex items-center gap-3 text-left text-base text-gray-700 py-3 px-2 hover:bg-gray-50 rounded-lg transition">
                      🔔 <span>แจ้งเตือน</span>
                    </button>
                    <button className="w-full flex items-center gap-3 text-left text-base text-gray-700 py-3 px-2 hover:bg-gray-50 rounded-lg transition">
                      🌐 <span>ภาษา</span>
                    </button>
                    <button className="w-full flex items-center gap-3 text-left text-base text-gray-700 py-3 px-2 hover:bg-gray-50 rounded-lg transition">
                      ℹ️ <span>เกี่ยวกับ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Station Detail Modal + Map */}
      {selectedStation && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-end justify-center z-50 p-4 sm:p-6">
          <div className="bg-white w-full sm:w-96 md:w-[450px] lg:w-[550px] rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedStation.name}</h3>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">{selectedStation.address}</p>
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm sm:text-base">
                  <span className="flex items-center gap-1 text-black">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {selectedStation.distance}
                  </span>
                  <span className="flex items-center gap-1 text-black">
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

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-black">หัวชาร์จทั้งหมด</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-green-600">
                  {selectedStation.total} หัวชาร์จ
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-black">ราคา</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{selectedStation.price}</p>
              </div>
            </div>

            {/* ปุ่มนำทางและโทร */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (!selectedStation?.lat || !selectedStation?.lng) return;
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        const mapsAppUrl = `google.maps://?saddr=${latitude},${longitude}&daddr=${selectedStation.lat},${selectedStation.lng}`;
                        const mapsWebUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${selectedStation.lat},${selectedStation.lng}`;
                        window.location.href = mapsAppUrl;
                        setTimeout(() => window.open(mapsWebUrl, "_blank"), 500);
                      },
                      () => alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้")
                    );
                  } else alert("เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                นำทาง
              </button>
              <button 
                onClick={() => alert('โทรหาสถานี')}
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 w-full">
        <div className="flex justify-around max-w-7xl mx-auto">
          {[
            { id: "map", label: "แผนที่", icon: MapPin },
            { id: "AI", label: "AI Planner", icon: Brain },
            { id: "route", label: "เดินทาง", icon: Car },
            { id: "coupon", label: "คูปอง", icon: Tickets },
            { id: "profile", label: "โปรไฟล์", icon: User },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                if (id === "coupon") {
                  Swal.fire({
                    title: "กรุณาสมัครสมาชิกGoldก่อนใช้งาน",
                    icon: "error",
                    draggable: true,
                  }).then(() => {
                    setActiveTab("map");
                  });
                } else if (id === "AI") {
                  Swal.fire({
                    title: "กรุณาสมัครสมาชิกPlatinumก่อนใช้งาน",
                    icon: "error",
                    draggable: true,
                  }).then(() => {
                    setActiveTab("map");
                  });
                } else {
                  setActiveTab(id);
                }
              }}
              className={`flex flex-col items-center py-2 sm:py-3 transition-colors ${
                activeTab === id && id !== "AI" && id !== "coupon"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
              <span className="text-xs sm:text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EVYApp;