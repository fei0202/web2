export type Language = 'zh' | 'en';

export interface LanguageContent {
  zh: string;
  en: string;
}

export interface ContentData {
  navigation: {
    home: LanguageContent;
    about: LanguageContent;
    robots: LanguageContent;
    awards: LanguageContent;
    sponsors: LanguageContent;
    contact: LanguageContent;
  };
  hero: {
    title: LanguageContent;
    subtitle: LanguageContent;
    learnMore: LanguageContent;
    joinUs: LanguageContent;
  };
  about: {
    title: LanguageContent;
    subtitle: LanguageContent;
    teamComposition: {
      title: LanguageContent;
      description: LanguageContent;
    };
    innovation: {
      title: LanguageContent;
      description: LanguageContent;
    };
    skills: {
      title: LanguageContent;
      description: LanguageContent;
    };
  };
  robots: {
    title: LanguageContent;
    subtitle: LanguageContent;
    robot2025: {
      title: LanguageContent;
      description: LanguageContent;
    };
    practiceRobot: {
      title: LanguageContent;
      description: LanguageContent;
    };
    futureProjects: {
      title: LanguageContent;
      description: LanguageContent;
    };
  };
  awards: {
    title: LanguageContent;
    subtitle: LanguageContent;
    worldRanking: LanguageContent;
    regionalRanking: LanguageContent;
    rookieAward: LanguageContent;
    viewComplete: LanguageContent;
  };
  sponsors: {
    title: LanguageContent;
    subtitle: LanguageContent;
    becomeSponsors: LanguageContent;
  };
  contact: {
    title: LanguageContent;
    subtitle: LanguageContent;
    contactInfo: LanguageContent;
    name: LanguageContent;
    email: LanguageContent;
    subject: LanguageContent;
    message: LanguageContent;
    sendMessage: LanguageContent;
    socialMedia: LanguageContent;
  };
  footer: {
    description: LanguageContent;
    quickLinks: LanguageContent;
    resources: LanguageContent;
    followUs: LanguageContent;
    joinTeam: LanguageContent;
    becomeSponsors: LanguageContent;
    newsMedia: LanguageContent;
    technicalDocs: LanguageContent;
    copyright: LanguageContent;
  };
  common: {
    learnMore: LanguageContent;
    detailedSpecs: LanguageContent;
    exploreFuture: LanguageContent;
    close: LanguageContent;
  };
  in: {
    title: LanguageContent;
    subtitle: LanguageContent;
    worldRanking: LanguageContent;
    regionalRanking: LanguageContent;
    rookieAward: LanguageContent;
    viewComplete: LanguageContent;
  };
}
