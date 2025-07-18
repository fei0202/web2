import { useState } from "react";
import { Bot, Settings, Zap } from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../hooks/useLanguage";
import { content } from "../data/content";

export function Robots() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const Robot2025Modal = () => (
    <Modal
      isOpen={activeModal === "歷年"}
      onClose={() => setActiveModal(null)}
      title={t("zh") === "zh" ? "我們的機器人" : "Our Robot"}
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
            {t("zh") === "zh" ? "技術規格" : "Technical Specifications"}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t("zh") === "zh" ? "重量" : "Weight"}</span>
              <span>125 lbs</span>
            </div>
            <div className="flex justify-between">
              <span>{t("zh") === "zh" ? "尺寸" : "Dimensions"}</span>
              <span>28" x 38" x 48"</span>
            </div>
            <div className="flex justify-between">
              <span>{t("zh") === "zh" ? "驅動系統" : "Drive System"}</span>
              <span>6-Wheel Tank Drive</span>
            </div>
            <div className="flex justify-between">
              <span>{t("zh") === "zh" ? "控制系統" : "Control System"}</span>
              <span>RoboRIO 2.0</span>
            </div>
            <div className="flex justify-between">
              <span>
                {t("zh") === "zh" ? "程式語言" : "Programming Language"}
              </span>
              <span>Java</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const PracticeRobotModal = () => (
    <Modal
      isOpen={activeModal === "practice"}
      onClose={() => setActiveModal(null)}
      title={t("practiceRobot.title", content.robots)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t("zh") === "zh"
            ? "FRC，全名為 FIRST Robotics Competition，是由美國非營利組織 FIRST（For Inspiration and Recognition of Science and Technology） 所舉辦的國際高中機器人競賽。它融合了 科學、工程、程式設計與團隊合作，被譽為「機器人界的 NBA」。    比賽內容: 每年 1 月，FIRST 官方會發布當年度的主題與挑戰（類似一款特製的機器人遊戲），參賽隊伍必須在 6 週內設計、製作、程式設計並測試一台能夠完成比賽任務的 全尺寸機器人（最大尺寸大約為 125 公分 x 70 公分 x 160 公分）。"
            : "FRC, the full name of which is FIRST Robotics Competition, is an international high school robotics competition organized by the American non-profit organization FIRST (For Inspiration and Recognition of Science and Technology). It combines science, engineering, programming and teamwork, and is known as the 'NBA of robotics.'Competition content: In January of each year, FIRST will officially release the theme and challenge of the year (similar to a special robot game). Participating teams must design, produce, program and test a full-size robot (maximum size is approximately 125 cm x 70 cm x 160 cm) that can complete the competition tasks within 6 weeks."}
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
      isOpen={activeModal === "future"}
      onClose={() => setActiveModal(null)}
      title={t("futureProjects.title", content.robots)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t("zh") === "zh"
            ? "我們正在探索人工智能、機器學習和自動化技術在機器人中的應用。"
            : "We are exploring the application of artificial intelligence, machine learning, and automation technologies in robotics."}
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
            {t("title", content.robots)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle", content.robots)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Robot */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="/src/assets/images/robot.png"
              alt="2025 Robot"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Bot className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("robot2025.title", content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("robot2025.description", content.robots)}
              </p>
              <button
                onClick={() => setActiveModal("2025")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("detailedSpecs", content.common)}
              </button>
            </div>
          </div>

          {/* Practice Robot */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="data:image/png;base64,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"
              alt="Practice Robot"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Settings className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("practiceRobot.title", content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("practiceRobot.description", content.robots)}
              </p>
              <button
                onClick={() => setActiveModal("practice")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("learnMore", content.common)}
              </button>
            </div>
          </div>

          {/* Future Projects */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="/src/assets/images/future.png"
              alt="Future Projects"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("futureProjects.title", content.robots)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("futureProjects.description", content.robots)}
              </p>
              <button
                onClick={() => setActiveModal("future")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("exploreFuture", content.common)}
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
