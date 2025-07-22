import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot, Settings, Zap, Calendar } from "lucide-react";
import { Modal } from "./Modal";
import { useLanguage } from "../hooks/useLanguage";
import { content } from "../data/content";

interface Robot {
  id: number;
  year: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  imageUrl?: string;
  specifications?: string;
  specificationsEn?: string;
}

export function Robots() {
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const { data: robots } = useQuery<Robot[]>({
    queryKey: ["/api/robots"],
    queryFn: async () => {
      const response = await fetch("/api/robots");
      if (!response.ok) {
        throw new Error("Failed to fetch robots");
      }
      return response.json();
    },
  });

  const Robot2025Modal = () => (
    <Modal
      isOpen={activeModal === "2025"}
      onClose={() => setActiveModal(null)}
      title={language === "zh" ? "我們的機器人" : "Our Robots"}
    >
      <div className="space-y-6">
        {!robots || robots.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {language === "zh" ? "尚無機器人資料" : "No robot data available"}
            </p>
          </div>
        ) : (
          robots
            .sort((a, b) => b.year - a.year)
            .map((robot) => (
              <div key={robot.id} className="border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-secondary mr-2" />
                  <h3 className="text-lg font-semibold text-secondary">
                    {robot.year} -{" "}
                    {language === "zh" ? robot.name : robot.nameEn}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {robot.imageUrl ? (
                      <img
                        src={robot.imageUrl}
                        alt={robot.name}
                        className="w-full rounded-lg object-cover aspect-video"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div className="w-full aspect-video bg-gray-100 rounded-lg items-center justify-center hidden">
                      <Bot className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      {language === "zh" ? "機器人描述" : "Robot Description"}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {language === "zh"
                        ? robot.description
                        : robot.descriptionEn}
                    </p>

                    {robot.specifications && (
                      <>
                        <h4 className="font-semibold mb-2">
                          {language === "zh"
                            ? "技術規格"
                            : "Technical Specifications"}
                        </h4>
                        <div className="text-sm text-gray-600">
                          <pre className="whitespace-pre-wrap font-sans">
                            {language === "zh"
                              ? robot.specifications
                              : robot.specificationsEn || robot.specifications}
                          </pre>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
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
          {language === "zh"
            ? "FRC，全名為 FIRST Robotics Competition，是由美國非營利組織 FIRST（For Inspiration and Recognition of Science and Technology） 所舉辦的國際高中機器人競賽。它融合了 科學、工程、程式設計與團隊合作，被譽為「機器人界的 NBA」。    比賽內容: 每年 1 月，FIRST 官方會發布當年度的主題與挑戰（類似一款特製的機器人遊戲），參賽隊伍必須在 6 週內設計、製作、程式設計並測試一台能夠完成比賽任務的 全尺寸機器人（最大尺寸大約為 125 公分 x 70 公分 x 160 公分）。"
            : "FRC, the full name of which is FIRST Robotics Competition, is an international high school robotics competition organized by the American non-profit organization FIRST (For Inspiration and Recognition of Science and Technology). It combines science, engineering, programming and teamwork, and is known as the 'NBA of robotics.'Competition content: In January of each year, FIRST will officially release the theme and challenge of the year (similar to a special robot game). Participating teams must design, produce, program and test a full-size robot (maximum size is approximately 125 cm x 70 cm x 160 cm) that can complete the competition tasks within 6 weeks."}
        </p>
        <img
          src="https://community.firstinspires.org/hubfs/first-blog_community_cmpupdates2-024.jpg"
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
          {language === "zh"
            ? "我們正在探索人工智能、機器學習和自動化技術在機器人中的應用。"
            : "We are exploring the application of artificial intelligence, machine learning, and automation technologies in robotics."}
        </p>
        <img
          src="https://scontent.ftpe8-4.fna.fbcdn.net/v/t39.30808-6/486174925_991914276379035_227942563990948035_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=GuCgBERaUxkQ7kNvwErKMKG&_nc_oc=AdmV1MsUIRio8v5ZcF0JrLRpLITxIqLNvvSnvCiT1bMe2VbWCg7eYd9QDiwE1cKA5FA&_nc_zt=23&_nc_ht=scontent.ftpe8-4.fna&_nc_gid=b7AeE3L_sKi5SkTa94YzEA&oh=00_AfRSCA9V_NDMWqj7Nx6by02zfN6eMiTc9hgHoRcM01m3sQ&oe=68804B58"
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0mSCm0ei9cmoiENc-x9i9w2q1soIqn5WyXA&s"
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
