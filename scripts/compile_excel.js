import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const EXCEL_DIR = './excel_data';
const DATA_DIR = './src/data';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readKeyValue(sheet) {
  if (!sheet) return {};
  const data = XLSX.utils.sheet_to_json(sheet);
  const obj = {};
  data.forEach(row => {
    if (row.key !== undefined) {
      obj[row.key] = row.value === undefined ? '' : row.value;
    }
  });
  return obj;
}

function readFlatArray(sheet, keyName) {
  if (!sheet) return [];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data.map(row => row[keyName]).filter(val => val !== undefined);
}

function readTable(sheet) {
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet);
}

function writeJson(filename, obj) {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
  console.log(`Compiled: ${filename}`);
}

console.log('Compiling Excel workbooks into JSON files...');

// 1. home.xlsx -> home.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'home.xlsx'));
  const homeObj = {
    hero: readKeyValue(wb.Sheets['hero']),
    marquee: readFlatArray(wb.Sheets['marquee'], 'text'),
    stats: readTable(wb.Sheets['stats']).map(row => ({
      num: String(row.num !== undefined ? row.num : ''),
      label: row.label || '',
      suffix: row.suffix || ''
    })),
    sdgs: {
      ...readKeyValue(wb.Sheets['sdgs']),
      items: readTable(wb.Sheets['sdgs_items'])
    },
    academic: {
      ...readKeyValue(wb.Sheets['academic']),
      features: readFlatArray(wb.Sheets['academic_features'], 'feature')
    },
    impact: readKeyValue(wb.Sheets['impact'])
  };
  writeJson('home.json', homeObj);
} catch (e) {
  console.error('Error compiling home.xlsx:', e.message);
}

// 2. about.xlsx -> about.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'about.xlsx'));
  const bgKeys = readKeyValue(wb.Sheets['background']);
  const aboutObj = {
    hero: readKeyValue(wb.Sheets['hero']),
    sidebar: readTable(wb.Sheets['sidebar']),
    background: {
      title: bgKeys.title || '',
      quote: bgKeys.quote || '',
      vision_fr_bacher: {
        title: bgKeys.vision_title || '',
        overlay: bgKeys.vision_overlay || '',
        image: bgKeys.vision_image || '',
        text: readFlatArray(wb.Sheets['background_vision_paragraphs'], 'text')
      },
      mission: {
        title: bgKeys.mission_title || '',
        text: bgKeys.mission_text || ''
      }
    },
    leadership: {
      title: 'Leadership',
      members: readTable(wb.Sheets['leadership'])
    },
    milestones: {
      title: 'Our Journey',
      items: readTable(wb.Sheets['milestones']).map(item => ({
        year: String(item.year !== undefined ? item.year : ''),
        title: item.title || '',
        text: item.description || '' // map description back to text
      }))
    },
    legal: readKeyValue(wb.Sheets['legal'])
  };
  writeJson('about.json', aboutObj);
} catch (e) {
  console.error('Error compiling about.xlsx:', e.message);
}

// 3. contact.xlsx -> contact.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'contact.xlsx'));
  const hero = readKeyValue(wb.Sheets['hero']);
  const info = readKeyValue(wb.Sheets['info']);
  const infoItems = readTable(wb.Sheets['info_items']);
  const formKeys = readKeyValue(wb.Sheets['form']);
  const formFieldsRows = readTable(wb.Sheets['form_fields']);
  const formFields = {};
  formFieldsRows.forEach(row => {
    formFields[row.field] = {
      label: row.label || '',
      placeholder: row.placeholder || ''
    };
  });
  const formOptions = readFlatArray(wb.Sheets['form_options'], 'option');

  const contactObj = {
    hero,
    info: {
      ...info,
      items: infoItems
    },
    form: {
      title: formKeys.title || '',
      fields: formFields,
      options: formOptions,
      consent: formKeys.consent || '',
      cta: formKeys.cta || ''
    }
  };
  writeJson('contact.json', contactObj);
} catch (e) {
  console.error('Error compiling contact.xlsx:', e.message);
}

