'use client';
import React, { useState } from 'react';
import StationCard from '../StationCard';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const stations = [
    { id: 1, name: 'PTT Station Central World', address: '999/9 Rama I Road, Pathumwan, Bangkok', distance: '0.8 km', available: 3, total: 4, price: '8 บาท/kWh', chargerType: 'DC Fast', power: '150 kW', rating: 4.8, status: 'available' },
    { id: 2, name: 'Total Access Communication PLC.', address: '286/24, Pahonyothin Road, Tambon Mae Tam Amphoe Muang Payao, 56000', distance: '1.2 km', available: 2, total: 6, price: '7.5 บาท/kWh', chargerType: 'AC/DC', power: '22-50 kW', rating: 4.6, status: 'available' },
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="p-4 h-full overflow-y-auto">
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">ยังไม่มีรายการโปรด</p>
          <p className="text-sm text-gray-400 mt-2">แตะไอคอนหัวใจเพื่อเพิ่มสถานี</p>
        </div>
      ) : (
        stations.filter(s => favorites.includes(s.id)).map(station => (
          <StationCard key={station.id} station={station} favorites={favorites} toggleFavorite={toggleFavorite} onClick={() => {}} />
        ))
      )}
    </div>
  );
}
