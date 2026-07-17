import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const DATA_DIR = './src/data';
const EXCEL_DIR = './excel_data';

if (!fs.existsSync(EXCEL_DIR)) {
  fs.mkdirSync(EXCEL_DIR, { recursive: true });
}

function createWorkbook(sheets) {
  const wb = XLSX.utils.book_new();
  for (const [sheetName, sheetData] of Object.entries(sheets)) {
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }
  return wb;
}

console.log('Generating initial Excel workbooks...');

// 1. home.xlsx
try {
  const home = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'home.json'), 'utf8'));
  const homeSheets = {
    hero: [
      { key: 'badge', value: home.hero.badge },
      { key: 'title', value: home.hero.title },
      { key: 'description', value: home.hero.description },
      { key: 'cta_primary', value: home.hero.cta_primary },
      { key: 'cta_secondary', value: home.hero.cta_secondary }
    ],
    marquee: home.marquee.map(t => ({ text: t })),
    stats: home.stats,
    sdgs: [
      { key: 'badge', value: home.sdgs.badge },
      { key: 'title', value: home.sdgs.title },
      { key: 'description', value: home.sdgs.description }
    ],
    sdgs_items: home.sdgs.items,
    academic: [
      { key: 'badge', value: home.academic.badge },
      { key: 'title', value: home.academic.title },
      { key: 'quote', value: home.academic.quote },
      { key: 'cta', value: home.academic.cta },
      { key: 'video_label', value: home.academic.video_label }
    ],
    academic_features: home.academic.features.map(f => ({ feature: f })),
    impact: [
      { key: 'badge', value: home.impact.badge },
      { key: 'title', value: home.impact.title },
      { key: 'description', value: home.impact.description },
      { key: 'cta', value: home.impact.cta },
      { key: 'status', value: home.impact.status }
    ]
  };
  XLSX.writeFile(createWorkbook(homeSheets), path.join(EXCEL_DIR, 'home.xlsx'));
  console.log('Created: home.xlsx');
} catch (e) {
  console.error('Error generating home.xlsx:', e.message);
}

// 2. about.xlsx
try {
  const about = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'about.json'), 'utf8'));
  const aboutSheets = {
    hero: [
      { key: 'title', value: about.hero.title },
      { key: 'description', value: about.hero.description }
    ],
    sidebar: about.sidebar,
    background: [
      { key: 'title', value: about.background.title },
      { key: 'quote', value: about.background.quote },
      { key: 'vision_title', value: about.background.vision_fr_bacher.title },
      { key: 'vision_overlay', value: about.background.vision_fr_bacher.overlay },
      { key: 'vision_image', value: about.background.vision_fr_bacher.image },
      { key: 'mission_title', value: about.background.mission.title },
      { key: 'mission_text', value: about.background.mission.text }
    ],
    background_vision_paragraphs: about.background.vision_fr_bacher.text.map(t => ({ text: t })),
    leadership: about.leadership.members,
    milestones: about.milestones.items.map(item => ({
      year: item.year,
      title: item.title,
      description: item.text
    })),
    legal: [
      { key: 'title', value: about.legal.title },
      { key: 'text', value: about.legal.text }
    ]
  };
  XLSX.writeFile(createWorkbook(aboutSheets), path.join(EXCEL_DIR, 'about.xlsx'));
  console.log('Created: about.xlsx');
} catch (e) {
  console.error('Error generating about.xlsx:', e.message);
}

