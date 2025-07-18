import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Lightbulb, Award } from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../hooks/useLanguage";
import { content } from "../data/content";

interface TeamMember {
  id: number;
  year: number;
  name: string;
  position: string;
  positionEn: string;
  category: string;
  imageUrl?: string;
  bio?: string;
  bioEn?: string;
}

export function About() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { data: teamMembers } = useQuery<TeamMember[]>({
    queryKey: ['/api/team-members'],
    queryFn: async () => {
      const response = await fetch('/api/team-members');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      return response.json();
    },
  });

  const TeamModal = () => {
    const groupedMembers = teamMembers?.reduce((groups: Record<string, Record<string, TeamMember[]>>, member) => {
      if (!groups[member.year]) {
        groups[member.year] = {};
      }
      if (!groups[member.year][member.category]) {
        groups[member.year][member.category] = [];
      }
      groups[member.year][member.category].push(member);
      return groups;
    }, {}) || {};

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'student': return t("zh") === "zh" ? "學" : "S";
        case 'mentor': return t("zh") === "zh" ? "導" : "M";
        case 'advisor': return t("zh") === "zh" ? "教" : "A";
        default: return t("zh") === "zh" ? "員" : "M";
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'student': return 'bg-secondary';
        case 'mentor': return 'bg-accent';
        case 'advisor': return 'bg-success';
        default: return 'bg-gray-500';
      }
    };

    return (
      <Modal
        isOpen={activeModal === "team"}
        onClose={() => setActiveModal(null)}
        title={t("teamComposition.title", content.about)}
      >
        <div className="space-y-6">
          {Object.keys(groupedMembers).length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {t("zh") === "zh" ? "尚無團隊成員資料" : "No team members data available"}
              </p>
            </div>
          ) : (
            Object.entries(groupedMembers)
              .sort(([a], [b]) => Number(b) - Number(a))
              .map(([year, categories]) => (
                <div key={year} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 text-secondary">
                    {year} {t("zh") === "zh" ? "年度團隊" : "Team"}
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(categories).map(([category, members]) => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-800 mb-2">
                          {t("zh") === "zh" ? 
                            (category === 'student' ? '學生成員' : category === 'mentor' ? '指導導師' : '指導教授') :
                            (category === 'student' ? 'Students' : category === 'mentor' ? 'Mentors' : 'Advisors')
                          } ({members.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {members.map((member) => (
                            <div key={member.id} className="flex items-center p-2 border rounded-lg">
                              <div className={`w-10 h-10 ${getCategoryColor(category)} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                                {getCategoryIcon(category)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm">{member.name}</div>
                                <div className="text-xs text-gray-600 truncate">
                                  {t("zh") === "zh" ? member.position : member.positionEn}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </Modal>
    );
  };

  const InnovationModal = () => (
    <Modal
      isOpen={activeModal === "innovation"}
      onClose={() => setActiveModal(null)}
      title={t("innovation.title", content.about)}
    >
      <div className="space-y-4">
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
