import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Image, Calendar, Eye, Upload } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/use-toast';
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

interface NewsFormData {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  imageUrl?: string;
}

export function NewsManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    titleEn: '',
    content: '',
    contentEn: '',
    imageUrl: '',
  });

  const { data: news, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
    queryFn: async () => {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    },
  });

  const createNewsMutation = useMutation({
    mutationFn: async (newsData: NewsFormData) => {
      const authToken = localStorage.getItem('adminToken');
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newsData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create news');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      setIsFormOpen(false);
      setFormData({ title: '', titleEn: '', content: '', contentEn: '', imageUrl: '' });
      toast({
        title: t('zh') === 'zh' ? '成功' : 'Success',
        description: t('zh') === 'zh' ? '新消息已成功創建' : 'News created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (newsId: number) => {
      const authToken = localStorage.getItem('adminToken');
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete news');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/news'] });
      toast({
        title: t('zh') === 'zh' ? '成功' : 'Success',
        description: t('zh') === 'zh' ? '新消息已成功刪除' : 'News deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.titleEn.trim() || !formData.content.trim() || !formData.contentEn.trim()) {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: t('zh') === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    createNewsMutation.mutate(formData);
  };

  const handleDelete = (newsId: number) => {
    if (window.confirm(t('zh') === 'zh' ? '確定要刪除這則消息嗎？' : 'Are you sure you want to delete this news?')) {
      deleteNewsMutation.mutate(newsId);
    }
  };

  const handleViewNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 只允許圖片檔案
    if (!file.type.startsWith('image/')) {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: t('zh') === 'zh' ? '只允許上傳圖片檔案！' : 'Only image files are allowed!',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const authToken = localStorage.getItem('adminToken');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      // 自動填入圖片URL
      setFormData(prev => ({
        ...prev,
        imageUrl: result.url,
      }));

      toast({
        title: t('zh') === 'zh' ? '成功' : 'Success',
        description: t('zh') === 'zh' ? '圖片上傳成功！' : 'Image uploaded successfully!',
      });
    } catch (error: any) {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('zh') === 'zh' ? '消息管理' : 'News Management'}
          </h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('zh') === 'zh' ? '新增消息' : 'Add News'}
          </button>
        </div>

        {/* News Form */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">
                  {t('zh') === 'zh' ? '新增消息' : 'Add News'}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '標題（中文）' : 'Title (Chinese)'}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '標題（英文）' : 'Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '圖片網址（選填）' : 'Image URL (Optional)'}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder={t('zh') === 'zh' ? '請輸入圖片網址或上傳檔案' : 'Enter image URL or upload file'}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploading ? 
                        (t('zh') === 'zh' ? '上傳中...' : 'Uploading...') :
                        (t('zh') === 'zh' ? '上傳圖片' : 'Upload Image')
                      }
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '內容（中文）' : 'Content (Chinese)'}
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '內容（英文）' : 'Content (English)'}
                  </label>
                  <textarea
                    value={formData.contentEn}
                    onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {t('zh') === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={createNewsMutation.isPending}
                    className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {createNewsMutation.isPending ? 
                      (t('zh') === 'zh' ? '創建中...' : 'Creating...') :
                      (t('zh') === 'zh' ? '創建新聞' : 'Create News')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* News List */}
        <div className="space-y-4">
          {(!news || news.length === 0) ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                {t('zh') === 'zh' ? '尚無新聞' : 'No news available'}
              </p>
            </div>
          ) : (
            news.map((newsItem) => (
              <div key={newsItem.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      {newsItem.imageUrl && (
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={newsItem.imageUrl}
                            alt={newsItem.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {t('zh') === 'zh' ? newsItem.title : newsItem.titleEn}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(new Date(newsItem.createdAt), 'yyyy-MM-dd HH:mm')}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {t('zh') === 'zh' ? newsItem.content : newsItem.contentEn}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewNews(newsItem)}
                      className="p-2 text-gray-400 hover:text-secondary transition-colors"
                      title={t('zh') === 'zh' ? '查看' : 'View'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(newsItem.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title={t('zh') === 'zh' ? '刪除' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preview Modal */}
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