'use client';
import React from 'react';
import { Car } from 'lucide-react';

export default function RoutePage() {
  return (
    <div className="p-4 h-full overflow-y-auto text-center">
      <Car className="w-16 h-16 text-blue-500 mx-auto mb-4" />
      <h2 className="font-semibold text-gray-800 mb-2">วางแผนการเดินทาง</h2>
      <p className="text-gray-600 mb-6">เลือกจุดเริ่มต้นและปลายทางเพื่อวางแผนเส้นทางที่ดีที่สุด</p>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <input type="text" placeholder="จุดเริ่มต้น" className="flex-1 bg-transparent outline-none text-gray-700"/>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <input type="text" placeholder="ปลายทาง" className="flex-1 bg-transparent outline-none text-gray-700"/>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
          ค้นหาเส้นทาง
        </button>
      </div>
    </div>
  );
}