// 3. contact.xlsx
try {
  const contact = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'contact.json'), 'utf8'));
  const contactSheets = {
    hero: [
      { key: 'title', value: contact.hero.title },
      { key: 'description', value: contact.hero.description }
    ],
    info: [
      { key: 'title', value: contact.info.title },
      { key: 'description', value: contact.info.description }
    ],
    info_items: contact.info.items,
    form: [
      { key: 'title', value: contact.form.title },
      { key: 'consent', value: contact.form.consent },
      { key: 'cta', value: contact.form.cta }
    ],
    form_fields: [
      { field: 'name', label: contact.form.fields.name.label, placeholder: contact.form.fields.name.placeholder || '' },
      { field: 'email', label: contact.form.fields.email.label, placeholder: contact.form.fields.email.placeholder || '' },
      { field: 'subject', label: contact.form.fields.subject.label, placeholder: contact.form.fields.subject.placeholder || '' },
      { field: 'message', label: contact.form.fields.message.label, placeholder: contact.form.fields.message.placeholder || '' }
    ],
    form_options: contact.form.options.map(o => ({ option: o }))
  };
  XLSX.writeFile(createWorkbook(contactSheets), path.join(EXCEL_DIR, 'contact.xlsx'));
  console.log('Created: contact.xlsx');
} catch (e) {
  console.error('Error generating contact.xlsx:', e.message);
}

// 4. global.xlsx
try {
  const globalData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'global.json'), 'utf8'));
  const globalSheets = {
    header: [
      { key: 'cta', value: globalData.header.cta }
    ],
    footer: [
      { key: 'description', value: globalData.footer.description },
      { key: 'quickLinksTitle', value: globalData.footer.quickLinksTitle },
      { key: 'contactTitle', value: globalData.footer.contactTitle },
      { key: 'address', value: globalData.footer.address },
      { key: 'email', value: globalData.footer.email },
      { key: 'phone', value: globalData.footer.phone },
      { key: 'newsletter_placeholder', value: globalData.footer.newsletter.placeholder },
      { key: 'newsletter_button', value: globalData.footer.newsletter.button },
      { key: 'copyright', value: globalData.footer.copyright }
    ],
    footer_legal: globalData.footer.legalLinks,
    components: [
      { key: 'quickLinks_defaultTitle', value: globalData.components.quickLinks.defaultTitle },
      { key: 'quickLinks_footerNote', value: globalData.components.quickLinks.footerNote }
    ]
  };
  XLSX.writeFile(createWorkbook(globalSheets), path.join(EXCEL_DIR, 'global.xlsx'));
  console.log('Created: global.xlsx');
} catch (e) {
  console.error('Error generating global.xlsx:', e.message);
}

// 5. impact.xlsx
try {
  const impact = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'impact.json'), 'utf8'));
  const impactSheets = {
    hero: [
      { key: 'title', value: impact.hero.title },
      { key: 'description', value: impact.hero.description }
    ],
    sidebar: impact.sidebar,
    research: [
      { key: 'title', value: impact.research.title },
      { key: 'quote', value: impact.research.quote },
      { key: 'description', value: impact.research.description }
    ],
    field_visits: [
      { key: 'title', value: impact.field_visits.title },
      { key: 'badge', value: impact.field_visits.badge },
      { key: 'map_cta', value: impact.field_visits.map_cta },
      { key: 'map_title', value: impact.field_visits.map_title },
      { key: 'map_description', value: impact.field_visits.map_description },
      { key: 'featured_label', value: impact.field_visits.featured_label },
      { key: 'featured_location', value: impact.field_visits.featured.location },
      { key: 'featured_summary', value: impact.field_visits.featured.summary }
    ],
    field_visits_featured_stats: impact.field_visits.featured.stats,
    projects: impact.projects.items,
    network: [
      { key: 'title', value: impact.network.title },
      { key: 'description', value: impact.network.description }
    ],
    network_items: impact.network.items.map(i => ({ item: i }))
  };
  XLSX.writeFile(createWorkbook(impactSheets), path.join(EXCEL_DIR, 'impact.xlsx'));
  console.log('Created: impact.xlsx');
} catch (e) {
  console.error('Error generating impact.xlsx:', e.message);
}

