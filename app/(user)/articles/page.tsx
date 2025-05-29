"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BookOpen, ExternalLink, Loader2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

type Article = {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  refer?: string;
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-white/40 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="relative h-56 w-full bg-gradient-to-br from-blue-100 to-blue-200">
        <Link href={article.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-blue-900 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-blue-700 mb-4 line-clamp-3">{article.description}</p>
        {article.refer && (
          <p className="text-xs text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">{article.refer}</p>
        )}
        <Link 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors group"
        >
          อ่านต่อ...
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(9);

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when items per page changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(Array.isArray(data) ? data : []);
        setError(false);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen relative overflow-hidden">
        {/* Background Image */}
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
        
        {/* Loading Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl border border-white/30">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
              <p className="text-xl font-bold text-blue-900">กำลังโหลดบทความ...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen relative overflow-hidden">
        {/* Background Image */}
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
        
        {/* Error Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="bg-white p-12 rounded-3xl shadow-2xl border border-white/30 text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">เกิดข้อผิดพลาด</h3>
            <p className="text-blue-700 mb-6">ไม่สามารถโหลดบทความได้ กรุณาลองใหม่อีกครั้ง</p>
            <button 
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg"
            >
              ลองใหม่
            </button>
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
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fitness Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 to-blue-50/75" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-10">
          
          {/* Header */}
          <div className="mb-12 mt-4 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 drop-shadow-sm">บทความแนะนำ</h1>
            </div>
            <div className="max-w-2xl mx-auto bg-white backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
              <p className="text-lg text-blue-800">
                อ่านบทความเกี่ยวกับการออกกำลังกาย โภชนาการ และการดูแลสุขภาพ
              </p>
            </div>
          </div>

          {/* Results Summary and Items Per Page */}
          {articles.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
                <p className="text-blue-900 font-medium">
                  พบ <span className="font-bold text-blue-600">{articles.length}</span> บทความ
                  {articles.length > 0 && (
                    <span className="text-sm ml-2">
                      (แสดง {startIndex + 1}-{Math.min(endIndex, articles.length)} จาก {articles.length})
                    </span>
                  )}
                </p>
              </div>
              
              {/* Items per page selector */}
              <div className="bg-white backdrop-blur-md rounded-xl px-4 py-2 shadow-lg border border-white/30">
                <label className="flex items-center gap-2 text-blue-900 font-medium">
                  <span className="text-sm">แสดง:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="bg-transparent border-none focus:outline-none cursor-pointer"
                  >
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                  </select>
                  <span className="text-sm">รายการ</span>
                </label>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {articles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-white/30">
              <BookOpen size={48} className="mx-auto text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">ไม่มีบทความ</h3>
              <p className="text-blue-700">ยังไม่มีบทความให้อ่านในขณะนี้</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                {currentArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>

              {/* Pagination */}
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
                          <span key={page} className="px-2 text-blue-600/70">
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
        </div>
      </div>
    </div>
  );
}
