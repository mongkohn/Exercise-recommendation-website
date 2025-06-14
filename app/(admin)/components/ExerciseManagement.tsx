"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, ArrowLeft, Save, X, Dumbbell, Target, Search, ChevronLeft, ChevronRight } from "lucide-react";

type Exercise = {
  _id?: string;
  title: string;
  url: string;
  description: string | string[];
  muscles?: string[];
  equipment?: string[];
  image?: string;
};

type ExerciseForm = {
  title: string;
  url: string;
  description: string;
  muscles: string;
  equipment: string;
};

export default function ExerciseManagement() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [formData, setFormData] = useState<ExerciseForm>({
    title: '',
    url: '',
    description: '',
    muscles: '',
    equipment: ''
  });

  // Fetch exercises from database
  useEffect(() => {
    fetchExercises();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const filtered = exercises.filter(exercise =>
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscles?.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      exercise.equipment?.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredExercises(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [exercises, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExercises = filteredExercises.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Quick edit function
  const handleQuickEdit = (exercise: Exercise, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedExercise(exercise);
    startEditing(exercise);
  };

  // Quick delete function
  const handleQuickDelete = (exerciseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteExercise(exerciseId);
  };

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/video`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched exercises:', data); // Debug log
      
      // Ensure data is an array
      const exerciseArray = Array.isArray(data) ? data : [];
      setExercises(exerciseArray);
      setFilteredExercises(exerciseArray); // Initialize filtered exercises
    } catch (error) {
      console.error('Error fetching exercises:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`ไม่สามารถโหลดข้อมูลท่าออกกำลังกายได้: ${errorMessage}`);
      // Set empty arrays on error
      setExercises([]);
      setFilteredExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExercise = async () => {
    try {
      const exerciseData = {
        title: formData.title,
        url: formData.url,
        description: formData.description, // send as string, not array
        muscles: formData.muscles.split(',').map(m => m.trim()).filter(m => m),
        equipment: formData.equipment.split(',').map(e => e.trim()).filter(e => e)
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create exercise: ${errorData}`);
      }

      await fetchExercises();
      setIsCreating(false);
      resetForm();
      alert('สร้างท่าออกกำลังกายสำเร็จ!');
    } catch (error) {
      console.error('Error creating exercise:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`ไม่สามารถสร้างท่าออกกำลังกายได้: ${errorMessage}`);
    }
  };

  const handleUpdateExercise = async () => {
    if (!selectedExercise?._id) return;

    try {
      const exerciseData = {
        title: formData.title,
        url: formData.url,
        description: formData.description, // send as string, not array
        muscles: formData.muscles.split(',').map(m => m.trim()).filter(m => m),
        equipment: formData.equipment.split(',').map(e => e.trim()).filter(e => e)
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/video/${selectedExercise._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update exercise: ${errorData}`);
      }

      await fetchExercises();
      const updatedExercise = { ...selectedExercise, ...exerciseData };
      setSelectedExercise(updatedExercise);
      setIsEditing(false);
      alert('อัปเดตท่าออกกำลังกายสำเร็จ!');
    } catch (error) {
      console.error('Error updating exercise:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`ไม่สามารถอัปเดตท่าออกกำลังกายได้: ${errorMessage}`);
    }
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบท่าออกกำลังกายนี้?')) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/video/${exerciseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete exercise: ${errorData}`);
      }

      await fetchExercises();
      setSelectedExercise(null);
      alert('ลบท่าออกกำลังกายสำเร็จ!');
    } catch (error) {
      console.error('Error deleting exercise:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`ไม่สามารถลบท่าออกกำลังกายได้: ${errorMessage}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      description: '',
      muscles: '',
      equipment: ''
    });
  };

  const startEditing = (exercise: Exercise) => {
    setFormData({
      title: exercise.title,
      url: exercise.url,
      description: Array.isArray(exercise.description) 
        ? exercise.description.join('\n') 
        : exercise.description,
      muscles: exercise.muscles?.join(', ') || '',
      equipment: exercise.equipment?.join(', ') || ''
    });
    setIsEditing(true);
  };

  const startCreating = () => {
    resetForm();
    setIsCreating(true);
  };

  // Loading state with debug info
  if (loading) {
    return (
      <section className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-700 mb-2">กำลังโหลดข้อมูล...</p>
            <p className="text-xs text-slate-500">
              API URL: {process.env.NEXT_PUBLIC_API_URL}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Create/Edit Form
  if (isCreating || isEditing) {
    return (
      <section className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-900">
            {isCreating ? 'เพิ่มท่าออกกำลังกายใหม่' : 'แก้ไขท่าออกกำลังกาย'}
          </h2>
          <button
            type="button"
            onClick={() => {
              setIsCreating(false);
              setIsEditing(false);
              resetForm();
            }}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
            ยกเลิก
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">ชื่อท่าออกกำลังกาย</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="เช่น Push Up, Barbell Row"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">URL วิดีโอ</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="https://www.youtube.com/embed/..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">คำอธิบายการออกกำลังกาย</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="แต่ละบรรทัดจะเป็นขั้นตอนหนึ่ง&#10;1. เตรียมท่าเริ่มต้น&#10;2. ดำเนินการออกกำลังกาย&#10;3. กลับสู่ท่าเริ่มต้น"
                required
              />
              <p className="text-xs text-slate-500 mt-1">แต่ละบรรทัดจะเป็นขั้นตอนหนึ่ง</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">กล้ามเนื้อหลัก</label>
                <input
                  type="text"
                  value={formData.muscles}
                  onChange={(e) => setFormData({ ...formData, muscles: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="หลัง, แขน, ไหล่ (คั่นด้วยจุลภาค)"
                />
                <p className="text-xs text-slate-500 mt-1">คั่นด้วยจุลภาค เช่น หลัง, แขน, ไหล่</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">อุปกรณ์ที่ใช้</label>
                <input
                  type="text"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="บาร์เบล, ดัมเบล (คั่นด้วยจุลภาค)"
                />
                <p className="text-xs text-slate-500 mt-1">คั่นด้วยจุลภาค เช่น บาร์เบล, ดัมเบล</p>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                  resetForm();
                }}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={isCreating ? handleCreateExercise : handleUpdateExercise}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isCreating ? 'สร้างท่าออกกำลังกาย' : 'บันทึกการแก้ไข'}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Exercise Detail View
  if (selectedExercise) {
    return (
      <section className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setSelectedExercise(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <ArrowLeft className="w-5 h-5" />
            ย้อนกลับ
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => startEditing(selectedExercise)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              แก้ไข
            </button>
            <button
              type="button"
              onClick={() => selectedExercise._id && handleDeleteExercise(selectedExercise._id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              ลบ
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">{selectedExercise.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={selectedExercise.url}
                  title={selectedExercise.title}
                  allowFullScreen
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800">กล้ามเนื้อหลัก</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscles?.map((muscle) => (
                    <span key={muscle} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {muscle}
                    </span>
                  )) || <span className="text-slate-500 text-sm">ไม่ระบุ</span>}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Dumbbell className="w-4 h-4 text-slate-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800">อุปกรณ์ที่ใช้</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.equipment?.map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-white text-slate-700 rounded-full text-sm border border-slate-200">
                      {item}
                    </span>
                  )) || <span className="text-slate-500 text-sm">ไม่จำเป็นต้องใช้อุปกรณ์</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="font-semibold text-lg text-slate-800 mb-4">วิธีการออกกำลังกาย</h3>
            <div className="space-y-3">
              {Array.isArray(selectedExercise.description) ? (
                selectedExercise.description.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{step}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">{selectedExercise.description}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Exercise List View with improved debugging
  return (
    <section className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">จัดการท่าออกกำลังกาย</h2>
          <p className="text-slate-600 mt-1">
            จำนวนท่าทั้งหมด: {exercises.length} ท่า 
            {searchTerm && ` | พบ: ${filteredExercises.length} ท่า`}
          </p>
        </div>
        <button
          type="button"
          onClick={startCreating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          เพิ่มท่าใหม่
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="ค้นหาท่าออกกำลังกาย, กล้ามเนื้อ, หรืออุปกรณ์..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Show current exercises data for debugging
      {process.env.NODE_ENV === 'development' && currentExercises.length > 0 && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <p>First exercise data: {JSON.stringify(currentExercises[0], null, 2)}</p>
        </div>
      )} */}

      {filteredExercises.length === 0 ? (
        <div className="text-center py-12">
          <Dumbbell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            {searchTerm ? 'ไม่พบท่าออกกำลังกายที่ค้นหา' : 'ยังไม่มีท่าออกกำลังกาย'}
          </h3>
          <p className="text-slate-500 mb-6">
            {searchTerm ? 'ลองใช้คำค้นหาอื่น หรือ' : 'เริ่มต้นสร้างท่าออกกำลังกายแรกของคุณ'}
          </p>
          {exercises.length === 0 && !searchTerm && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left max-w-md mx-auto">
              <h4 className="font-semibold text-yellow-800 mb-2">การแก้ไขปัญหา:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• ตรวจสอบว่าเซิร์ฟเวอร์ API ทำงานอยู่</li>
                <li>• ตรวจสอบ URL ใน environment variables</li>
                <li>• ดูใน Console สำหรับข้อความ error</li>
                <li>• ข้อมูลที่ได้รับ: {JSON.stringify(exercises.slice(0, 1))}</li>
              </ul>
            </div>
          )}
          <button
            type="button"
            onClick={searchTerm ? () => setSearchTerm('') : startCreating}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            {searchTerm ? 'ล้างการค้นหา' : 'เพิ่มท่าแรก'}
          </button>
        </div>
      ) : (
        <>
          {/* Exercise Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentExercises.map((exercise, index) => (
              <div
                key={exercise._id || `exercise-${index}`}
                className="group bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 relative"
              >
                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    onClick={(e) => handleQuickEdit(exercise, e)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    title="แก้ไข"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => exercise._id && handleQuickDelete(exercise._id, e)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                    title="ลบ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExercise(exercise)}
                  className="w-full text-left"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative">
                    {exercise.url ? (
                      <iframe
                        src={exercise.url}
                        className="w-full h-full object-cover"
                        title={exercise.title || 'Exercise video'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Dumbbell className="w-12 h-12 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {exercise.title || 'ไม่มีชื่อท่า'}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {exercise.muscles?.slice(0, 2).map((muscle) => (
                        <span key={muscle} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {muscle}
                        </span>
                      ))}
                      {exercise.muscles && exercise.muscles.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          +{exercise.muscles.length - 2}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {Array.isArray(exercise.description) 
                        ? exercise.description[0] 
                        : exercise.description?.slice(0, 80) || 'ไม่มีคำอธิบาย'}
                      {((Array.isArray(exercise.description) && exercise.description[0]?.length > 80) || 
                        (!Array.isArray(exercise.description) && exercise.description?.length > 80)) && '...'}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
                
                // Show ellipsis
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className="px-2 text-slate-400">
                      ...
                    </span>
                  );
                }
                
                return null;
              })}
              
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div className="text-center mt-4 text-sm text-slate-500">
            แสดง {startIndex + 1}-{Math.min(endIndex, filteredExercises.length)} จาก {filteredExercises.length} ท่า
          </div>
        </>
      )}
    </section>
  );
}
