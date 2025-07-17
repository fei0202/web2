import { useState } from 'react';
import { Building } from 'lucide-react';
import { Modal } from './Modal';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';

export function Sponsors() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const SponsorsModal = () => (
    <Modal
      isOpen={activeModal === 'sponsors'}
      onClose={() => setActiveModal(null)}
      title={t('becomeSponsors', content.sponsors)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t('zh') === 'zh' 
            ? '我們提供多種贊助方案，包括品牌曝光、技術合作和人才培育等機會。'
            : 'We offer various sponsorship packages, including brand exposure, technical collaboration, and talent development opportunities.'
          }
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">
            {t('zh') === 'zh' ? '聯絡資訊' : 'Contact Information'}
          </h3>
          <p className="text-sm text-gray-600">
            Email: smgshfrc@gmail.com
          </p>
        </div>
      </div>
    </Modal>
  );

  return (
    <section id="sponsors" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('title', content.sponsors)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle', content.sponsors)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Sponsor placeholders */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-24">
              <div className="text-center">
                <Building className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-gray-400 text-sm">
                  {t('zh') === 'zh' ? '贊助商標誌' : 'Sponsor Logo'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setActiveModal('sponsors')}
            className="bg-secondary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            {t('becomeSponsors', content.sponsors)}
          </button>
        </div>
      </div>

      <SponsorsModal />
    </section>
  );
}