// 6. mpsm.xlsx
try {
  const mpsm = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'mpsm.json'), 'utf8'));
  const mpsmSheets = {
    general: [
      { key: 'id', value: mpsm.id },
      { key: 'title', value: mpsm.title },
      { key: 'summary', value: mpsm.summary },
      { key: 'location_name', value: mpsm.location.name },
      { key: 'location_region', value: mpsm.location.region },
      { key: 'location_focus', value: mpsm.location.focus },
      { key: 'location_lat', value: mpsm.location.coordinates[0] },
      { key: 'location_lng', value: mpsm.location.coordinates[1] }
    ],
    phases: mpsm.phases,
    outcomes: mpsm.outcomes.map(o => ({ outcome: o })),
    gallery: mpsm.gallery,
    stats: mpsm.stats
  };
  XLSX.writeFile(createWorkbook(mpsmSheets), path.join(EXCEL_DIR, 'mpsm.xlsx'));
  console.log('Created: mpsm.xlsx');
} catch (e) {
  console.error('Error generating mpsm.xlsx:', e.message);
}

// 7. navigation.xlsx
try {
  const nav = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'navigation.json'), 'utf8'));
  const navRows = [];
  nav.navigation.forEach(item => {
    if (item.submenu && item.submenu.length > 0) {
      item.submenu.forEach(sub => {
        navRows.push({
          name: item.name,
          path: item.path,
          submenu_name: sub.name,
          submenu_path: sub.path
        });
      });
    } else {
      navRows.push({
        name: item.name,
        path: item.path,
        submenu_name: '',
        submenu_path: ''
      });
    }
  });
  const navSheets = {
    navigation: navRows
  };
  XLSX.writeFile(createWorkbook(navSheets), path.join(EXCEL_DIR, 'navigation.xlsx'));
  console.log('Created: navigation.xlsx');
} catch (e) {
  console.error('Error generating navigation.xlsx:', e.message);
}

// 8. news.xlsx
try {
  const news = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8'));
  const newsSheets = {
    hero: [
      { key: 'title', value: news.hero.title },
      { key: 'description', value: news.hero.description }
    ],
    notices: [
      { key: 'title', value: news.notices.title },
      { key: 'cta', value: news.notices.cta }
    ],
    notices_items: news.notices.items,
    media: [
      { key: 'title', value: news.media.title }
    ],
    media_items: news.media.items,
    journal: [
      { key: 'title', value: news.journal.title },
      { key: 'badge', value: news.journal.badge },
      { key: 'description', value: news.journal.description },
      { key: 'cta', value: news.journal.cta }
    ],
    journal_entries: news.journal.entries
  };
  XLSX.writeFile(createWorkbook(newsSheets), path.join(EXCEL_DIR, 'news.xlsx'));
  console.log('Created: news.xlsx');
} catch (e) {
  console.error('Error generating news.xlsx:', e.message);
}

// 9. study.xlsx
try {
  const study = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'study.json'), 'utf8'));
  const studySheets = {
    hero: [
      { key: 'title', value: study.hero.title },
      { key: 'description', value: study.hero.description }
    ],
    sidebar: study.sidebar,
    programme: [
      { key: 'title', value: study.programme.title },
      { key: 'description', value: study.programme.description },
      { key: 'highlights_title', value: study.programme.highlights.title }
    ],
    programme_highlights: study.programme.highlights.items.map(h => ({ highlight: h })),
    curriculum: [
      { key: 'title', value: study.curriculum.title },
      { key: 'header_1', value: study.curriculum.headers[0] },
      { key: 'header_2', value: study.curriculum.headers[1] }
    ],
    curriculum_table: study.curriculum.table,
    soil_science: [
      { key: 'title', value: study.soil_science.title },
      { key: 'description', value: study.soil_science.description }
    ],
    soil_science_tags: study.soil_science.tags.map(t => ({ tag: t })),
    facilities: [
      { key: 'title', value: study.facilities.title },
      { key: 'tour_title', value: study.facilities.tour.title },
      { key: 'tour_description', value: study.facilities.tour.description }
    ],
    facilities_items: study.facilities.items,
    support: [
      { key: 'title', value: study.support.title },
      { key: 'placement_title', value: study.support.placement.title },
      { key: 'placement_description', value: study.support.placement.description },
      { key: 'alumni_title', value: study.support.alumni.title },
      { key: 'alumni_description', value: study.support.alumni.description },
      { key: 'alumni_count', value: study.support.alumni.count }
    ],
    support_placement_items: study.support.placement.items.map(i => ({ item: i })),
    scholarship: [
      { key: 'title', value: study.scholarship.title },
      { key: 'badge', value: study.scholarship.badge },
      { key: 'description', value: study.scholarship.description },
      { key: 'cta', value: study.scholarship.cta }
    ],
    scholarship_criteria: study.scholarship.criteria
  };
  XLSX.writeFile(createWorkbook(studySheets), path.join(EXCEL_DIR, 'study.xlsx'));
  console.log('Created: study.xlsx');
} catch (e) {
  console.error('Error generating study.xlsx:', e.message);
}

