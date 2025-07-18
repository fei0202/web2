import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowRight, Image } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { NewsModal } from './NewsModal';
import { format } from 'date-fns';

interface NewsItem {
  id: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  imageUrl?: string;
  createdAt: string;
}

export function NewsSection() {
  const { t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  const { data: news, isLoading, error } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    },
  });

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('zh') === 'zh' ? '最新消息' : 'Latest News'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('zh') === 'zh' ? '最新消息' : 'Latest News'}
            </h2>
            <p className="text-gray-600">
              {t('zh') === 'zh' ? '載入最新消息時發生錯誤' : 'Error loading latest news'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('zh') === 'zh' ? '最新消息' : 'Latest News'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('zh') === 'zh' 
                ? '掌握 FRC 10390 GOOGIRL 團隊的最新動態、比賽成果和活動消息'
                : 'Stay updated with FRC 10390 GOOGIRL team\'s latest activities, competition results, and event news'
              }
            </p>
          </div>

          {(!news || news.length === 0) ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('zh') === 'zh' ? '暫無最新消息' : 'No News Available'}
                  </h3>
                  <p className="text-gray-600">
                    {t('zh') === 'zh' 
                      ? '目前沒有最新消息，請稍後再檢查' 
                      : 'No news available at the moment. Please check back later'
                    }
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((newsItem) => {
                const currentTitle = t('zh') === 'zh' ? newsItem.title : newsItem.titleEn;
                const currentContent = t('zh') === 'zh' ? newsItem.content : newsItem.contentEn;
                
                return (
                  <div
                    key={newsItem.id}
                    onClick={() => handleNewsClick(newsItem)}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    {/* Image */}
                    {newsItem.imageUrl ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={newsItem.imageUrl}
                          alt={currentTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                        <Image className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(newsItem.createdAt), 'yyyy-MM-dd')}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                        {currentTitle}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {currentContent.substring(0, 100)}
                        {currentContent.length > 100 && '...'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          FRC 10390 GOOGIRL
                        </span>
                        <div className="flex items-center text-secondary text-sm font-medium group-hover:text-blue-700 transition-colors">
                          {t('zh') === 'zh' ? '閱讀更多' : 'Read More'}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* News Modal */}
      {selectedNews && (
        <NewsModal
          isOpen={!!selectedNews}
          onClose={closeModal}
          news={selectedNews}
        />
      )}
    </>
  );
}