"use client";
import { Search, Filter, ChevronRight, Dumbbell, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Workout = {
  _id: string;
  title: string;
  url: string;
  equipment: string[];
  muscles: string[];
};

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    equipment: "",
    muscles: [] as string[],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [view, setView] = useState("grid"); // grid or list
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/video`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get unique equipment and muscles for filters
  const equipmentOptions = Array.from(
    new Set(workouts.flatMap((w) => w.equipment || []))
  ).filter(Boolean);

  const muscleOptions = Array.from(
    new Set(workouts.flatMap((w) => w.muscles || []))
  ).filter(Boolean);

  // Filter workouts
  const filteredWorkouts = workouts
    .filter((w) =>
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      (w.muscles?.some((m) => m.toLowerCase().includes(search.toLowerCase())))
    )
    .filter((w) =>
      filters.equipment ? (w.equipment || []).includes(filters.equipment) : true
    )
    .filter((w) =>
      filters.muscles.length > 0
        ? filters.muscles.every(muscle => w.muscles?.includes(muscle))
        : true
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkouts = filteredWorkouts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, itemsPerPage]);

  const handleClearFilters = () => {
    setFilters({ equipment: "", muscles: [] });
    setSearch("");
    setCurrentPage(1);
  };

  const toggleMuscleFilter = (muscle: string) => {
    setFilters(prev => ({
      ...prev,
      muscles: prev.muscles.includes(muscle)
        ? prev.muscles.filter(m => m !== muscle)
        : [...prev.muscles, muscle]
    }));
  };

  if (loading) {
    return (
      <div className="h-screen overflow-hidden fixed inset-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Fitness Background"
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-blue-50/80" />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-blue-100/60" />
        </div>

        {/* Loading Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="bg-white backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white/30">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xl font-bold text-blue-900">กำลังโหลดท่าออกกำลังกาย...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Gym Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-900/50" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-12 mt-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">ท่าออกกำลังกาย</h1>
            <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
              <p className="text-lg text-blue-800">
                ค้นหาท่าออกกำลังกายที่เหมาะกับคุณ เลือกตามกล้ามเนื้อหรืออุปกรณ์ที่มี
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white backdrop-blur-md rounded-2xl shadow-xl p-4 mb-8 border border-white/40">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="ค้นหาท่าออกกำลังกายหรือกล้ามเนื้อ..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* Filter Button & View Switch */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl hover:bg-blue-100 transition font-medium"
                >
                  <Filter size={18} />
                  กรองผลลัพธ์
                </button>
                {/* View Switch */}
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`px-4 py-3 ${view === "grid" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <title>Grid view icon for workout display</title>
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`px-4 py-3 ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-700"}`}
                  >
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Active Filters */}
            {(filters.equipment || filters.muscles.length > 0 || search) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">กำลังกรอง:</span>

                {search && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    <span>ค้นหา: {search}</span>
                    <button type="button" onClick={() => setSearch("")} className="ml-1 hover:text-blue-900">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {filters.equipment && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    <span>อุปกรณ์: {filters.equipment}</span>
                    <button
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, equipment: "" }))}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {filters.muscles.map(muscle => (
                  <div key={muscle} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    <span>{muscle}</span>
                    <button
                      type="button"
                      onClick={() => toggleMuscleFilter(muscle)}
                      className="ml-1 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:text-red-800 ml-2"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
              <p className="text-blue-900 font-medium">
                พบ <span className="font-bold text-blue-600">{filteredWorkouts.length}</span> ท่าออกกำลังกาย
                {filteredWorkouts.length > 0 && (
                  <span className="text-sm ml-2">
                    (แสดง {startIndex + 1}-{Math.min(endIndex, filteredWorkouts.length)} จาก {filteredWorkouts.length})
                  </span>
                )}
              </p>
            </div>
            
            {/* Items per page selector */}
            {filteredWorkouts.length > 0 && (
              <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
                <label className="flex items-center gap-2 text-blue-900 font-medium">
                  <span className="text-sm">แสดง:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="bg-transparent border-none focus:outline-none cursor-pointer"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                  <span className="text-sm">รายการ</span>
                </label>
              </div>
            )}
          </div>

          {/* Workouts Grid or List */}
          {filteredWorkouts.length === 0 ? (
            <div className="bg-white backdrop-blur-md rounded-3xl p-12 text-center shadow-2xl border border-white/30 mb-8">
              <Dumbbell size={48} className="mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">ไม่พบท่าออกกำลังกาย</h3>
              <p className="text-blue-700 mb-6">ลองปรับตัวกรองหรือคำค้นหาเพื่อดูผลลัพธ์เพิ่มเติม</p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : view === "grid" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                {currentWorkouts.map((workout) => (
                  <button
                    type="button"
                    key={workout._id}
                    className="bg-white backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/40 flex flex-col h-full text-left transform hover:scale-105"
                    onClick={() => router.push(`/workouts/${workout._id}`)}
                  >
                    <div className="aspect-video relative bg-gradient-to-br from-blue-100 to-blue-200">
                      <iframe
                        src={workout.url}
                        className="absolute w-full h-full object-cover rounded-t-2xl"
                        allowFullScreen
                        title={workout.title}
                        style={{ border: "none" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin opacity-50" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-bold text-xl mb-4 text-blue-900 line-clamp-2">{workout.title}</h2>

                      <div className="mb-4">
                        <h3 className="font-medium text-blue-800 mb-2">กล้ามเนื้อหลัก</h3>
                        <div className="flex flex-wrap gap-2">
                          {workout.muscles?.map((muscle) => (
                            <span
                              key={muscle}
                              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
                            >
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>

                      {workout.equipment?.length > 0 && (
                        <div className="mb-4">
                          <h3 className="font-medium text-blue-800 mb-2">อุปกรณ์ที่ใช้</h3>
                          <div className="flex flex-wrap gap-2">
                            {workout.equipment.map((eq) => (
                              <span
                                key={eq}
                                className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                              >
                                {eq}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto pt-4">
                        <button
                          type="button"
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/workouts/${workout._id}`);
                          }}
                        >
                          ดูรายละเอียด
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pagination for Grid View */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 pb-8">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
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
                            className={`px-4 py-2 rounded-lg transition-colors shadow-lg ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      // Show ellipsis
                      if (page === currentPage - 3 || page === currentPage + 3) {
                        return (
                          <span key={page} className="px-2 text-white/70">
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
                      className="p-2 rounded-lg bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
                    <p className="text-sm text-blue-900">
                      หน้า {currentPage} จาก {totalPages}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-6 pb-8">
                {currentWorkouts.map((workout) => (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    key={workout._id}
                    className="bg-white backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-102 cursor-pointer"
                    onClick={() => router.push(`/workouts/${workout._id}`)}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 lg:w-1/4">
                        <div className="aspect-video md:h-full relative bg-gradient-to-br from-blue-100 to-blue-200">
                          <iframe
                            src={workout.url}
                            className="w-full h-full object-cover"
                            allowFullScreen
                            title={workout.title}
                            style={{ border: "none" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin opacity-50" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="font-bold text-xl mb-3 text-blue-900">{workout.title}</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h3 className="font-medium text-gray-700 mb-2">กล้ามเนื้อหลัก</h3>
                            <div className="flex flex-wrap gap-2">
                              {workout.muscles?.map((muscle) => (
                                <span
                                  key={muscle}
                                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
                                >
                                  {muscle}
                                </span>
                              ))}
                            </div>
                          </div>

                          {workout.equipment?.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-700 mb-2">อุปกรณ์ที่ใช้</h3>
                              <div className="flex flex-wrap gap-2">
                                {workout.equipment.map((eq) => (
                                  <span
                                    key={eq}
                                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                                  >
                                    {eq}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 md:mt-auto md:text-right">
                          <button
                            type="button"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/workouts/${workout._id}`);
                            }}
                          >
                            ดูรายละเอียด
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination for List View */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4 pb-8">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                            className={`px-4 py-2 rounded-lg transition-colors shadow-lg ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      if (page === currentPage - 3 || page === currentPage + 3) {
                        return (
                          <span key={page} className="px-2 text-white/70">
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
                      className="p-2 rounded-lg bg-white backdrop-blur-md border border-white/40 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
                    <p className="text-sm text-blue-900">
                      หน้า {currentPage} จาก {totalPages}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Filter Modal */}
          {isFilterModalOpen && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/40">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">กรองผลลัพธ์</h3>
                    <button
                      type="button"
                      onClick={() => setIsFilterModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">อุปกรณ์</h4>
                    <select
                      className="w-full p-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.equipment}
                      onChange={e => setFilters(prev => ({ ...prev, equipment: e.target.value }))}
                    >
                      <option value="">ทั้งหมด</option>
                      {equipmentOptions.map(eq => (
                        <option key={eq} value={eq}>{eq}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">กล้ามเนื้อ</h4>
                    <div className="max-h-60 overflow-y-auto p-1">
                      <div className="flex flex-wrap gap-2">
                        {muscleOptions.map(muscle => (
                          <button
                            type="button"
                            key={muscle}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${filters.muscles.includes(muscle)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            onClick={() => toggleMuscleFilter(muscle)}
                          >
                            {muscle}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                      onClick={handleClearFilters}
                    >
                      ล้างตัวกรอง
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                      onClick={() => setIsFilterModalOpen(false)}
                    >
                      ใช้ตัวกรอง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}