// 4. global.xlsx -> global.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'global.xlsx'));
  const footerKeys = readKeyValue(wb.Sheets['footer']);
  const footerObj = {
    description: footerKeys.description || '',
    quickLinksTitle: footerKeys.quickLinksTitle || '',
    contactTitle: footerKeys.contactTitle || '',
    address: footerKeys.address || '',
    email: footerKeys.email || '',
    phone: footerKeys.phone || '',
    newsletter: {
      placeholder: footerKeys.newsletter_placeholder || '',
      button: footerKeys.newsletter_button || ''
    },
    copyright: footerKeys.copyright || '',
    legalLinks: readTable(wb.Sheets['footer_legal'])
  };
  const compKeys = readKeyValue(wb.Sheets['components']);
  const componentsObj = {
    quickLinks: {
      defaultTitle: compKeys.quickLinks_defaultTitle || '',
      footerNote: compKeys.quickLinks_footerNote || ''
    }
  };

  const globalObj = {
    header: readKeyValue(wb.Sheets['header']),
    footer: footerObj,
    components: componentsObj
  };
  writeJson('global.json', globalObj);
} catch (e) {
  console.error('Error compiling global.xlsx:', e.message);
}

// 5. impact.xlsx -> impact.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'impact.xlsx'));
  const fvKeys = readKeyValue(wb.Sheets['field_visits']);
  const fvStats = readTable(wb.Sheets['field_visits_featured_stats']);
  const fieldVisitsObj = {
    title: fvKeys.title || '',
    badge: fvKeys.badge || '',
    map_cta: fvKeys.map_cta || '',
    map_title: fvKeys.map_title || '',
    map_description: fvKeys.map_description || '',
    featured_label: fvKeys.featured_label || '',
    featured: {
      location: fvKeys.featured_location || '',
      summary: fvKeys.featured_summary || '',
      stats: fvStats
    }
  };
  const netKeys = readKeyValue(wb.Sheets['network']);
  const networkObj = {
    title: netKeys.title || '',
    description: netKeys.description || '',
    items: readFlatArray(wb.Sheets['network_items'], 'item')
  };

  const impactObj = {
    hero: readKeyValue(wb.Sheets['hero']),
    sidebar: readTable(wb.Sheets['sidebar']),
    research: readKeyValue(wb.Sheets['research']),
    field_visits: fieldVisitsObj,
    projects: {
      title: 'Key Projects',
      cta: 'Learn More',
      items: readTable(wb.Sheets['projects'])
    },
    network: networkObj
  };
  writeJson('impact.json', impactObj);
} catch (e) {
  console.error('Error compiling impact.xlsx:', e.message);
}

// 6. mpsm.xlsx -> mpsm.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'mpsm.xlsx'));
  const genKeys = readKeyValue(wb.Sheets['general']);
  const locationObj = {
    name: genKeys.location_name || '',
    coordinates: [
      genKeys.location_lat !== undefined ? Number(genKeys.location_lat) : 0,
      genKeys.location_lng !== undefined ? Number(genKeys.location_lng) : 0
    ],
    region: genKeys.location_region || '',
    focus: genKeys.location_focus || ''
  };

  const mpsmObj = {
    id: genKeys.id || '',
    title: genKeys.title || '',
    location: locationObj,
    summary: genKeys.summary || '',
    phases: readTable(wb.Sheets['phases']).map(phase => ({
      day: Number(phase.day),
      title: phase.title || '',
      description: phase.description || ''
    })),
    outcomes: readFlatArray(wb.Sheets['outcomes'], 'outcome'),
    gallery: readTable(wb.Sheets['gallery']),
    stats: readTable(wb.Sheets['stats'])
  };
  writeJson('mpsm.json', mpsmObj);
} catch (e) {
  console.error('Error compiling mpsm.xlsx:', e.message);
}

