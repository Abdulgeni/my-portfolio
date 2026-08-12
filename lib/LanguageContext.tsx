'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'am' | 'tr' | 'om';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', dir: 'ltr', flag: '🇪🇹' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  { code: 'om', name: 'Afan Oromo', nativeName: 'Afaan Oromoo', dir: 'ltr', flag: '🇪🇹' },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ai_interface': 'AI Interface',
    'nav.architecture': 'Architecture',
    'nav.health': 'System Health',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.open_for_work': 'Open for Remote Work',

    // Hero
    'hero.system_status': 'SYSTEM ACTIVE • AI & FULL STACK ARCHITECT',
    'hero.greeting': "Hello, I'm",
    'hero.name': 'Abdulgeni Abdulaziz',
    'hero.role': 'Full Stack AI Engineer',
    'hero.subtext':
      'Architecting Production RAG Pipelines, Autonomous Multi-Agent Workflows, and High-Throughput Web Applications.',
    'hero.view_projects': 'Explore Case Studies',
    'hero.get_in_touch': 'Get in Touch',
    'hero.terminal_heading': 'NEURAL INFRASTRUCTURE ENGINE',

    // AIAssistant
    'ai.tag': 'AI AGENT INTERFACE',
    'ai.title': 'Neural Assistant',
    'ai.subtitle': 'Ask my interactive agent about RAG pipelines, agent workflows, or remote roles.',
    'ai.placeholder': 'Ask about RAG pipelines, production stack, or project metrics...',
    'ai.send': 'Execute Query',
    'ai.suggested': 'Suggested Queries:',

    // Skill Cloud
    'skill.tag': 'INTERACTIVE STACK VISUALIZER',
    'skill.title': '3D Skill Matrix',
    'skill.filter': 'Filter:',
    'skill.auto_orbit': 'Auto Orbit',
    'skill.paused': 'Paused',
    'skill.drag_hint': 'Drag to rotate sphere • Click node to filter projects',
    'skill.matching_architectures': 'Matching Architectures:',
    'skill.reset_filter': 'Reset Filter',

    // Projects
    'projects.tag': 'PRODUCTION CASE STUDIES',
    'projects.title': 'Commercial AI & Full-Stack Systems',
    'projects.subtitle': 'Engineered with strict SLA bounds, vector retrieval pipelines, and responsive client interfaces.',
    'projects.all': 'ALL',
    'projects.ai_rag': 'AI / RAG',
    'projects.full_stack': 'FULL STACK',
    'projects.systems': 'SYSTEMS & AUTOMATION',
    'projects.search_placeholder': 'Search stack, title...',
    'projects.showing': 'SHOWING',
    'projects.of': 'OF',
    'projects.commercial_systems': 'COMMERCIAL SYSTEMS',
    'projects.reset_all': 'Reset All Filters',
    'projects.view_code': 'GitHub Code',
    'projects.live_demo': 'Live System',

    // Experience
    'exp.tag': 'ENGINEERING LOG',
    'exp.title': 'Career & Architectural Evolution',
    'exp.subtitle': 'Building scalable cloud backends, intelligent agents, and high-frequency web platforms.',

    // Testimonials
    'testimonials.tag': 'CLIENT FEEDBACK',
    'testimonials.title': 'Testimonials & System Impact',
    'testimonials.subtitle': 'Direct feedback from engineering leaders and product teams who deployed these AI and full-stack solutions.',
    'testimonials.verified_client': 'VERIFIED CLIENT',
    'testimonials.impact': 'IMPACT METRIC',

    // Contact
    'contact.tag': 'COMMUNICATION LINK',
    'contact.title': 'Let\'s Build Something Exceptional',
    'contact.subtitle': 'Available for remote contract engineering, technical AI consulting, and architectural reviews.',
    'contact.name_label': 'Your Name',
    'contact.email_label': 'Your Email',
    'contact.message_label': 'Project Outline / Inquiry',
    'contact.submit': 'Send Message',
    'contact.sending': 'Dispatching...',
    'contact.success': 'Message Sent Successfully!',

    // Newsletter
    'newsletter.title': 'Case Study Dispatches',
    'newsletter.subtitle': 'Subscribe to receive technical breakdowns on production RAG, agent workflows, & system benchmarks.',
    'newsletter.placeholder': 'Enter engineer@domain.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Connecting...',
    'newsletter.subscribed': 'Subscribed to Dispatches!',
    'newsletter.frequency': 'Zero spam • 1-2 technical case studies per month',
  },

  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.ai_interface': 'واجهة الذكاء الاصطناعي',
    'nav.architecture': 'الهندسة المعمارية',
    'nav.health': 'حالة النظام',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرة العملياتية',
    'nav.contact': 'التواصل',
    'nav.open_for_work': 'متاح للعمل عن بُعد',

    // Hero
    'hero.system_status': 'النظام نشط • مهندس الذكاء الاصطناعي وتطبيقات الويب',
    'hero.greeting': 'مرحباً، أنا',
    'hero.name': 'عبد الغني عبد العزيز',
    'hero.role': 'مهندس برمجيات وذكاء اصطناعي متكامل',
    'hero.subtext': 'بناء أنظمة استرجاع المعلومات RAG، وكلاء الذكاء الاصطناعي المستقلين، وتطبيقات الويب فائقة الأداء.',
    'hero.view_projects': 'استكشف المشاريع',
    'hero.get_in_touch': 'تواصل معي',
    'hero.terminal_heading': 'مُحرك البنية التحتية العصبية',

    // AIAssistant
    'ai.tag': 'واجهة وكيل الذكاء الاصطناعي',
    'ai.title': 'المساعد العصبي التفاعلي',
    'ai.subtitle': 'اسأل المساعد الذكي عن مشاريع RAG، وكلاء البرمجة، أو فرس العمل عن بعد.',
    'ai.placeholder': 'اسأل عن مشاريع الذكاء الاصطناعي، تقنيات البرمجة، أو الخبرات...',
    'ai.send': 'إرسال الاستفسار',
    'ai.suggested': 'أسئلة مقترحة:',

    // Skill Cloud
    'skill.tag': 'ع Read المهارات التفاعلي',
    'skill.title': 'مصفوفة المهارات ثلاثية الأبعاد',
    'skill.filter': 'تصفية:',
    'skill.auto_orbit': 'دوران تلقائي',
    'skill.paused': 'متوقف مؤقتاً',
    'skill.drag_hint': 'اسحب لتدوير الكرة • انقر على أي عقدة لتصفية المشاريع',
    'skill.matching_architectures': 'المشاريع المطابقة:',
    'skill.reset_filter': 'إعادة ضبط التصفية',

    // Projects
    'projects.tag': 'دراسات حالة إنتاجية',
    'projects.title': 'أنظمة الذكاء الاصطناعي والتطبيقات الكاملة',
    'projects.subtitle': 'مصممة بآليات استرجاع موجهة وقواعد أداء صارمة مع واجهات مستخدم متجاوبة.',
    'projects.all': 'الكل',
    'projects.ai_rag': 'الذكاء الاصطناعي / RAG',
    'projects.full_stack': 'التطبيقات الكاملة',
    'projects.systems': 'الأنظمة والأتمتة',
    'projects.search_placeholder': 'البحث في التقنيات والعناوين...',
    'projects.showing': 'عرض',
    'projects.of': 'من',
    'projects.commercial_systems': 'أنظمة تجارية',
    'projects.reset_all': 'إعادة ضبط كافة الفلاتر',
    'projects.view_code': 'رمز GitHub',
    'projects.live_demo': 'النظام المباشر',

    // Experience
    'exp.tag': 'سجل الهندسة',
    'exp.title': 'التطور المهني والمعماري',
    'exp.subtitle': 'بناء خوادم سحابية قابلة للتوسع، وكلاء أذكياء، ومناصات ويب سريعة.',

    // Testimonials
    'testimonials.tag': 'آراء العملاء',
    'testimonials.title': 'توصيات العملاء والأثر التشغيلي',
    'testimonials.subtitle': 'تقييمات مباشرة من قادة الهندسة وفرق المنتجات الذين استخدموا حلول الذكاء الاصطناعي.',
    'testimonials.verified_client': 'عميل معتمد',
    'testimonials.impact': 'مؤشر الأثر',

    // Contact
    'contact.tag': 'رابط الاتصال',
    'contact.title': 'لنقم ببناء شيء استثنائي معاً',
    'contact.subtitle': 'متاح للتعاقد الهندسي عن بُعد، الاستشارات التقنية في الذكاء الاصطناعي، ومراجعة البنية التحتية.',
    'contact.name_label': 'الاسم الكريم',
    'contact.email_label': 'البريد الإلكتروني',
    'contact.message_label': 'ملخص المشروع / الاستفسار',
    'contact.submit': 'إرسال الرسالة',
    'contact.sending': 'جاري الإرسال...',
    'contact.success': 'تم إرسال الرسالة بنجاح!',

    // Newsletter
    'newsletter.title': 'نشرات دراسات الحالة',
    'newsletter.subtitle': 'اشترك لتلقي تحليلات تقنية حول أنظمة RAG، وكلاء الذكاء الاصطناعي، وتقارير الأداء.',
    'newsletter.placeholder': 'أدخل engineer@domain.com',
    'newsletter.subscribe': 'اشتراك',
    'newsletter.subscribing': 'جاري الاتصال...',
    'newsletter.subscribed': 'تم الاشتراك في النشرة!',
    'newsletter.frequency': 'بدون رسائل مزعجة • ١-٢ دراسة حالة شهرياً',
  },

  am: {
    // Navigation
    'nav.home': 'መነሻ',
    'nav.ai_interface': 'የኤአይ ኢንተርፌስ',
    'nav.architecture': 'አርክቴክቸር',
    'nav.health': 'የሲስተም ጤንነት',
    'nav.projects': 'ፕሮጀክቶች',
    'nav.experience': 'የሥራ ልምድ',
    'nav.contact': 'ግንኙነት',
    'nav.open_for_work': 'ለሩቅ ሥራ ዝግጁ',

    // Hero
    'hero.system_status': 'ሲስተም ንቁ ነው • የኤአይ እና ፉል ስታክ ኢንጅነር',
    'hero.greeting': 'ሰላም፣ እኔ',
    'hero.name': 'አብዱልገኒ አብዱልአዚዝ',
    'hero.role': 'ፉል ስታክ ኤአይ ኢንጂነር',
    'hero.subtext': 'የRAG ሲስተሞች፣ የኤአይ ኤጀንት አውቶሜሽኖች እና ፈጣን የዌብ አፕሊኬሽኖች ግንባታ።',
    'hero.view_projects': 'ፕሮጀክቶችን ይመልከቱ',
    'hero.get_in_touch': 'ይገናኙን',
    'hero.terminal_heading': 'የነርቭ መሠረተ ልማት ኢንጂን',

    // AIAssistant
    'ai.tag': 'የኤአይ ኤጀንት ኢንተርፌስ',
    'ai.title': 'የነርቭ ረዳት',
    'ai.subtitle': 'ስለ RAG ፕሮጀክቶች፣ የኤአይ ኤጀንቶች እና የሥራ ልምዴ ረዳቱን ይጠይቁ።',
    'ai.placeholder': 'ስለ ኤአይ ፕሮጀክቶች፣ ቴክኖሎጂዎች ወይም የሥራ እድሎች ይጠይቁ...',
    'ai.send': 'ጥያቄ ላክ',
    'ai.suggested': 'የተመረጡ ጥያቄዎች:',

    // Skill Cloud
    'skill.tag': 'የክህሎት ማሳያ',
    'skill.title': '3D የክህሎት ማትሪክስ',
    'skill.filter': 'ማጣሪያ:',
    'skill.auto_orbit': 'ራስ-ሰር ዙረት',
    'skill.paused': 'ቆሟል',
    'skill.drag_hint': 'ሉሉን ለማዞር ይጎትቱ • ፕሮጀክቶችን ለማጣራት ኖድ ላይ ይጫኑ',
    'skill.matching_architectures': 'ተዛማጅ ፕሮጀክቶች:',
    'skill.reset_filter': 'ማጣሪያውን መልስ',

    // Projects
    'projects.tag': 'የተሰሩ ፕሮጀክቶች',
    'projects.title': 'የኤአይ እና ፉል-ስታክ ሲስተሞች',
    'projects.subtitle': 'በከፍተኛ ጥራት እና ፍጥነት የተገነቡ ፕሮጀክቶች።',
    'projects.all': 'ሁሉም',
    'projects.ai_rag': 'ኤአይ / RAG',
    'projects.full_stack': 'ፉል ስታክ',
    'projects.systems': 'ሲስተምስ እና አውቶሜሽን',
    'projects.search_placeholder': 'ቴክኖሎጂ ወይም ርዕስ ፈልግ...',
    'projects.showing': 'በማሳየት ላይ',
    'projects.of': 'ከ',
    'projects.commercial_systems': 'ፕሮጀክቶች',
    'projects.reset_all': 'ሁሉንም ማጣሪያዎች መልስ',
    'projects.view_code': 'GitHub ኮድ',
    'projects.live_demo': 'ቀጥታ ሲስተም',

    // Experience
    'exp.tag': 'የኢንጂነሪንግ ታሪክ',
    'exp.title': 'የሥራ እና አርክቴክቸር እድገት',
    'exp.subtitle': 'የደመና ሲስተሞች፣ አስተዋይ ኤጀንቶች እና ፈጣን ዌብ ሳይቶች ግንባታ።',

    // Testimonials
    'testimonials.tag': 'የደንበኞች አስተያየት',
    'testimonials.title': 'የደንበኞች ምስክርነት እና ተፅዕኖ',
    'testimonials.subtitle': 'የኤአይ እና ፉል-ስታክ ሲስተሞችን ከተጠቀሙ መሪዎች የተሰጠ አስተያየት።',
    'testimonials.verified_client': 'የተረጋገጠ ደንበኛ',
    'testimonials.impact': 'የተፅዕኖ መለኪያ',

    // Contact
    'contact.tag': 'የግንኙነት መስመር',
    'contact.title': 'አብረን ድንቅ ነገር እንገንባ',
    'contact.subtitle': 'ለሩቅ የኮንትራት ሥራዎች፣ የኤአይ አማካሪነት እና አርክቴክቸር ክለሳ ዝግጁ ነኝ።',
    'contact.name_label': 'ስምዎ',
    'contact.email_label': 'ኢሜይልዎ',
    'contact.message_label': 'የፕሮጀክት ዝርዝር / ጥያቄ',
    'contact.submit': 'መልእክት ላክ',
    'contact.sending': 'በመላክ ላይ...',
    'contact.success': 'መልእክትዎ በተሳካ ሁኔታ ተልኳል!',

    // Newsletter
    'newsletter.title': 'የፕሮጀክት ትንተና መጽሔት',
    'newsletter.subtitle': 'ስለ RAG ሲስተሞች እና ኤአይ አውቶሜሽኖች ቴክኒካል ትንተና ለማግኘት ይመዝገቡ።',
    'newsletter.placeholder': 'engineer@domain.com ያስገቡ',
    'newsletter.subscribe': 'ተመዝገብ',
    'newsletter.subscribing': 'በመገናኘት ላይ...',
    'newsletter.subscribed': 'በተሳካ ሁኔታ ተመዝግበዋል!',
    'newsletter.frequency': 'አላስፈላጊ መልእክት የለም • በወር 1-2 ቴክኒካል ትንተናዎች',
  },

  tr: {
    // Navigation
    'nav.home': 'Anasayfa',
    'nav.ai_interface': 'Yapay Zeka Arayüzü',
    'nav.architecture': 'Mimariler',
    'nav.health': 'Sistem Sağlığı',
    'nav.projects': 'Projeler',
    'nav.experience': 'Deneyim',
    'nav.contact': 'İletişim',
    'nav.open_for_work': 'Uzaktan Çalışmaya Açık',

    // Hero
    'hero.system_status': 'SİSTEM AKTİF • YAPAY ZEKA VE FULL STACK MİMARI',
    'hero.greeting': 'Merhaba, Ben',
    'hero.name': 'Abdulgeni Abdulaziz',
    'hero.role': 'Full Stack Yapay Zeka Mühendisi',
    'hero.subtext':
      'Üretim Seviyesinde RAG Hatları, Otonom Çoklu Ajan İş Akışları ve Yüksek Performanslı Web Uygulamaları Tasarımı.',
    'hero.view_projects': 'Projeleri İncele',
    'hero.get_in_touch': 'İletişime Geç',
    'hero.terminal_heading': 'NÖRAL ALTYAPI MOTORU',

    // AIAssistant
    'ai.tag': 'YAPAY ZEKA AJAN ARAYÜZÜ',
    'ai.title': 'Nöral Asistan',
    'ai.subtitle': 'Etkileşimli ajanıma RAG hatları, otonom süreçler veya uzaktan çalışma durumum hakkında sorular sorun.',
    'ai.placeholder': 'RAG hatları, üretim teknolojileri veya proje metrikleri hakkında sorun...',
    'ai.send': 'Sorguyu Çalıştır',
    'ai.suggested': 'Önerilen Sorgular:',

    // Skill Cloud
    'skill.tag': 'ETKİLEŞİMLİ TEKNOLOJİ GÖRSELLEŞTİRİCİ',
    'skill.title': '3D Yetenek Matrisi',
    'skill.filter': 'Filtre:',
    'skill.auto_orbit': 'Otomatik Dönüş',
    'skill.paused': 'Duraklatıldı',
    'skill.drag_hint': 'Küreyi döndürmek için sürükleyin • Projeleri filtrelemek için düğüme tıklayın',
    'skill.matching_architectures': 'Eşleşen Mimariler:',
    'skill.reset_filter': 'Filtreyi Sıfırla',

    // Projects
    'projects.tag': 'ÜRETİM VAKA ÇALIŞMALARI',
    'projects.title': 'Ticari Yapay Zeka ve Full-Stack Sistemler',
    'projects.subtitle': 'Sıkı SLA sınırları, vektör erişim hatları ve duyarlı kullanıcı arayüzleri ile mühendislik tasarımı.',
    'projects.all': 'TÜMÜ',
    'projects.ai_rag': 'YAPAY ZEKA / RAG',
    'projects.full_stack': 'FULL STACK',
    'projects.systems': 'SİSTEMLER VE OTOMASYON',
    'projects.search_placeholder': 'Teknoloji veya başlık ara...',
    'projects.showing': 'GÖSTERİLEN',
    'projects.of': '/',
    'projects.commercial_systems': 'TİCARİ SİSTEM',
    'projects.reset_all': 'Tüm Filtreleri Sıfırla',
    'projects.view_code': 'GitHub Kodu',
    'projects.live_demo': 'Canlı Sistem',

    // Experience
    'exp.tag': 'MÜHENDİSLİK GÜNLÜĞÜ',
    'exp.title': 'Kariyer ve Mimari Gelişim',
    'exp.subtitle': 'Ölçeklenebilir bulut arka yüzleri, akıllı ajanlar ve yüksek hızlı web platformları oluşturma.',

    // Testimonials
    'testimonials.tag': 'MÜŞTERİ GERİ BİLDİRİMİ',
    'testimonials.title': 'Referanslar ve Sistem Etkisi',
    'testimonials.subtitle': 'Yapay zeka ve full-stack çözümlerini yayına alan mühendislik liderlerinin doğrudan geri bildirimleri.',
    'testimonials.verified_client': 'ONAYLI MÜŞTERİ',
    'testimonials.impact': 'ETKİ METRİĞİ',

    // Contact
    'contact.tag': 'İLETİŞİM BAĞLANTISI',
    'contact.title': 'Birlikte Olağanüstü Bir Şey İnşa Edelim',
    'contact.subtitle': 'Uzaktan sözleşmeli mühendislik, teknik yapay zeka danışmanlığı ve mimari incelemeler için uygundur.',
    'contact.name_label': 'Adınız',
    'contact.email_label': 'E-posta Adresiniz',
    'contact.message_label': 'Proje Özeti / Sorgu',
    'contact.submit': 'Mesaj Gönder',
    'contact.sending': 'Gönderiliyor...',
    'contact.success': 'Mesaj Başarıyla Gönderildi!',

    // Newsletter
    'newsletter.title': 'Vaka Çalışması Bülteni',
    'newsletter.subtitle': 'Üretim RAG mimarileri, ajan iş akışları ve sistem testleri hakkında teknik analizler almak için kaydolun.',
    'newsletter.placeholder': 'E-posta adresiniz',
    'newsletter.subscribe': 'Abone Ol',
    'newsletter.subscribing': 'Bağlanılıyor...',
    'newsletter.subscribed': 'Bültene Abone Olundu!',
    'newsletter.frequency': 'Spam yok • Ayda 1-2 teknik vaka analizi',
  },

  om: {
    // Navigation
    'nav.home': 'Fuula Duraa',
    'nav.ai_interface': 'Interfeesii AI',
    'nav.architecture': 'Arkitestructure',
    'nav.health': 'Fayyaa Systemii',
    'nav.projects': 'Pirojektoota',
    'nav.experience': 'Muuxannoo',
    'nav.contact': 'Qunnamtii',
    'nav.open_for_work': 'Hojii Fageenyaaf Qophii',

    // Hero
    'hero.system_status': 'SYSTEMIC HOJJACHAA JIRA • INJINERA AI & FULL STACK',
    'hero.greeting': 'Akkam, Anis',
    'hero.name': 'Abdulgeni Abdulaziz',
    'hero.role': 'Injinera Full Stack AI',
    'hero.subtext':
      'Sistemoota RAG, Hojiiwwan Ofisaa Ajanoota AI, fi Yuunita Web Saffisa Ol-aanaa Uumuu.',
    'hero.view_projects': 'Pirojektoota Ilaali',
    'hero.get_in_touch': 'Nu Qunnamaa',
    'hero.terminal_heading': 'INJINII INFRASTIRAKCHARA NEURAL',

    // AIAssistant
    'ai.tag': 'INTERFEESII AJANTA AI',
    'ai.title': 'Gargaaraa Neural',
    'ai.subtitle': 'Sistemoota RAG, hojiiwwan ajantaa fi carraawwan hojii fageenyaa gargaaraa keenya gaafadhaa.',
    'ai.placeholder': 'Pirojektoota AI, teeknoolojii, ykn muuxannoo hojii gaafadhaa...',
    'ai.send': 'Gaaffii Ergi',
    'ai.suggested': 'Gaaffiiwwan Yaadaa:',

    // Skill Cloud
    'skill.tag': 'AGARSIISA DANDETTII INTERACTIVE',
    'skill.title': 'Matrix Dandettii 3D',
    'skill.filter': 'Cingii:',
    'skill.auto_orbit': "Naanna'a Ofisaa",
    'skill.paused': 'Dhaabbateera',
    'skill.drag_hint': 'Goollii naannessuuf harkisaa • Pirojektoota gingilchuuf node tuqaa',
    'skill.matching_architectures': 'Pirojektoota Waggasoo:',
    'skill.reset_filter': 'Gingilchaa Deebisi',

    // Projects
    'projects.tag': 'QORANNOOWWAN HOJII',
    'projects.title': 'Sistemoota Daldalaa AI & Full-Stack',
    'projects.subtitle': 'Saffisaa fi qulqullina ol-aanaadhaan kan ijaaraman pirojektoota.',
    'projects.all': 'HUDUNDA',
    'projects.ai_rag': 'AI / RAG',
    'projects.full_stack': 'FULL STACK',
    'projects.systems': 'SISTEMOOTA & AUTOMATION',
    'projects.search_placeholder': 'Teeknoolojii ykn mata-duree barbaadi...',
    'projects.showing': 'AGARSIISA',
    'projects.of': 'KAN',
    'projects.commercial_systems': 'PIROJEKTOOTA DALDALAA',
    'projects.reset_all': 'Gingilchaa Hundumaa Deebisi',
    'projects.view_code': 'Koodii GitHub',
    'projects.live_demo': 'Sistema Kallattii',

    // Experience
    'exp.tag': 'GALMEE INJINERINAGI',
    'exp.title': 'Guddataa Muuxannoo fi Arkitestructure',
    'exp.subtitle': 'Sistemoota duuba cloud, ajanoota sammuu fi platfoormii web saffisaa ijaaruu.',

    // Testimonials
    'testimonials.tag': 'YAADA MAAMILOOTAA',
    'testimonials.title': 'Ragaa Maamiltootaa fi Madaallii',
    'testimonials.subtitle': 'Yaada kallattii hoogganoota teeknoolojii fi gareewwan sistema AI fayyadaman irraa.',
    'testimonials.verified_client': 'MAAMILA MIRKANAAYE',
    'testimonials.impact': 'SAFARTUU DHIISAA',

    // Contact
    'contact.tag': 'HIDHATA QUNNAMTII',
    'contact.title': 'Wanti Addaa Wajjin Haa Ijaarru',
    'contact.subtitle': 'Hojiiwwan waliigaltee fageenyaa, gorsa teeknikaa AI fi koodii madaaluuf qophiidha.',
    'contact.name_label': 'Maqaa Keessan',
    'contact.email_label': 'Imeelii Keessan',
    'contact.message_label': 'Ibsa Pirojektii / Gaaffii',
    'contact.submit': 'Ergaa Ergi',
    'contact.sending': 'Ergamaa Jira...',
    'contact.success': "Ergaan Milkaa'inaandhaan Ergameera!",

    // Newsletter
    'newsletter.title': 'Ergaa Qorannoo Case Study',
    'newsletter.subtitle': 'Madaallii teeknikaa RAG, hojiiwwan ajantaa fi safartuu sistemaaf galmeessaa.',
    'newsletter.placeholder': 'Imeelii galeessaa',
    'newsletter.subscribe': 'Galmeessi',
    'newsletter.subscribing': 'Qunnamtiidhaan...',
    'newsletter.subscribed': 'Milkaa\'inaan Galmeessitan!',
    'newsletter.frequency': "Spam hin jiru • Ji'aan Qorannoo 1-2",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string, fallback?: string) => string;
  currentLanguageInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang') as Language;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
    }
    return 'en';
  });

  const currentLanguageInfo = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const dir = currentLanguageInfo.dir;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    }
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      localStorage.setItem('portfolio_lang', lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t, currentLanguageInfo }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