// 10. admission.xlsx
try {
  const admission = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'admission.json'), 'utf8'));
  const admissionSheets = {
    hero: [
      { key: 'badge', value: admission.hero.badge },
      { key: 'title', value: admission.hero.title },
      { key: 'description', value: admission.hero.description }
    ],
    success: [
      { key: 'title', value: admission.success.title },
      { key: 'description', value: admission.success.description },
      { key: 'cta_home', value: admission.success.cta_home },
      { key: 'cta_print', value: admission.success.cta_print }
    ],
    steps: admission.steps,
    sections: [
      { key: 'personal', value: admission.sections.personal },
      { key: 'academic', value: admission.sections.academic },
      { key: 'experience', value: admission.sections.experience },
      { key: 'statement', value: admission.sections.statement }
    ],
    fields: Object.entries(admission.fields).map(([field, data]) => ({
      field,
      label: data.label,
      placeholder: data.placeholder || ''
    })),
    academic_section: [
      { key: 'add_btn', value: admission.academic_section.add_btn },
      { key: 'additional_label', value: admission.academic_section.additional.label },
      { key: 'honors_label', value: admission.academic_section.honors.label },
      { key: 'languages_title', value: admission.academic_section.languages.title },
      { key: 'languages_speak', value: admission.academic_section.languages.speak },
      { key: 'languages_read', value: admission.academic_section.languages.read },
      { key: 'languages_write', value: admission.academic_section.languages.write }
    ],
    academic_section_headers: admission.academic_section.headers.map(h => ({ header: h })),
    experience_section: [
      { key: 'employed_label', value: admission.experience_section.employed.label },
      { key: 'employed_placeholder', value: admission.experience_section.employed.placeholder },
      { key: 'orgName_label', value: admission.experience_section.orgName.label },
      { key: 'designation_label', value: admission.experience_section.designation.label },
      { key: 'period_label', value: admission.experience_section.period.label },
      { key: 'reference_label', value: admission.experience_section.reference.label },
      { key: 'responsibility_label', value: admission.experience_section.responsibility.label },
      { key: 'hobbies_label', value: admission.experience_section.hobbies.label },
      { key: 'extracurriculars_label', value: admission.experience_section.extracurriculars.label },
      { key: 'source_label', value: admission.experience_section.source.label },
      { key: 'source_placeholder', value: admission.experience_section.source.placeholder }
    ],
    statement_section: [
      { key: 'intent_label', value: admission.statement_section.intent.label },
      { key: 'intent_note', value: admission.statement_section.intent.note },
      { key: 'career_label', value: admission.statement_section.career.label },
      { key: 'career_note', value: admission.statement_section.career.note },
      { key: 'declaration_title', value: admission.statement_section.declaration.title },
      { key: 'declaration_text', value: admission.statement_section.declaration.text },
      { key: 'declaration_accept', value: admission.statement_section.declaration.accept },
      { key: 'date', value: admission.statement_section.date },
      { key: 'place', value: admission.statement_section.place }
    ],
    physical_apply: [
      { key: 'title', value: admission.physical_apply.title },
      { key: 'description', value: admission.physical_apply.description },
      { key: 'cta', value: admission.physical_apply.cta }
    ]
  };
  XLSX.writeFile(createWorkbook(admissionSheets), path.join(EXCEL_DIR, 'admission.xlsx'));
  console.log('Created: admission.xlsx');
} catch (e) {
  console.error('Error generating admission.xlsx:', e.message);
}

console.log('Done!');
