'use client';
import React, { useState, useEffect } from 'react';
import { MapPin, Zap, Clock, Car, Calculator, Navigation, Battery, Star, Filter, Search, ChevronRight, Phone, Bookmark } from 'lucide-react';

const EVYApp = () => {
  const [currentTab, setCurrentTab] = useState('map');
  const [selectedStation, setSelectedStation] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [vehicleLocation, setVehicleLocation] = useState({ lat: 13.7563, lng: 100.5018, address: 'สยาม' });

  // Mock charging stations data
  const chargingStations = [
    {
      id: 1,
      name: 'เซ็นทรัล ชิดลม',
      address: '999 พลีนจิต กรุงเทพมหานคร',
      distance: '2.5 กม.',
      available: 3,
      total: 8,
      price: 8.50,
      type: 'DC Fast',
      rating: 4.5,
      lat: 13.7510,
      lng: 100.5467,
      amenities: ['ห้างสรรพสินค้า', 'ร้านอาหาร', 'ที่จอดรถ']
    },
    {
      id: 2,
      name: 'PTT สถานีบางซื่อ',
      address: '158 ถ.กำแพงเพชร จตุจักร',
      distance: '4.2 กม.',
      available: 2,
      total: 4,
      price: 7.20,
      type: 'AC Normal',
      rating: 4.2,
      lat: 13.8199,
      lng: 100.5307,
      amenities: ['ร้านสะดวกซื้อ', 'ห้องน้ำ', 'คาเฟ่']
    },
    {
      id: 3,
      name: 'เทอมินอล 21',
      address: '2 ถ.สุขุมวิท วัฒนา',
      distance: '3.1 กม.',
      available: 1,
      total: 6,
      price: 9.00,
      type: 'DC Fast',
      rating: 4.7,
      lat: 13.7373,
      lng: 100.5597,
      amenities: ['ห้างสรรพสินค้า', 'ภาพยนตร์', 'ร้านอาหาร']
    }
  ];

  const filteredStations = chargingStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'available' && station.available > 0) ||
                         (filterType === 'dc' && station.type === 'DC Fast') ||
                         (filterType === 'ac' && station.type === 'AC Normal');
    return matchesSearch && matchesFilter;
  });

  const TabButton = ({ id, label, icon: Icon, active }) => (
    <button
      onClick={() => setCurrentTab(id)}
      className={`flex-1 flex flex-col items-center py-2 px-1 ${
        active ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );

  const StationCard = ({ station, onSelect }) => (
    <div 
      className="bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-all"
      onClick={() => onSelect(station)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">{station.name}</h3>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
          <Star size={12} className="text-yellow-500 mr-1" />
          <span className="text-xs font-medium">{station.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-2 flex items-center">
        <MapPin size={12} className="mr-1" />
        {station.address}
      </p>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500">{station.distance}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          station.available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          ว่าง {station.available}/{station.total} ช่อง
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Zap size={14} className="text-blue-500 mr-1" />
          <span className="text-xs font-medium">{station.type}</span>
        </div>
        <span className="text-blue-600 font-bold text-sm">฿{station.price}/kWh</span>
      </div>
    </div>
  );

  const MapTab = () => (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-1">หาจุดชาร์จใกล้คุณ</h2>
        <p className="text-blue-100 text-sm">พบ {filteredStations.length} จุดชาร์จในบริเวณนี้</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาจุดชาร์จ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">ทั้งหมด</option>
            <option value="available">ว่าง</option>
            <option value="dc">DC Fast</option>
            <option value="ac">AC Normal</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredStations.map(station => (
          <StationCard 
            key={station.id} 
            station={station} 
            onSelect={setSelectedStation}
          />
        ))}
      </div>
    </div>
  );

  const BookingTab = () => (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-1">จองจุดชาร์จ</h2>
        <p className="text-green-100 text-sm">จองล่วงหน้าเพื่ความสะดวก</p>
      </div>
      
      {bookingData ? (
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-900">การจองของคุณ</h3>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">ยืนยันแล้ว</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">สถานี:</span>
              <span className="font-medium">{bookingData.stationName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">วันที่:</span>
              <span className="font-medium">{bookingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">เวลา:</span>
              <span className="font-medium">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ช่องชาร์จ:</span>
              <span className="font-medium">#{bookingData.slotNumber}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
              ยกเลิกการจอง
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock size={48} className="text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-600 mb-2">ยังไม่มีการจอง</h3>
          <p className="text-gray-500 text-sm mb-4">เลือกจุดชาร์จจากหน้าแผนที่เพื่อทำการจอง</p>
          <button 
            onClick={() => setCurrentTab('map')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            หาจุดชาร์จ
          </button>
        </div>
      )}
    </div>
  );

  const TrackingTab = () => (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-1">ติดตามรถ</h2>
        <p className="text-purple-100 text-sm">ดูตำแหน่งรถของคุณแบบเรียลไทม์</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-3">
          <Car size={20} className="text-blue-500 mr-2" />
          <h3 className="font-semibold text-gray-900">ตำแหน่งรถของคุณ</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">ตำแหน่งปัจจุบัน:</span>
            <span className="font-medium text-sm text-black">{vehicleLocation.address}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">ระดับแบตเตอรี่:</span>
            <div className="flex items-center">
              <Battery size={16} className="text-green-500 mr-1" />
              <span className="font-medium text-sm text-green-600">78%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">ระยะที่เหลือ:</span>
            <span className="font-medium text-sm text-black">~245 กม.</span>
          </div>
        </div>
        
        {bookingData && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">เส้นทางไป:</span>
              <span className="font-medium text-sm">{bookingData.stationName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ระยะทาง: 4.2 กม.</span>
              <span className="text-blue-600 font-medium">เวลา: ~12 นาที</span>
            </div>
          </div>
        )}
      </div>
      
      <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center hover:bg-blue-600 transition-colors">
        <Navigation size={18} className="mr-2" />
        เปิดแผนที่นำทาง
      </button>
    </div>
  );

  const CalculatorTab = () => {
    const [batteryLevel, setBatteryLevel] = useState(20);
    const [targetLevel, setTargetLevel] = useState(80);
    const [pricePerKwh, setPricePerKwh] = useState(8.5);
    const [batteryCapacity, setBatteryCapacity] = useState(60);

    const energyNeeded = (targetLevel - batteryLevel) / 100 * batteryCapacity;
    const estimatedCost = energyNeeded * pricePerKwh;
    const chargingTime = energyNeeded / 22; // Assuming 22kW charging speed

    return (
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-1">คำนวณค่าไฟ</h2>
          <p className="text-orange-100 text-sm">ประเมินค่าใช้จ่ายในการชาร์จ</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับแบตเตอรี่ปัจจุบัน ({batteryLevel}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={batteryLevel}
              onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระดับที่ต้องการชาร์จ ({targetLevel}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={targetLevel}
              onChange={(e) => setTargetLevel(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ความจุแบตเตอรี่ (kWh)
              </label>
              <input
                type="number"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคาต่อหน่วย (฿/kWh)
              </label>
              <input
                type="number"
                step="0.1"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-black"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Calculator size={18} className="mr-2 text-blue-500" />
            ผลการคำนวณ
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">พลังงานที่ต้องการ:</span>
              <span className="font-bold text-blue-600">{energyNeeded.toFixed(1)} kWh</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">เวลาในการชาร์จ (โดยประมาณ):</span>
              <span className="font-bold text-green-600">{chargingTime.toFixed(1)} ชั่วโมง</span>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium">ค่าใช้จ่ายรวม:</span>
                <span className="font-bold text-lg text-orange-600">฿{estimatedCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StationDetailModal = ({ station, onClose, onBook }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">{station.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="text-gray-400 mt-1" size={16} />
            <div>
              <p className="text-gray-900 text-sm">{station.address}</p>
              <p className="text-gray-500 text-xs mt-1">{station.distance} จากตำแหน่งของคุณ</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Zap className="text-blue-500 mr-2" size={16} />
                <span className="text-sm font-medium">ประเภท</span>
              </div>
              <p className="text-sm text-gray-700">{station.type}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Battery className="text-green-500 mr-2" size={16} />
                <span className="text-sm font-medium">ช่องว่าง</span>
              </div>
              <p className="text-sm text-gray-700">{station.available}/{station.total} ช่อง</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">ราคา:</span>
              <span className="text-lg font-bold text-blue-600">฿{station.price}/kWh</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">สิ่งอำนวยความสะดวก</h3>
            <div className="flex flex-wrap gap-2">
              {station.amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center">
              <Phone size={16} className="mr-2" />
              โทร
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center">
              <Navigation size={16} className="mr-2" />
              นำทาง
            </button>
          </div>
          
          <button 
            onClick={() => {
              onBook(station);
              onClose();
            }}
            disabled={station.available === 0}
            className={`w-full py-3 rounded-lg font-medium ${
              station.available > 0 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {station.available > 0 ? 'จองตอนนี้' : 'ช่องเต็ม'}
          </button>
        </div>
      </div>
    </div>
  );

  const handleBooking = (station) => {
    const now = new Date();
    const bookingDate = now.toLocaleDateString('th-TH');
    const bookingTime = `${String(now.getHours() + 1).padStart(2, '0')}:00`;
    
    setBookingData({
      stationName: station.name,
      date: bookingDate,
      time: bookingTime,
      slotNumber: Math.floor(Math.random() * station.total) + 1
    });
    setCurrentTab('booking');
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-lg mr-3">
              <Zap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EVY</h1>
              <p className="text-xs text-gray-500">Electric Vehicle Hub</p>
            </div>
          </div>
          <Bookmark className="text-gray-400" size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="pb-16">
        {currentTab === 'map' && <MapTab />}
        {currentTab === 'booking' && <BookingTab />}
        {currentTab === 'tracking' && <TrackingTab />}
        {currentTab === 'calculator' && <CalculatorTab />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex">
          <TabButton id="map" label="แผนที่" icon={MapPin} active={currentTab === 'map'} />
          <TabButton id="booking" label="จอง" icon={Clock} active={currentTab === 'booking'} />
          <TabButton id="tracking" label="ติดตาม" icon={Car} active={currentTab === 'tracking'} />
          <TabButton id="calculator" label="คำนวณ" icon={Calculator} active={currentTab === 'calculator'} />
        </div>
      </div>

      {/* Station Detail Modal */}
      {selectedStation && (
        <StationDetailModal 
          station={selectedStation} 
          onClose={() => setSelectedStation(null)}
          onBook={handleBooking}
        />
      )}
    </div>
  );
};

export default EVYApp;