
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Image, Video, Calendar, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/use-toast';
import { format } from 'date-fns';

interface MediaItem {
  id: number;
  title: string;
  titleEn: string;
  type: 'photo' | 'video';
  category: string;
  url: string;
  description?: string;
  descriptionEn?: string;
  isVisible: boolean;
  createdAt: string;
}

interface MediaFormData {
  title: string;
  titleEn: string;
  type: 'photo' | 'video';
  category: string;
  url: string;
  description: string;
  descriptionEn: string;
  isVisible: boolean;
}

export function MediaManagement() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [formData, setFormData] = useState<MediaFormData>({
    title: '',
    titleEn: '',
    type: 'photo',
    category: 'general',
    url: '',
    description: '',
    descriptionEn: '',
    isVisible: true,
  });

  const { data: media, isLoading } = useQuery<MediaItem[]>({
    queryKey: ['/api/media', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === 'all' ? '/api/media' : `/api/media?category=${selectedCategory}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      return response.json();
    },
  });

  const createMediaMutation = useMutation({
    mutationFn: async (mediaData: MediaFormData) => {
      const authToken = localStorage.getItem('adminToken');
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(mediaData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create media');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      setIsFormOpen(false);
      setFormData({ 
        title: '', titleEn: '', type: 'photo', category: 'general', 
        url: '', description: '', descriptionEn: '', isVisible: true 
      });
      toast({
        title: t('zh') === 'zh' ? '成功' : 'Success',
        description: t('zh') === 'zh' ? '媒體已成功創建' : 'Media created successfully',
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

  const deleteMediaMutation = useMutation({
    mutationFn: async (mediaId: number) => {
      const authToken = localStorage.getItem('adminToken');
      const response = await fetch(`/api/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete media');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
      toast({
        title: t('zh') === 'zh' ? '成功' : 'Success',
        description: t('zh') === 'zh' ? '媒體已成功刪除' : 'Media deleted successfully',
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

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, isVisible }: { id: number; isVisible: boolean }) => {
      const authToken = localStorage.getItem('adminToken');
      const response = await fetch(`/api/media/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ isVisible }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update media');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/media'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.titleEn.trim() || !formData.url.trim()) {
      toast({
        title: t('zh') === 'zh' ? '錯誤' : 'Error',
        description: t('zh') === 'zh' ? '請填寫所有必填欄位' : 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    createMediaMutation.mutate(formData);
  };

  const handleDelete = (mediaId: number) => {
    if (window.confirm(t('zh') === 'zh' ? '確定要刪除這個媒體嗎？' : 'Are you sure you want to delete this media?')) {
      deleteMediaMutation.mutate(mediaId);
    }
  };

  const toggleVisibility = (id: number, currentVisibility: boolean) => {
    toggleVisibilityMutation.mutate({ id, isVisible: !currentVisibility });
  };

  // Group media by date
  const groupedMedia = media?.reduce((groups: Record<string, MediaItem[]>, item) => {
    const date = format(new Date(item.createdAt), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {}) || {};

  const categories = [
    { value: 'all', label: t('zh') === 'zh' ? '全部' : 'All' },
    { value: 'robot', label: t('zh') === 'zh' ? '機器人' : 'Robot' },
    { value: 'sponsor', label: t('zh') === 'zh' ? '贊助商' : 'Sponsors' },
    { value: 'product', label: t('zh') === 'zh' ? '產品' : 'Products' },
    { value: 'awards', label: t('zh') === 'zh' ? '獎項' : 'Awards' },
    { value: 'general', label: t('zh') === 'zh' ? '一般' : 'General' },
  ];

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('zh') === 'zh' ? '媒體管理' : 'Media Management'}
        </h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('zh') === 'zh' ? '新增媒體' : 'Add Media'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">
                {t('zh') === 'zh' ? '新增媒體' : 'Add Media'}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '類型' : 'Type'}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'photo' | 'video' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="photo">{t('zh') === 'zh' ? '照片' : 'Photo'}</option>
                    <option value="video">{t('zh') === 'zh' ? '影片' : 'Video'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '分類' : 'Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="general">{t('zh') === 'zh' ? '一般' : 'General'}</option>
                    <option value="robot">{t('zh') === 'zh' ? '機器人' : 'Robot'}</option>
                    <option value="sponsor">{t('zh') === 'zh' ? '贊助商' : 'Sponsors'}</option>
                    <option value="product">{t('zh') === 'zh' ? '產品' : 'Products'}</option>
                    <option value="awards">{t('zh') === 'zh' ? '獎項' : 'Awards'}</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
                    {t('zh') === 'zh' ? '公開顯示' : 'Visible'}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('zh') === 'zh' ? '媒體網址' : 'Media URL'}
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '描述（中文）' : 'Description (Chinese)'}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('zh') === 'zh' ? '描述（英文）' : 'Description (English)'}
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
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
                  disabled={createMediaMutation.isPending}
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {createMediaMutation.isPending ? 
                    (t('zh') === 'zh' ? '創建中...' : 'Creating...') :
                    (t('zh') === 'zh' ? '創建媒體' : 'Create Media')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media List grouped by date */}
      <div className="space-y-6">
        {Object.keys(groupedMedia).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">
              {t('zh') === 'zh' ? '尚無媒體' : 'No media available'}
            </p>
          </div>
        ) : (
          Object.entries(groupedMedia)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .map(([date, items]) => (
              <div key={date} className="bg-white border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(date), 'yyyy年MM月dd日')}
                    <span className="ml-2 text-sm text-gray-500">({items.length} 項目)</span>
                  </h3>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          {item.type === 'photo' ? (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling!.style.display = 'flex';
                              }}
                            />
                          ) : (
                            <Video className="w-8 h-8 text-gray-400" />
                          )}
                          <div className="w-full h-full items-center justify-center hidden">
                            {item.type === 'photo' ? (
                              <Image className="w-8 h-8 text-gray-400" />
                            ) : (
                              <Video className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <h4 className="font-medium text-sm text-gray-900 truncate">
                            {t('zh') === 'zh' ? item.title : item.titleEn}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.category} • {item.type}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {item.isVisible ? 
                                (t('zh') === 'zh' ? '顯示' : 'Visible') : 
                                (t('zh') === 'zh' ? '隱藏' : 'Hidden')
                              }
                            </span>
                            
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => toggleVisibility(item.id, item.isVisible)}
                                className="p-1 text-gray-400 hover:text-secondary transition-colors"
                                title={t('zh') === 'zh' ? '切換顯示狀態' : 'Toggle visibility'}
                              >
                                {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title={t('zh') === 'zh' ? '刪除' : 'Delete'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
