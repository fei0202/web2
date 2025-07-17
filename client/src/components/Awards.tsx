import { useState } from 'react';
import { Trophy, Flag, Star } from 'lucide-react';
import { Modal } from './Modal';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';

export function Awards() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const AwardsModal = () => (
    <Modal
      isOpen={activeModal === 'awards'}
      onClose={() => setActiveModal(null)}
      title={t('zh') === 'zh' ? '完整獎項列表' : 'Complete Awards List'}
    >
      <div className="space-y-4">
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-semibold text-yellow-800">2025 REEFSCAPE</h3>
          <p className="text-yellow-700">
            {t('zh') === 'zh' ? '世界排名: 892/1946' : 'World Ranking: 892/1946'}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-800">New Taipei City Regional</h3>
          <p className="text-blue-700">
            {t('zh') === 'zh' ? '區域排名: 18/37' : 'Regional Ranking: 18/37'}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h3 className="font-semibold text-green-800">San Francisco Regional</h3>
          <p className="text-green-700">
            {t('zh') === 'zh' ? '新秀全明星獎 - 排名 39/41' : 'Rookie All-Star Award - Rank 39/41'}
          </p>
        </div>
      </div>
    </Modal>
  );

  return (
    <section id="awards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('title', content.awards)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle', content.awards)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* World Ranking */}
          <div className="card-hover bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {t('worldRanking', content.awards)}
                </h3>
                <p className="text-gray-600 text-sm">2025 REEFSCAPE</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">892/1946</div>
            <p className="text-gray-600">
              {t('zh') === 'zh' ? '在全球1946支隊伍中排名第892位' : 'Ranked 892nd out of 1946 teams globally'}
            </p>
          </div>

          {/* Regional Ranking */}
          <div className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Flag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {t('regionalRanking', content.awards)}
                </h3>
                <p className="text-gray-600 text-sm">New Taipei City Regional</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">18/37</div>
            <p className="text-gray-600">
              {t('zh') === 'zh' ? '新北市區域賽排名第18位' : 'Ranked 18th in New Taipei City Regional'}
            </p>
          </div>

          {/* Rookie Award */}
          <div className="card-hover bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {t('rookieAward', content.awards)}
                </h3>
                <p className="text-gray-600 text-sm">San Francisco Regional</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">39/41</div>
            <p className="text-gray-600">
              {t('zh') === 'zh' ? '舊金山區域賽新秀全明星獎' : 'Rookie All-Star Award at San Francisco Regional'}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveModal('awards')}
            className="bg-secondary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            {t('viewComplete', content.awards)}
          </button>
        </div>
      </div>

      <AwardsModal />
    </section>
  );
}
