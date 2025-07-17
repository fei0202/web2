import { useState } from 'react';
import { Bot, Settings, Zap } from 'lucide-react';
import { Modal } from './Modal';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';

export function Robots() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const Robot2025Modal = () => (
    <Modal
      isOpen={activeModal === '2025'}
      onClose={() => setActiveModal(null)}
      title={t('zh') === 'zh' ? '2025 機器人詳細規格' : '2025 Robot Detailed Specifications'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
            alt="2025 Robot detailed view"
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t('zh') === 'zh' ? '技術規格' : 'Technical Specifications'}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t('zh') === 'zh' ? '重量' : 'Weight'}</span>
              <span>125 lbs</span>
            </div>
            <div className="flex justify-between">
              <span>{t('zh') === 'zh' ? '尺寸' : 'Dimensions'}</span>
              <span>28" x 38" x 48"</span>
            </div>
            <div className="flex justify-between">
              <span>{t('zh') === 'zh' ? '驅動系統' : 'Drive System'}</span>
              <span>6-Wheel Tank Drive</span>
            </div>
            <div className="flex justify-between">
              <span>{t('zh') === 'zh' ? '控制系統' : 'Control System'}</span>
              <span>RoboRIO 2.0</span>
            </div>
            <div className="flex justify-between">
              <span>{t('zh') === 'zh' ? '程式語言' : 'Programming Language'}</span>
              <span>Java</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const PracticeRobotModal = () => (
    <Modal
      isOpen={activeModal === 'practice'}
      onClose={() => setActiveModal(null)}
      title={t('practiceRobot.title', content.robots)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t('zh') === 'zh' 
            ? '我們的練習機器人用於日常訓練和技能提升，幫助團隊成員熟悉操作和維護。'
            : 'Our practice robot is used for daily training and skill improvement, helping team members become familiar with operation and maintenance.'
          }
        </p>
        <img
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
          alt="Practice robot"
          className="w-full rounded-lg"
        />
      </div>
    </Modal>
  );

  const FutureProjectsModal = () => (
    <Modal
      isOpen={activeModal === 'future'}
      onClose={() => setActiveModal(null)}
      title={t('futureProjects.title', content.robots)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t('zh') === 'zh' 
            ? '我們正在探索人工智能、機器學習和自動化技術在機器人中的應用。'
            : 'We are exploring the application of artificial intelligence, machine learning, and automation technologies in robotics.'
          }
        </p>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
          alt="Future technology concepts"
          className="w-full rounded-lg"
        />
      </div>
    </Modal>
  );

  return (
    <section id="robots" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('title', content.robots)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle', content.robots)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 2025 Robot */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="2025 Robot"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Bot className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t('robot2025.title', content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t('robot2025.description', content.robots)}
              </p>
              <button
                onClick={() => setActiveModal('2025')}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t('detailedSpecs', content.common)}
              </button>
            </div>
          </div>

          {/* Practice Robot */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="Practice Robot"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Settings className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t('practiceRobot.title', content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t('practiceRobot.description', content.robots)}
              </p>
              <button
                onClick={() => setActiveModal('practice')}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t('learnMore', content.common)}
              </button>
            </div>
          </div>

          {/* Future Projects */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://pixabay.com/get/g4df5f1f7badc4f784be2f088f39cff4dd5dc76a9475b74043ddd4ae0a63853aeb621ffd8fbc61925cc9a71bef4c1e61e06d86d66fab96fb9c30dda94a3af4997_1280.jpg"
              alt="Future Projects"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t('futureProjects.title', content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t('futureProjects.description', content.robots)}
              </p>
              <button
                onClick={() => setActiveModal('future')}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t('exploreFuture', content.common)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Robot2025Modal />
      <PracticeRobotModal />
      <FutureProjectsModal />
    </section>
  );
}