// 7. navigation.xlsx -> navigation.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'navigation.xlsx'));
  const navRows = readTable(wb.Sheets['navigation']);
  const navItemsMap = new Map();
  navRows.forEach(row => {
    if (!navItemsMap.has(row.name)) {
      navItemsMap.set(row.name, {
        name: row.name,
        path: row.path,
        submenu: []
      });
    }
    if (row.submenu_name && row.submenu_path) {
      navItemsMap.get(row.name).submenu.push({
        name: row.submenu_name,
        path: row.submenu_path
      });
    }
  });
  const navigationObj = {
    navigation: Array.from(navItemsMap.values()).map(item => {
      const copy = { ...item };
      if (copy.submenu.length === 0) {
        delete copy.submenu;
      }
      return copy;
    })
  };
  writeJson('navigation.json', navigationObj);
} catch (e) {
  console.error('Error compiling navigation.xlsx:', e.message);
}

// 8. news.xlsx -> news.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'news.xlsx'));
  const noticesKeys = readKeyValue(wb.Sheets['notices']);
  const mediaKeys = readKeyValue(wb.Sheets['media']);
  const journalKeys = readKeyValue(wb.Sheets['journal']);

  const newsObj = {
    hero: readKeyValue(wb.Sheets['hero']),
    notices: {
      title: noticesKeys.title || '',
      cta: noticesKeys.cta || '',
      items: readTable(wb.Sheets['notices_items'])
    },
    media: {
      title: mediaKeys.title || '',
      items: readTable(wb.Sheets['media_items'])
    },
    journal: {
      title: journalKeys.title || '',
      badge: journalKeys.badge || '',
      description: journalKeys.description || '',
      cta: journalKeys.cta || '',
      entries: readTable(wb.Sheets['journal_entries'])
    }
  };
  writeJson('news.json', newsObj);
} catch (e) {
  console.error('Error compiling news.xlsx:', e.message);
}

// 9. study.xlsx -> study.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'study.xlsx'));
  const progKeys = readKeyValue(wb.Sheets['programme']);
  const progHighlights = readFlatArray(wb.Sheets['programme_highlights'], 'highlight');
  const programmeObj = {
    title: progKeys.title || '',
    description: progKeys.description || '',
    highlights: {
      title: progKeys.highlights_title || '',
      items: progHighlights
    }
  };
  
  const currKeys = readKeyValue(wb.Sheets['curriculum']);
  const curriculumObj = {
    title: currKeys.title || '',
    headers: [currKeys.header_1 || '', currKeys.header_2 || ''],
    table: readTable(wb.Sheets['curriculum_table'])
  };

  const soilSciKeys = readKeyValue(wb.Sheets['soil_science']);
  const soilSciTags = readFlatArray(wb.Sheets['soil_science_tags'], 'tag');
  const soilScienceObj = {
    title: soilSciKeys.title || '',
    description: soilSciKeys.description || '',
    tags: soilSciTags
  };

  const facKeys = readKeyValue(wb.Sheets['facilities']);
  const facilitiesObj = {
    title: facKeys.title || '',
    tour: {
      title: facKeys.tour_title || '',
      description: facKeys.tour_description || ''
    },
    items: readTable(wb.Sheets['facilities_items'])
  };

  const supKeys = readKeyValue(wb.Sheets['support']);
  const placementItems = readFlatArray(wb.Sheets['support_placement_items'], 'item');
  const supportObj = {
    title: supKeys.title || '',
    placement: {
      title: supKeys.placement_title || '',
      description: supKeys.placement_description || '',
      items: placementItems
    },
    alumni: {
      title: supKeys.alumni_title || '',
      description: supKeys.alumni_description || '',
      count: supKeys.alumni_count || ''
    }
  };

  const scholKeys = readKeyValue(wb.Sheets['scholarship']);
  const scholarshipObj = {
    title: scholKeys.title || '',
    badge: scholKeys.badge || '',
    description: scholKeys.description || '',
    cta: scholKeys.cta || '',
    criteria: readTable(wb.Sheets['scholarship_criteria'])
  };

  const studyObj = {
    hero: readKeyValue(wb.Sheets['hero']),
    sidebar: readTable(wb.Sheets['sidebar']),
    programme: programmeObj,
    curriculum: curriculumObj,
    soil_science: soilScienceObj,
    facilities: facilitiesObj,
    support: supportObj,
    scholarship: scholarshipObj
  };
  writeJson('study.json', studyObj);
} catch (e) {
  console.error('Error compiling study.xlsx:', e.message);
}

