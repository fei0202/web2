import { useState } from 'react';
import { X, Calendar, User } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { format } from 'date-fns';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    id: number;
    title: string;
    titleEn: string;
    content: string;
    contentEn: string;
    imageUrl?: string;
    createdAt: string;
  };
}

export function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const currentTitle = t('zh') === 'zh' ? news.title : news.titleEn;
  const currentContent = t('zh') === 'zh' ? news.content : news.contentEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              {format(new Date(news.createdAt), 'yyyy-MM-dd')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Image */}
          {news.imageUrl && (
            <div className="mb-6">
              <img
                src={news.imageUrl}
                alt={currentTitle}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentTitle}
          </h1>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentContent}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>FRC 10390 GOOGIRL</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('zh') === 'zh' ? '關閉' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}