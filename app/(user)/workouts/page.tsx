"use client";
import { Search, Filter, ChevronRight, Dumbbell, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/video")
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

  const handleClearFilters = () => {
    setFilters({ equipment: "", muscles: [] });
    setSearch("");
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-700">กำลังโหลดท่าออกกำลังกาย...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ท่าออกกำลังกาย</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ค้นหาท่าออกกำลังกายที่เหมาะกับคุณ เลือกตามกล้ามเนื้อหรืออุปกรณ์ที่มี
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 sticky top-4 z-10 border border-gray-100">
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
        <p className="text-gray-700">
          พบ <span className="font-semibold">{filteredWorkouts.length}</span> ท่าออกกำลังกาย
        </p>
      </div>

      {/* Workouts Grid or List */}
      {filteredWorkouts.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <Dumbbell size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">ไม่พบท่าออกกำลังกาย</h3>
          <p className="text-gray-600 mb-6">ลองปรับตัวกรองหรือคำค้นหาเพื่อดูผลลัพธ์เพิ่มเติม</p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((workout) => (
            <button
              type="button"
              key={workout._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-100 flex flex-col h-full text-left"
              onClick={() => router.push(`/workouts/${workout._id}`)}
            >
              <div className="aspect-video relative">
                <iframe
                  src={workout.url}
                  className="absolute w-full h-full object-cover"
                  allowFullScreen
                  title={workout.title}
                  style={{ border: "none" }}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-bold text-xl mb-4 text-gray-900 line-clamp-2">{workout.title}</h2>

                <div className="mb-4">
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
                  <div className="mb-4">
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

                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/workouts/${workout._id}`);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/workouts/${workout._id}`);
                      }
                    }}
                    onKeyUp={(e) => {
                      // Optionally handle onKeyUp for accessibility
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/workouts/${workout._id}`);
                      }
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
      ) : (
        <div className="space-y-6">
          {filteredWorkouts.map((workout) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={workout._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
              onClick={() => router.push(`/workouts/${workout._id}`)}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4">
                  <div className="aspect-video md:h-full">
                    <iframe
                      src={workout.url}
                      className="w-full h-full object-cover"
                      allowFullScreen
                      title={workout.title}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-bold text-xl mb-3 text-gray-900">{workout.title}</h2>

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
                      className="px-6 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition inline-flex items-center gap-2"
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
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
  );
}