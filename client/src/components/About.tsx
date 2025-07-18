import { useState } from "react";
import { Users, Lightbulb, Award } from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../hooks/useLanguage";
import { content } from "../data/content";

export function About() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const TeamModal = () => (
    <Modal
      isOpen={activeModal === "team"}
      onClose={() => setActiveModal(null)}
      title={t("teamComposition.title", content.about)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
            alt="Team working together"
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("zh") === "zh" ? "團隊成員" : "Team Members"}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold mr-3">
                {t("zh") === "zh" ? "工" : "E"}
              </div>
              <div>
                <div className="font-medium">
                  {t("zh") === "zh"
                    ? "工程組 (6人)"
                    : "Engineering Team (6 members)"}
                </div>
                <div className="text-sm text-gray-600">
                  {t("zh") === "zh"
                    ? "機械設計、電路設計、程式開發"
                    : "Mechanical Design, Circuit Design, Programming"}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold mr-3">
                {t("zh") === "zh" ? "行" : "M"}
              </div>
              <div>
                <div className="font-medium">
                  {t("zh") === "zh"
                    ? "行銷組 (4人)"
                    : "Marketing Team (4 members)"}
                </div>
                <div className="text-sm text-gray-600">
                  {t("zh") === "zh"
                    ? "品牌推廣、社群媒體、活動企劃"
                    : "Brand Promotion, Social Media, Event Planning"}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white font-bold mr-3">
                {t("zh") === "zh" ? "管" : "P"}
              </div>
              <div>
                <div className="font-medium">
                  {t("zh") === "zh"
                    ? "專案管理組 (3人)"
                    : "Project Management (3 members)"}
                </div>
                <div className="text-sm text-gray-600">
                  {t("zh") === "zh"
                    ? "進度管控、資源分配、團隊協調"
                    : "Progress Control, Resource Allocation, Team Coordination"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const InnovationModal = () => (
    <Modal
      isOpen={activeModal === "innovation"}
      onClose={() => setActiveModal(null)}
      title={t("innovation.title", content.about)}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {t("zh") === "zh"
            ? "我們的創新方法包含設計思維、快速原型製作和迭代改進。我們相信透過不斷的實驗和學習，能夠創造出更優秀的解決方案"
            : "Our innovative approach includes design thinking, rapid prototyping, and iterative improvement. We believe that through continuous experimentation and learning, we can create better solutions."}
        </p>
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
          alt="Innovation concepts"
          className="w-full rounded-lg"
        />
      </div>
    </Modal>
  );

  const SkillsModal = () => (
    <Modal
      isOpen={activeModal === "skills"}
      onClose={() => setActiveModal(null)}
      title={t("skills.title", content.about)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("zh") === "zh" ? "技術技能" : "Technical Skills"}
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              {t("zh") === "zh" ? "機械設計 (CAD)" : "Mechanical Design (CAD)"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              {t("zh") === "zh" ? "電路設計" : "Circuit Design"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              {t("zh") === "zh"
                ? "程式開發 (Java, Python)"
                : "Programming (Java, Python)"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
              {t("zh") === "zh" ? "3D列印技術" : "3D Printing Technology"}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {t("zh") === "zh" ? "軟技能" : "Soft Skills"}
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              {t("zh") === "zh" ? "團隊合作" : "Teamwork"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              {t("zh") === "zh" ? "溝通技巧" : "Communication Skills"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              {t("zh") === "zh" ? "問題解決" : "Problem Solving"}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              {t("zh") === "zh" ? "專案管理" : "Project Management"}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("title", content.about)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle", content.about)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Composition Card */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="Team composition"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("teamComposition.title", content.about)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("teamComposition.description", content.about)}
              </p>
              <button
                onClick={() => setActiveModal("team")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("learnMore", content.common)}
              </button>
            </div>
          </div>

          {/* Innovation Card */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="Innovation and technology"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("innovation.title", content.about)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("innovation.description", content.about)}
              </p>
              <button
                onClick={() => setActiveModal("innovation")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("learnMore", content.common)}
              </button>
            </div>
          </div>

          {/* Skills Card */}
          <div className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
              alt="Engineering skills"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Award className="w-6 h-6 text-secondary mr-2" />
                <h3 className="text-xl font-semibold text-primary">
                  {t("skills.title", content.about)}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("skills.description", content.about)}
              </p>
              <button
                onClick={() => setActiveModal("skills")}
                className="bg-secondary hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
              >
                {t("learnMore", content.common)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <TeamModal />
      <InnovationModal />
      <SkillsModal />
    </section>
  );
}
