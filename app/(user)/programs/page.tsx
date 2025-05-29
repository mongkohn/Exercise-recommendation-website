'use client';
import { useState, useEffect } from 'react';
import { Clock } from "lucide-react";
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
  comments?: any[];
}

function ProgramCard({ program }: { program: any }) {
  const programId = program._id || program.id;
  
  if (!programId) {
    console.warn('Program missing _id or id:', program);
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 mb-10">
      <Link href={`/programs/${programId}`}>
        <Image
          src={program.image || "/placeholder-workout.jpg"}
          alt={program.name || program.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
          style={{ objectFit: "cover" }}
          priority
        />
      </Link>
      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-lg">{program.name || program.title}</h2>
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <Clock className="w-4 h-4" />
          {program.duration || "ไม่ระบุเวลา"}
        </div>
        <div className="flex justify-between text-sm mt-2">
          <div>
            <div className="text-gray-500">ความยาก</div>
            <div className="text-lg">{program.levelIcons || "ไม่ระบุ"}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-500">หมวดหมู่</div>
            <Badge className="mt-1 bg-blue-100 text-blue-800">
              {program.category || "ไม่ระบุหมวดหมู่"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([]);
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
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-center text-gray-800 text-3xl font-semibold mb-10 p-7">
          โปรแกรมออกกำลังกาย
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                  <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-center text-gray-800 text-3xl font-semibold mb-10 p-7">
          โปรแกรมออกกำลังกาย
        </h1>
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
    );
  }

  if (programs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-center text-gray-800 text-3xl font-semibold mb-10 p-7">
          โปรแกรมออกกำลังกาย
        </h1>
        <div className="text-center p-8 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-gray-600 text-lg">
            ยังไม่มีโปรแกรมออกกำลังกาย
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-center text-gray-800 text-3xl font-semibold mb-10 p-7">
        โปรแกรมออกกำลังกาย
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
        {programs.filter(program => program._id || program.id).map((program) => (
          <ProgramCard key={program._id || program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
