'use client';
import React from 'react';
import { Zap, User, Search, Filter } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, showFilter, setShowFilter }) {
  return (
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
  );
}
