<script setup>
import { useI18n } from 'vue-i18n'
import CertificateCard from '../ui/CertificateCard.vue'
import { certificates } from '../../assets/data/certificates.js'
import { aboutContent } from '../../assets/data/about.js'
import AboutVisual from '../sections/AboutVisual.vue'

const { t, locale } = useI18n()
const courses = ['AWS', 'Snowflake', 'Databricks', 'Tableau', 'Looker']
</script>

<template>
  <section>
    <div class="about-hero">
    <div class="about-visual-panel">
      <AboutVisual />
    </div>
    <div class="about-hero-content">
      <div class="eyebrow">{{ t('about.eyebrow') }}</div>
      <h1>{{ t('about.title') }}</h1>

      <div class="about-top" v-reveal>
        <div class="photo-col">
          <div class="photo-frame">
            <img src="/images/profile.jpg" alt="Luciano Kawano" />
          </div>
          <div class="quick-facts">
            <div class="quick-fact"><span>{{ t('about.local_label') }}</span><span>{{ t('about.local_value') }}</span></div>
            <div class="quick-fact"><span>{{ t('about.role_label') }}</span><span>{{ t('about.role_value') }}</span></div>
            <div class="quick-fact"><span>{{ t('about.lang_label') }}</span><span>{{ t('about.lang_value') }}</span></div>
          </div>
        </div>
        <div class="intro-col">
          <p class="about-intro" v-for="(p, i) in aboutContent.intro[locale]" :key="i" v-html="p"></p>
        </div>
      </div>
    </div>
  </div>

  <div class="section">

      <h3 class="subhead" v-reveal>{{ t('about.education_title') }}</h3>
      <div v-reveal>
        <div class="edu-item" v-for="e in aboutContent.education" :key="e.title[locale]">
          <span>{{ e.date }}</span>
          <h4>{{ e.title[locale] }}</h4>
        </div>
      </div>

      <h3 class="subhead" v-reveal>{{ t('about.courses_title') }}</h3>
      <div class="course-badges" v-reveal>
        <span class="course-badge" v-for="c in courses" :key="c">{{ c }}</span>
      </div>

      <div class="two-col">
        <div>
          <h3 class="subhead" v-reveal>{{ t('about.trajectory_title') }}</h3>
          <div class="timeline">
            <div class="tl-item" :class="{ muted: item.muted }" v-for="item in aboutContent.timeline" :key="item.title[locale]" v-reveal>
              <div class="tl-dot"></div>
              <span class="tl-date">{{ item.date[locale] }}</span>
              <h4>{{ item.title[locale] }}</h4>
              <p>{{ item.desc[locale] }}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="subhead" v-reveal>{{ t('about.certifications_title') }}</h3>
          <div class="cert-list" v-reveal>
            <CertificateCard v-for="c in certificates" :key="c.title" :cert="c" />
          </div>
        </div>
      </div>

      <h3 class="subhead" v-reveal>{{ t('about.outside_title') }}</h3>
      <div class="hobby-grid" v-reveal>
        <div class="hobby-item"><span class="hb-label">{{ t('about.hobby_music_label') }}</span>{{ t('about.hobby_music_text') }}</div>
        <div class="hobby-item"><span class="hb-label">{{ t('about.hobby_games_label') }}</span>{{ t('about.hobby_games_text') }}</div>
        <div class="hobby-item"><span class="hb-label">{{ t('about.hobby_design_label') }}</span>{{ t('about.hobby_design_text') }}</div>
        <div class="hobby-item hobby-photo-item">
          <img src="/images/hobby-personal.jpg" alt="" class="hobby-photo" />
          <div><span class="hb-label">{{ t('about.hobby_photo_label') }}</span>{{ t('about.hobby_photo_text') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 48px 8px; max-width: 720px; }
.eyebrow { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
.eyebrow::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--blue-300); box-shadow: 0 0 12px var(--blue-300); }
.hero h1 { font-size: 40px; }
.section { padding: 16px 48px 56px; }

