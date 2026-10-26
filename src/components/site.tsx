import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, FileText, Menu, X } from "lucide-react";
import { Kettle } from "@/components/kettle";
import { MathTex } from "@/components/math";
import { EMAIL, LANGS, PHONE, PHONE_TEL, SITE, copy, readStoredLang, storeLang } from "@/lib/copy";
import type { Lang } from "@/lib/copy/types";

const nav = [
  ["about", "about"],
  ["expertise", "expertise"],
  ["sandbox", "sandbox"],
  ["portfolio", "portfolio"],
  ["timeline", "timeline"],
  ["contact", "contact"],
] as const;

export function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<"all" | "math" | "clinical" | "health" | "history">("all");
  const [cvOpen, setCvOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const stored = readStoredLang();
    if (stored !== "en") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.pageTitle;
  }, [t.htmlLang, t.pageTitle]);

  function choose(next: Lang) {
    setLang(next);
    storeLang(next);
    setMenu(false);
  }

  const works = t.portfolio.items.filter((item) => filter === "all" || item.category === filter);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.nav.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#content" className="min-w-0">
            <span className="block font-display text-xl font-semibold leading-none text-ink">Brian Mbuthi</span>
            <span className="mt-1 block truncate font-mono text-xs text-muted">{t.profile.role}</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex" aria-label="Primary">
            {nav.map(([id, key]) => (
              <a key={id} href={`#${id}`} className="transition-colors duration-150 hover:text-ink">
                {t.nav[key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelect lang={lang} label={t.nav.language} onChange={choose} className="hidden sm:block" />
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className="hidden h-11 items-center gap-2 rounded-md border border-line-strong bg-card px-3 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-paper-2 md:inline-flex"
            >
              <FileText className="h-4 w-4 text-accent" aria-hidden />
              {t.nav.cv}
            </button>
            <a
              href="#contact"
              className="hidden h-11 items-center rounded-md bg-ink px-4 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent sm:inline-flex"
            >
              {t.nav.contact}
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-card text-ink lg:hidden"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">{menu ? t.nav.close : t.nav.menu}</span>
            </button>
          </div>
        </div>
        {menu ? (
          <div id="mobile-nav" className="border-t border-line bg-card px-5 py-4 lg:hidden">
            <div className="flex flex-col">
              {nav.map(([id, key]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenu(false)}
                  className="flex h-11 items-center text-base font-medium text-ink"
                >
                  {t.nav[key]}
                </a>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              <LanguageSelect lang={lang} label={t.nav.language} onChange={choose} />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  setCvOpen(true);
                }}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-md border border-line-strong bg-paper text-sm font-semibold"
              >
                {t.nav.cv}
              </button>
              <a
                href="#contact"
                onClick={() => setMenu(false)}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-md bg-ink text-sm font-semibold text-paper"
              >
                {t.nav.contact}
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <div className="border-b border-line bg-accent-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-3 sm:block">
          <p className="text-center text-sm leading-relaxed text-ink">{t.banner}</p>
          <div className="sm:hidden">
            <LanguageSelect lang={lang} label={t.nav.language} onChange={choose} />
          </div>
        </div>
      </div>

      <main id="content" key={lang} className="lang-swap">
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-14">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.hero.badge}</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                {t.hero.heading}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t.hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#portfolio"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent"
                >
                  {t.hero.works}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#sandbox"
                  className="inline-flex h-11 items-center rounded-md border border-line-strong bg-card px-5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-paper-2"
                >
                  {t.hero.sandbox}
                </a>
              </div>
            </div>
            <aside className="rounded-panel border border-line bg-card p-6 lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.hero.plateKicker}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">{t.hero.plateTitle}</h2>
              <div className="mt-4 overflow-x-auto text-ink">
                <MathTex tex="T(t)=100-80e^{-0.2t}" block />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.hero.plateBody}</p>
            </aside>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
            {t.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-semibold tabular-nums text-ink">{stat.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="about" className="border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12">
            <div className="md:col-span-4 md:border-r md:border-line md:pr-8">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.profile.kicker}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-ink">{t.profile.name}</h2>
              <p className="mt-2 font-mono text-xs text-muted">{t.profile.role}</p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">{t.profile.locationL}</dt>
                  <dd className="text-muted">{t.profile.location}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t.profile.emailL}</dt>
                  <dd>
                    <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t.profile.educationL}</dt>
                  <dd className="text-muted">{t.profile.education}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{t.profile.certsL}</dt>
                  <dd className="text-muted">{t.profile.certs}</dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-8">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.about.kicker}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.about.heading}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{t.about.p1}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{t.about.p2}</p>
              <div className="mt-8 border-t border-line pt-5">
                <p className="font-mono text-xs uppercase tracking-widest text-faint">{t.about.langsL}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.about.langs.map((item) => (
                    <li key={item} className="rounded-md border border-line bg-card px-3 py-2 text-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="border-t border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.expertise.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.expertise.heading}</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {t.expertise.items.map((item) => (
                <article key={item.index}>
                  <p className="font-mono text-xs text-accent">{item.index}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
                  <ul className="mt-4 space-y-1 text-sm text-ink">
                    {item.points.map((point) => (
                      <li key={point} className="border-l-2 border-accent pl-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sandbox" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.sandbox.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.sandbox.heading}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{t.sandbox.intro}</p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-card px-4 py-3 text-ink">
              <MathTex tex="T(t)=T_{\max}-(T_{\max}-T_0)\,e^{-kt}" block />
            </div>
            <div className="mt-8">
              <Kettle t={t} />
            </div>
          </div>
        </section>

        <section id="portfolio" className="border-t border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.portfolio.kicker}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.portfolio.heading}</h2>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.portfolio.heading}>
                {t.portfolio.filters.map((f) => {
                  const on = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      className={`h-11 rounded-md px-3 text-sm font-semibold transition-colors duration-150 ${
                        on ? "bg-ink text-paper" : "border border-line-strong bg-paper text-ink hover:bg-paper-2"
                      }`}
                      aria-pressed={on}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 space-y-8">
              {works.length === 0 ? <p className="text-muted">{t.portfolio.empty}</p> : null}
              {works.map((item) => (
                <article key={item.title} className="grid gap-4 border-b border-line pb-8 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <p className="font-mono text-xs text-faint">{item.field}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{item.badge}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-xl font-semibold leading-snug text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                    {item.equations.map((eq) => (
                      <div key={eq.tex} className="mt-4 rounded-lg border border-line bg-paper px-4 py-3">
                        <div className="text-ink">
                          <MathTex tex={eq.tex} block />
                        </div>
                        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-accent">{t.portfolio.inWords}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink">{eq.reading}</p>
                      </div>
                    ))}
                    {item.modelLink ? (
                      <a href="#sandbox" className="mt-3 inline-flex h-11 items-center text-sm font-semibold text-accent">
                        {item.modelLink}
                      </a>
                    ) : null}
                    <p className="mt-3 text-xs leading-relaxed text-faint">
                      <span className="font-semibold text-muted">{t.portfolio.keywords}. </span>
                      {item.keywords}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.timeline.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.timeline.heading}</h2>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="border-b border-line pb-2 font-display text-xl font-semibold">{t.timeline.education}</h3>
                <ol className="mt-6 space-y-6">
                  {t.timeline.degrees.map((row) => (
                    <li key={row.title}>
                      <p className="font-mono text-xs text-accent">{row.when}</p>
                      <p className="mt-1 font-semibold text-ink">{row.title}</p>
                      <p className="text-sm text-muted">{row.place}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="border-b border-line pb-2 font-display text-xl font-semibold">{t.timeline.work}</h3>
                <ol className="mt-6 space-y-6">
                  {t.timeline.roles.map((row) => (
                    <li key={row.title}>
                      <p className="font-mono text-xs text-accent">{row.when}</p>
                      <p className="mt-1 font-semibold text-ink">{row.title}</p>
                      <p className="text-sm text-muted">{row.place}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-line bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{t.contact.kicker}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink">{t.contact.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.contact.body}</p>
              <dl className="mt-6 space-y-2 font-mono text-xs text-ink">
                <div>
                  <dt className="inline font-semibold">{t.contact.emailL}: </dt>
                  <dd className="inline">
                    <a className="text-accent" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold">{t.contact.phoneL}: </dt>
                  <dd className="inline">
                    <a className="text-accent" href={`tel:${PHONE_TEL}`}>
                      {PHONE}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold">{t.contact.locationL}: </dt>
                  <dd className="inline">{t.contact.location}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">{t.contact.urlL}: </dt>
                  <dd className="inline">
                    <a className="text-accent" href={SITE}>
                      khabibjnr.github.io
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-7">
              <ContactForm t={t} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.rights}</p>
          <p>{t.footer.line}</p>
        </div>
      </footer>

      <Dialog.Root open={cvOpen} onOpenChange={setCvOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[min(100%-2rem,42rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-panel border border-line bg-card p-6 text-ink shadow-none focus:outline-none">
            <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
              <div>
                <Dialog.Title className="font-display text-2xl font-semibold">{t.cv.title}</Dialog.Title>
                <Dialog.Description className="mt-1 font-mono text-xs text-muted">
                  Brian Mbuthi Njenga · {EMAIL} · {PHONE}
                </Dialog.Description>
              </div>
              <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink">
                <X className="h-5 w-5" />
                <span className="sr-only">{t.cv.close}</span>
              </Dialog.Close>
            </div>
            <div className="mt-5 space-y-6 text-sm leading-relaxed text-muted">
              <section>
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink">{t.cv.profileH}</h3>
                <p className="mt-2">{t.cv.profile}</p>
              </section>
              <section>
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink">{t.cv.eduH}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {t.cv.edu.map((row) => (
                    <li key={row}>{row}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink">{t.cv.skillsH}</h3>
                <p className="mt-2">{t.cv.skills}</p>
              </section>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function LanguageSelect({
  lang,
  label,
  onChange,
  className = "",
}: {
  lang: Lang;
  label: string;
  onChange: (lang: Lang) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={lang}
        onChange={(e) => onChange(e.target.value as Lang)}
        className="h-11 rounded-md border border-line-strong bg-card px-3 text-sm font-semibold text-ink"
        aria-label={label}
      >
        {LANGS.map((item) => (
          <option key={item.id} value={item.id}>
            {item.native}
          </option>
        ))}
      </select>
    </label>
  );
}

function ContactForm({ t }: { t: (typeof copy)["en"] }) {
  const [href, setHref] = useState<string | null>(null);

  if (href) {
    return (
      <div className="rounded-panel border border-line bg-paper p-6">
        <h3 className="font-display text-2xl font-semibold text-ink">{t.contact.sentTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.contact.sentBody}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={href}
            className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-semibold text-paper hover:bg-accent"
          >
            {t.contact.openMail}
          </a>
          <button
            type="button"
            onClick={() => setHref(null)}
            className="inline-flex h-11 items-center rounded-md border border-line-strong bg-card px-5 text-sm font-semibold"
          >
            {t.contact.another}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-panel border border-line bg-paper p-6"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "");
        const email = String(data.get("email") ?? "");
        const subject = String(data.get("subject") ?? "");
        const details = String(data.get("details") ?? "");
        const body = `${t.contact.from}: ${name} <${email}>\n\n${details}`;
        setHref(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.contact.name} name="name" type="text" placeholder={t.contact.namePh} required />
        <Field label={t.contact.email} name="email" type="email" placeholder={t.contact.emailPh} required />
      </div>
      <label className="mt-4 block text-sm font-medium text-ink">
        {t.contact.subject}
        <select
          name="subject"
          className="mt-1 h-11 w-full rounded-md border border-line bg-card px-3 text-sm text-ink"
        >
          {t.contact.subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium text-ink">
        {t.contact.details}
        <textarea
          name="details"
          required
          rows={5}
          placeholder={t.contact.detailsPh}
          className="mt-1 w-full rounded-md border border-line bg-card px-3 py-3 text-sm text-ink"
        />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-ink text-sm font-semibold text-paper transition-colors duration-150 hover:bg-accent"
      >
        {t.contact.send}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-md border border-line bg-card px-3 text-sm font-normal text-ink"
      />
    </label>
  );
}
