export type Lang = "en" | "sw" | "de" | "fr" | "ki";

export type Eq = { tex: string; reading: string };

export type Work = {
  category: "math" | "clinical" | "health" | "history";
  field: string;
  badge: string;
  title: string;
  body: string;
  equations: Eq[];
  keywords: string;
  modelLink: string;
};

export type Copy = {
  langName: string;
  htmlLang: string;
  pageTitle: string;
  nav: {
    about: string;
    expertise: string;
    sandbox: string;
    portfolio: string;
    timeline: string;
    contact: string;
    cv: string;
    menu: string;
    close: string;
    language: string;
    skip: string;
  };
  banner: string;
  hero: {
    badge: string;
    heading: string;
    sub: string;
    works: string;
    sandbox: string;
    plateKicker: string;
    plateTitle: string;
    plateBody: string;
  };
  stats: { value: string; label: string }[];
  profile: {
    kicker: string;
    name: string;
    role: string;
    locationL: string;
    location: string;
    emailL: string;
    educationL: string;
    education: string;
    certsL: string;
    certs: string;
  };
  about: {
    kicker: string;
    heading: string;
    p1: string;
    p2: string;
    langsL: string;
    langs: string[];
  };
  expertise: {
    kicker: string;
    heading: string;
    items: { index: string; title: string; desc: string; points: string[] }[];
  };
  sandbox: {
    kicker: string;
    heading: string;
    intro: string;
    controls: string;
    t0: string;
    kLabel: string;
    time: string;
    now: string;
    speed: string;
    perMin: string;
    plot: string;
    inWords: string;
    reading: string;
    keyTitle: string;
    keys: { tex: string; meaning: string }[];
    minuteShort: string;
    targetNote: string;
    matchNote: string;
    formulaNow: string;
  };
  portfolio: {
    kicker: string;
    heading: string;
    filters: { id: "all" | "math" | "clinical" | "health" | "history"; label: string }[];
    empty: string;
    inWords: string;
    keywords: string;
    items: Work[];
  };
  timeline: {
    kicker: string;
    heading: string;
    education: string;
    work: string;
    degrees: { when: string; title: string; place: string }[];
    roles: { when: string; title: string; place: string }[];
  };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    emailL: string;
    phoneL: string;
    locationL: string;
    location: string;
    urlL: string;
    name: string;
    email: string;
    subject: string;
    subjects: string[];
    details: string;
    detailsPh: string;
    namePh: string;
    emailPh: string;
    send: string;
    sentTitle: string;
    sentBody: string;
    openMail: string;
    another: string;
    from: string;
  };
  cv: {
    title: string;
    profileH: string;
    profile: string;
    eduH: string;
    edu: string[];
    skillsH: string;
    skills: string;
    close: string;
  };
  footer: { rights: string; line: string };
};