.about-hero {
  display: flex;
  align-items: stretch;
  min-height: 520px;
}
.about-visual-panel {
  flex: 0 0 36%;
  min-width: 260px;
  position: relative;
  overflow: hidden;
}
.about-hero-content {
  flex: 1;
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.about-hero-content .eyebrow {
  font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300);
  display: flex; align-items: center; gap: 8px; margin-bottom: 20px;
}
.about-hero-content .eyebrow::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--blue-300); box-shadow: 0 0 12px var(--blue-300); }
.about-hero-content h1 { font-size: 38px; margin-bottom: 36px; max-width: 640px; }

@media (max-width: 900px) {
  .about-hero { flex-direction: column; min-height: auto; }
  .about-visual-panel { min-height: 220px; }
  .about-hero-content { padding: 40px 24px; }
}

.about-top { display: grid; grid-template-columns: 240px 1fr; gap: 56px; align-items: start; margin-bottom: 8px; }
@media (max-width: 720px) { .about-top { grid-template-columns: 1fr; } }
.photo-col { position: sticky; top: 100px; }
.photo-frame {
  width: 240px; height: 240px; border-radius: var(--radius-lg); overflow: hidden;
  background: linear-gradient(160deg, var(--blue-900), var(--bg-secondary));
  border: 1px solid var(--border-subtle);
}
.photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.quick-facts { margin-top: 20px; display: flex; flex-direction: column; gap: 10px; }
.quick-fact { display: flex; justify-content: space-between; font-size: var(--text-small); border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; }
.quick-fact span:first-child { color: var(--text-muted); font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase; }
.quick-fact span:last-child { color: var(--text-secondary); }

.about-intro { font-size: var(--text-body); color: var(--text-secondary); margin-bottom: 16px; max-width: 620px; }
.about-intro :deep(strong) { color: var(--text-primary); font-weight: 600; }

.subhead { font-size: var(--text-h2); margin: 44px 0 20px; }
.edu-item { padding: 16px 0; border-bottom: 1px solid var(--border-subtle); }
.edu-item span { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); }
.edu-item h4 { font-size: var(--text-h3); }
.course-badges { display: flex; gap: 10px; flex-wrap: wrap; }
.course-badge {
  font-family: var(--font-mono); font-size: var(--text-mono); color: var(--text-secondary);
  border: 1px solid var(--border-subtle); padding: 8px 16px; border-radius: 20px; display: flex; align-items: center; gap: 7px;
}
.course-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--blue-300); }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 12px; }
@media (max-width: 900px) { .two-col { grid-template-columns: 1fr; gap: 0; } }

.timeline { position: relative; margin-top: 4px; padding-left: 32px; }
.timeline::before { content: ''; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 1px; background: linear-gradient(180deg, var(--blue-300), var(--blue-900)); }
.tl-item { position: relative; padding-bottom: 40px; }
.tl-item:last-child { padding-bottom: 0; }
.tl-dot { position: absolute; left: -32px; top: 2px; width: 11px; height: 11px; border-radius: 50%; background: var(--blue-300); box-shadow: 0 0 0 4px rgba(75,180,230,0.15); }
.tl-item.muted .tl-dot { background: var(--text-muted); box-shadow: 0 0 0 4px rgba(92,107,133,0.12); }
.tl-date { font-family: var(--font-mono); font-size: var(--text-mono); color: var(--blue-300); margin-bottom: 6px; display: block; }
.tl-item h4 { font-size: var(--text-h3); margin-bottom: 6px; }
.tl-item p { font-size: var(--text-small); color: var(--text-secondary); }

.cert-list { display: flex; flex-direction: column; gap: 12px; }

.hobby-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 900px) { .hobby-grid { grid-template-columns: 1fr 1fr; } }
.hobby-item { background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; text-align: center; font-size: var(--text-small); color: var(--text-secondary); }
.hb-label { display: block; font-family: var(--font-mono); font-size: 11px; color: var(--blue-300); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
.hobby-photo-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.hobby-photo { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-subtle); }

@media (max-width: 640px) { .hero, .section { padding-left: 24px; padding-right: 24px; } }
</style>