'use client';
import React from 'react';
import { User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="p-4 h-full overflow-y-auto text-center">
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
  );
}
