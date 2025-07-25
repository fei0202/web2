import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Mail, Calendar, User, MessageSquare, ArrowLeft, LogOut, Newspaper, Users } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'wouter';
import { AdminLogin } from '../components/AdminLogin';
import { NewsManagement } from '../components/NewsManagement';
import { MediaManagement } from '../components/MediaManagement';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function Admin() {
  const { t } = useLanguage();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'news' | 'media' | 'robots' | 'team' | 'awards'>('contacts');

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      setIsAuthenticated(true);
      setLoginError(null);
      localStorage.setItem('adminToken', data.token);
    },
    onError: (error: Error) => {
      setLoginError(
        t('zh') === 'zh' ? '密碼錯誤，請重試' : 'Invalid password, please try again'
      );
    },
  });

  const handleLogin = async (password: string) => {
    loginMutation.mutate(password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setSelectedContact(null);
    localStorage.removeItem('adminToken');
  };

  const { data: contacts, isLoading, error } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
        }
        throw new Error('Failed to fetch contacts');
      }
      return response.json();
    },
    enabled: isAuthenticated && !!authToken,
  });

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        error={loginError}
      />
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">
            {t('zh') === 'zh' ? '載入中...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {t('zh') === 'zh' ? '載入失敗' : 'Failed to load contacts'}
          </p>
          <Link href="/" className="text-secondary hover:underline">
            {t('zh') === 'zh' ? '返回首頁' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-secondary transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '返回首頁' : 'Back to Home'}
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-primary">
              {t('zh') === 'zh' ? '管理後台' : 'Admin Dashboard'}
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              {t('zh') === 'zh' ? '登出' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '聯絡訊息' : 'Contact Messages'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'news'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '新聞管理' : 'News Management'}
              </div>
            </button>
             <button
              onClick={() => setActiveTab('media')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'media'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '媒體管理' : 'Media Management'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'robots'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '機器人管理' : 'Robot Management'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '團隊管理' : 'Team Management'}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('awards')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'awards'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Newspaper className="w-5 h-5 mr-2" />
                {t('zh') === 'zh' ? '獎項管理' : 'Awards Management'}
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'contacts' ? (
          <>
            {/* Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Mail className="w-8 h-8 text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {t('zh') === 'zh' ? '總聯絡訊息' : 'Total Contact Messages'}
                    </p>
                    <p className="text-2xl font-bold text-primary">{contacts?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>

        {/* Contacts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-primary">
                {t('zh') === 'zh' ? '聯絡訊息列表' : 'Contact Messages'}
              </h2>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {contacts?.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedContact?.id === contact.id ? 'bg-blue-50 border-r-4 border-secondary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="font-medium text-gray-900">{contact.name}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contact.email}</p>
                      <p className="text-sm font-medium text-gray-800 mb-2">{contact.subject}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(contact.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!contacts || contacts.length === 0) && (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>{t('zh') === 'zh' ? '目前沒有聯絡訊息' : 'No contact messages yet'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Detail */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-primary">
                {t('zh') === 'zh' ? '訊息詳情' : 'Message Details'}
              </h2>
            </div>
            <div className="p-6">
              {selectedContact ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '姓名' : 'Name'}
                    </label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '電子郵件' : 'Email'}
                    </label>
                    <p className="text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '主旨' : 'Subject'}
                    </label>
                    <p className="text-gray-900">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '收到時間' : 'Received At'}
                    </label>
                    <p className="text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('zh') === 'zh' ? '訊息內容' : 'Message'}
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      className="inline-flex items-center bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {t('zh') === 'zh' ? '回覆郵件' : 'Reply via Email'}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>{t('zh') === 'zh' ? '選擇一個聯絡訊息來查看詳情' : 'Select a contact message to view details'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
          </>
        ) : activeTab === 'news' ? (
          <NewsManagement />
        ) : activeTab === 'media' ? (
          <MediaManagement />
        ) : activeTab === 'robots' ? (
           <div className="p-6 text-center text-gray-500">機器人管理功能開發中...</div>
        ) : activeTab === 'team' ? (
           <div className="p-6 text-center text-gray-500">團隊管理功能開發中...</div>
        ) : (
           <div className="p-6 text-center text-gray-500">獎項管理功能開發中...</div>
        )}
      </div>
    </div>
  );
}