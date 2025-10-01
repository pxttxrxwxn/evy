'use client';
import React from 'react';
import { MapPin, Star, Zap, Heart, Battery } from 'lucide-react';

export default function StationCard({ station, favorites, toggleFavorite, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
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
            className={`w-5 h-5 ${favorites.includes(station.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
            station.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
}
