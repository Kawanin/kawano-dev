<script setup>
import Hero from '../sections/Hero.vue'
import KpiStrip from '../sections/KpiStrip.vue'
import AboutSection from '../sections/AboutSection.vue'
import ExperienceSection from '../sections/ExperienceSection.vue'
import ProjectsSection from '../sections/ProjectsSection.vue'
import CertificatesSection from '../sections/CertificatesSection.vue'
import StackSection from '../sections/StackSection.vue'
import LanguagesSection from '../sections/LanguagesSection.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>

<template>
  <div>
    <Hero />
    <KpiStrip />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <CertificatesSection />
    <StackSection />
    <LanguagesSection />
    <ContactSection />
    <div class="end"></div>
  </div>
</template>

<style scoped>.end { height: var(--space-section); }</style>