// 10. admission.xlsx -> admission.json
try {
  const wb = XLSX.readFile(path.join(EXCEL_DIR, 'admission.xlsx'));
  const hero = readKeyValue(wb.Sheets['hero']);
  const success = readKeyValue(wb.Sheets['success']);
  const steps = readTable(wb.Sheets['steps']).map(row => ({
    id: Number(row.id),
    title: row.title || ''
  }));
  const sections = readKeyValue(wb.Sheets['sections']);
  
  const fieldsRows = readTable(wb.Sheets['fields']);
  const fields = {};
  fieldsRows.forEach(row => {
    fields[row.field] = {
      label: row.label || '',
      placeholder: row.placeholder || ''
    };
  });
  
  const acadKeys = readKeyValue(wb.Sheets['academic_section']);
  const acadHeaders = readFlatArray(wb.Sheets['academic_section_headers'], 'header');
  const academic_section = {
    headers: acadHeaders,
    add_btn: acadKeys.add_btn || '',
    additional: { label: acadKeys.additional_label || '' },
    honors: { label: acadKeys.honors_label || '' },
    languages: {
      title: acadKeys.languages_title || '',
      speak: acadKeys.languages_speak || '',
      read: acadKeys.languages_read || '',
      write: acadKeys.languages_write || ''
    }
  };

  const expKeys = readKeyValue(wb.Sheets['experience_section']);
  const experience_section = {
    employed: { label: expKeys.employed_label || '', placeholder: expKeys.employed_placeholder || '' },
    orgName: { label: expKeys.orgName_label || '' },
    designation: { label: expKeys.designation_label || '' },
    period: { label: expKeys.period_label || '' },
    reference: { label: expKeys.reference_label || '' },
    responsibility: { label: expKeys.responsibility_label || '' },
    hobbies: { label: expKeys.hobbies_label || '' },
    extracurriculars: { label: expKeys.extracurriculars_label || '' },
    source: { label: expKeys.source_label || '', placeholder: expKeys.source_placeholder || '' }
  };

  const stmtKeys = readKeyValue(wb.Sheets['statement_section']);
  const statement_section = {
    intent: { label: stmtKeys.intent_label || '', note: stmtKeys.intent_note || '' },
    career: { label: stmtKeys.career_label || '', note: stmtKeys.career_note || '' },
    declaration: {
      title: stmtKeys.declaration_title || '',
      text: stmtKeys.declaration_text || '',
      accept: stmtKeys.declaration_accept || ''
    },
    date: stmtKeys.date || '',
    place: stmtKeys.place || ''
  };

  const physicalApplyKeys = readKeyValue(wb.Sheets['physical_apply']);
  const physical_apply = {
    title: physicalApplyKeys.title || '',
    description: physicalApplyKeys.description || '',
    cta: physicalApplyKeys.cta || ''
  };

  const admissionObj = {
    hero,
    success,
    steps,
    sections,
    fields,
    academic_section,
    experience_section,
    statement_section,
    physical_apply
  };
  writeJson('admission.json', admissionObj);
} catch (e) {
  console.error('Error compiling admission.xlsx:', e.message);
}

console.log('All Excel files compiled successfully.');
