'use client';
import { useState, useEffect } from 'react';
import { Clock, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface WorkoutProgram {
  _id: string;
  name: string;
  videoUrl: string;
  description: string[];
  equipment: string[];
  muscles: string[];
  duration?: string;
  difficulty?: string;
  comments?: any[];
}

// Helper function to format description
const formatDescription = (description: string[] | string): string => {
  const text = Array.isArray(description) ? description[0] : description;
  if (!text) return 'ไม่มีคำอธิบาย';
  return text.length > 80 ? text.slice(0, 80) + '...' : text;
};

// Helper component for program metadata
const ProgramMetadata = ({ duration, difficulty }: { duration?: string; difficulty?: string }) => {
  if (!duration && !difficulty) return null;
  
  return (
    <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
      {duration && <span>{duration}</span>}
      {duration && difficulty && <span>•</span>}
      {difficulty && <span>{difficulty}</span>}
    </div>
  );
};

// Helper component for muscle tags
const MuscleTags = ({ muscles }: { muscles?: string[] }) => {
  if (!muscles || muscles.length === 0) return null;
  
  const visibleMuscles = muscles.slice(0, 2);
  const remainingCount = muscles.length - 2;
  
  return (
    <div className="flex flex-wrap gap-1 mb-3">
      {visibleMuscles.map((muscle) => (
        <span key={muscle} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
          {muscle}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
          +{remainingCount}
        </span>
      )}
    </div>
  );
};

// Helper component for video/thumbnail display
const ProgramThumbnail = ({ videoUrl, name }: { videoUrl?: string; name?: string }) => (
  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative">
    {videoUrl ? (
      <iframe
        src={videoUrl}
        className="w-full h-full object-cover"
        title={name || 'Program video'}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <Dumbbell className="w-12 h-12 text-blue-400" />
      </div>
    )}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
  </div>
);

function ProgramCard({ program }: { program: WorkoutProgram }) {
  const programId = program._id;
  
  if (!programId) {
    console.warn('Program missing _id or id:', program);
    return null;
  }

  return (
    <div className="group bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 relative">
      <Link href={`/programs/${programId}`} className="w-full text-left block">
        <ProgramThumbnail videoUrl={program.videoUrl} name={program.name} />
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {program.name || 'ไม่มีชื่อโปรแกรม'}
          </h3>
          
          <ProgramMetadata duration={program.duration} difficulty={program.difficulty} />
          <MuscleTags muscles={program.muscles} />
          
          <p className="text-slate-600 text-sm line-clamp-2">
            {formatDescription(program.description)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default function Programs() {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        if (!apiUrl) {
          throw new Error('API URL not configured');
        }
        
        const response = await fetch(`${apiUrl}/program`);
        
        if (response.status === 404) {
          throw new Error('Programs endpoint not found (404)');
        }
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setPrograms(data || []);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load programs');
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
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
        
        <div className="relative z-10 h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-12 mt-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm">โปรแกรมออกกำลังกาย</h1>
              <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
                <p className="text-lg text-blue-800">
                  เลือกโปรแกรมการออกกำลังกายที่เหมาะกับคุณ 
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                      <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                    </div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen relative overflow-hidden">
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
        <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm text-center">
            โปรแกรมออกกำลังกาย
          </h1>
          <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 mb-8">
            <p className="text-lg text-blue-800 text-center">
              เลือกโปรแกรมการออกกำลังกายที่เหมาะกับคุณ 
            </p>
          </div>
          <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 text-lg font-medium mb-2">
              ไม่สามารถโหลดโปรแกรมได้
            </div>
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="h-screen relative overflow-hidden">
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

        <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm text-center">โปรแกรมออกกำลังกาย</h1>
          <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 mb-8">
            <p className="text-lg text-blue-800 text-center">เลือกโปรแกรมการออกกำลังกายที่เหมาะกับคุณ</p>
          </div>
          <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-gray-600 text-lg">
              ยังไม่มีโปรแกรมออกกำลังกาย
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Gym Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-900/50" />
      </div>

      <div className="relative z-10 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-sm text-center">
            โปรแกรมออกกำลังกาย
          </h1>
          <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 mb-12 shadow-xl border border-white/30">
            <p className="text-lg text-blue-800 text-center">เลือกโปรแกรมการออกกำลังกายที่เหมาะกับคุณ</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {programs.filter(program => program._id).map((program) => (
              <ProgramCard key={program._id} program={program} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
