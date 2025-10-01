'use client';
import React, { useState } from 'react';
import StationCard from '../StationCard';

export default function SearchPage({ searchQuery }) {
  const stations = [
    { id: 1, name: 'PTT Station Central World', address: '999/9 Rama I Road, Pathumwan, Bangkok', distance: '0.8 km', available: 3, total: 4, price: '8 บาท/kWh', chargerType: 'DC Fast', power: '150 kW', rating: 4.8, status: 'available' },
    { id: 2, name: 'Total Access Communication PLC.', address: '286/24, Pahonyothin Road, Tambon Mae Tam Amphoe Muang Payao, 56000', distance: '1.2 km', available: 2, total: 6, price: '7.5 บาท/kWh', chargerType: 'AC/DC', power: '22-50 kW', rating: 4.6, status: 'available' },
    { id: 3, name: 'EA Anywhere EmQuartier', address: '693 Sukhumvit Road, Khlong Toei, Bangkok', distance: '2.1 km', available: 0, total: 4, price: '9 บาท/kWh', chargerType: 'DC Ultra Fast', power: '350 kW', rating: 4.9, status: 'busy' },
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredStations = stations.filter(
    s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 h-full overflow-y-auto">
      {!searchQuery && <p className="text-gray-500">ใส่คำค้นหาในช่องด้านบนเพื่อค้นหาสถานีชาร์จ</p>}

      {searchQuery && filteredStations.map(station => (
        <StationCard
          key={station.id}
          station={station}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onClick={() => {}}
        />
      ))}
    </div>
  );
}
