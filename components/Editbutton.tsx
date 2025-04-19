"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Editbutton() {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => setOpen(!open);

  return (
    <div className="text-center">
        <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
            แก้ไข
        </button>
      <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-xl mx-auto bg-gray-100">
          <DialogHeader>
            <DialogTitle className="text-left border-b pb-2">ตัวกรองการค้นหา</DialogTitle>
          </DialogHeader>

          {/* ระดับความยาก */}
          <div className="text-left mt-4">
            <h3 className="font-medium">ระดับความยาก</h3>
            <div className="flex gap-4 mt-1">
              <label><Checkbox /> ง่าย</label>
              <label><Checkbox /> ปานกลาง</label>
              <label><Checkbox /> ยาก</label>
            </div>
          </div>

         

          {/* ส่วนกล้ามเนื้อ */}
          <div className="text-left mt-4">
            <h3 className="font-medium">ส่วนกล้ามเนื้อ</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
              <label><Checkbox /> หลังแขน(Triceps)</label>
              <label><Checkbox /> หน้าแขน (Biceps)</label>
              <label><Checkbox /> อก (Chest)</label>
              <label><Checkbox /> หลัง (Back)</label>
              <label><Checkbox /> ขา (Legs)</label>
              <label><Checkbox /> หัวไหล่ (Shoulders)</label>
              <label><Checkbox /> ท้อง (Abdominals)</label>
            </div>
          </div>

          {/* อุปกรณ์ที่ใช้ */}
          <div className="text-left mt-4">
            <h3 className="font-medium">อุปกรณ์ที่ใช้</h3>
            <div className="space-y-1 mt-1">
              <label><Checkbox />Bodyweight</label><br />
              <label><Checkbox />เก้าอี้</label><br />
              <label><Checkbox />ดัมเบล</label><br />
              <label><Checkbox />บาร์เบล</label><br />
              <label><Checkbox />เสื่อ</label>
            </div>
          </div>

          {/* ปุ่มกด */}
          <div className="flex justify-center gap-3 mt-6">
            <Button className="bg-blue-500 hover:bg-blue-600">ค้นหา</Button>
            <Button variant="secondary" onClick={toggleDialog}>ปิด</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
