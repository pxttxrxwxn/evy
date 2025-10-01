'use client';
import React, { useState } from 'react';
import { Zap, Navigation, MapPin } from 'lucide-react';
import StationCard from '../StationCard';

export default function MapView() {
  // ตัวอย่างสถานีชาร์จ
  const stations = [
    { id: 1, name: 'PTT Station Central World', lat: 13.7563, lng: 100.5018, distance: '0.8 km', available: 3, total: 4, price: '8 บาท/kWh', chargerType: 'DC Fast', power: '150 kW', rating: 4.8, status: 'available', address: '999/9 Rama I Road, Pathumwan, Bangkok' },
    { id: 2, name: 'Total Access Communication PLC.', lat: 19.136111, lng: 99.91, distance: '1.2 km', available: 2, total: 6, price: '7.5 บาท/kWh', chargerType: 'AC/DC', power: '22-50 kW', rating: 4.6, status: 'available', address: '286/24, Pahonyothin Road, Tambon Mae Tam Amphoe Muang Payao, 56000' },
    { id: 3, name: 'EA Anywhere EmQuartier', lat: 19.0828495, lng: 99.7411272, distance: '2.1 km', available: 0, total: 4, price: '9 บาท/kWh', chargerType: 'DC Ultra Fast', power: '350 kW', rating: 4.9, status: 'busy', address: '693 Sukhumvit Road, Khlong Toei, Bangkok' },
  ];

  const [favorites, setFavorites] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="relative h-full bg-green-50 overflow-hidden">
      <p className="text-center p-4 text-gray-500">นี่เป็นตัวอย่าง MapView แบบ Mockup (แผนที่ปลอม)</p>

      {stations.map(station => (
        <StationCard
          key={station.id}
          station={station}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onClick={() => setSelectedStation(station)}
        />
      ))}
    </div>
  );
}
