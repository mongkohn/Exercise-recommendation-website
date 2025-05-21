"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function getHoverClasses() {
  return "hover:shadow-xl hover:scale-105 transition";
}

function ArticleCard({ article }: { article: any }) {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${getHoverClasses()}`}>
      <div className="relative h-56 w-full">
        <Link href={`/articles/${article._id}`} passHref legacyBehavior>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            <Image
              src={article.image}
              alt={article.title}
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{article.title}</h3>
        <p className="text-sm text-gray-700 mb-2">{article.description}</p>
        {article.refer && (
          <p className="text-sm text-gray-500 mb-2">{article.refer}</p>
        )}
        <Link href={`/articles/${article._id}`} passHref legacyBehavior>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
            อ่านต่อ...
          </a>
        </Link>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">แนะนำ</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-12">กำลังโหลดบทความ...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
