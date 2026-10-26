/* ==========================================================================
   js/data.js  -  SAMPLE DATA (fake gigs, fake workers, fake reviews)
   --------------------------------------------------------------------------
   EVERYTHING IN THIS FILE IS MADE UP, so you can see how the site will look.
   Every item has  sample: true  and the site shows a "Sample data" badge.
   The "verified" status exists ONLY on sample workers below. Real
   verification will come in a later step, with a real service.

   HOW TO ADD A GIG: copy one gig block (from { to }), paste it after a
   comma, and change the words and numbers. Texts are written in 3 languages:
   en = English, ru = Russian, uz = Uzbek.
   - city: "any" means an online gig that appears in every city search.
   - mode: "online" or "inperson".
   - unit: "fixed" (one price for the job) or "hour" (price per hour).
   - days: how many days the job takes (use 2 or more).
   - posted: date written as year-month-day, used to sort newest first.
   Keep the quotation marks and the commas.
   ========================================================================== */
(function () {
  'use strict';

  var IO = window.InAndOut = window.InAndOut || {};
  var D = IO.data = {};

  D.categories = [
    { id: 'design',   icon: '🎨' },
    { id: 'cleaning', icon: '🧹' },
    { id: 'tutoring', icon: '📚' },
    { id: 'repair',   icon: '🔧' },
    { id: 'writing',  icon: '✍️' },
    { id: 'delivery', icon: '🛵' },
    { id: 'photo',    icon: '📷' },
    { id: 'it',       icon: '💻' }
  ];

  D.cities = [
    { id: 'tashkent' },
    { id: 'samarkand' },
    { id: 'bukhara' },
    { id: 'andijan' },
    { id: 'namangan' },
    { id: 'fergana' }
  ];

  /* Language names are shown in their own language, in every site language. */
  D.languageNames = { en: 'English', ru: 'Русский', uz: 'O‘zbekcha' };

  /* ----- SAMPLE WORKERS (status is one of: none, pending, verified, rejected) ----- */
  D.workers = [
    {
      id: 'w1', sample: true, name: 'Dilnoza Karimova', city: 'tashkent',
      skills: ['design'], languages: ['uz', 'ru', 'en'],
      status: 'verified', rating: 4.9, jobs: 34,
      bio: {
        en: "Graphic designer with 5 years of experience. I like clean, simple designs for small businesses.",
        ru: "Графический дизайнер с опытом 5 лет. Люблю чистый и простой дизайн для малого бизнеса.",
        uz: "5 yillik tajribaga ega grafik dizayner. Kichik bizneslar uchun toza va oddiy dizaynlarni yaxshi ko‘raman."
      }
    },
    {
      id: 'w2', sample: true, name: 'Aziz Rakhimov', city: 'samarkand',
      skills: ['tutoring'], languages: ['uz', 'ru', 'en'],
      status: 'pending', rating: 4.7, jobs: 18,
      bio: {
        en: "English teacher. Friendly lessons for beginners and for people who want to speak with confidence.",
        ru: "Преподаватель английского. Дружелюбные уроки для начинающих и для тех, кто хочет говорить уверенно.",
        uz: "Ingliz tili o‘qituvchisi. Boshlovchilar va ravon gapirishni istaganlar uchun do‘stona darslar."
      }
    },
    {
      id: 'w3', sample: true, name: 'Malika Yusupova', city: 'tashkent',
      skills: ['cleaning'], languages: ['uz', 'ru'],
      status: 'none', rating: null, jobs: 0,
      bio: {
        en: "Careful and punctual home cleaning. I bring my own cleaning products.",
        ru: "Аккуратная и пунктуальная уборка домов. Свои чистящие средства привожу с собой.",
        uz: "Puxta va o‘z vaqtida uy tozalash. Tozalash vositalarini o‘zim olib kelaman."
      }
    },
    {
      id: 'w4', sample: true, name: 'Jasur Tursunov', city: 'bukhara',
      skills: ['repair'], languages: ['uz', 'ru'],
      status: 'rejected', rating: null, jobs: 0,
      bio: {
        en: "Handyman for small home repairs: taps, shelves, doors and furniture.",
        ru: "Мастер на все руки для мелкого ремонта: краны, полки, двери и мебель.",
        uz: "Uydagi mayda ta’mirlar ustasi: jo‘mraklar, javonlar, eshiklar va mebel."
      }
    },
    {
      id: 'w5', sample: true, name: 'Sevara Abdullaeva', city: 'tashkent',
      skills: ['photo'], languages: ['uz', 'ru', 'en'],
      status: 'verified', rating: 4.8, jobs: 52,
      bio: {
        en: "Photographer and video editor. Natural light portraits and short videos for social media.",
        ru: "Фотограф и видеомонтажёр. Портреты при естественном свете и короткие видео для соцсетей.",
        uz: "Fotograf va video montajchi. Tabiiy yorug‘likda portretlar va ijtimoiy tarmoqlar uchun qisqa videolar."
      }
    },
    {
      id: 'w6', sample: true, name: 'Bekzod Nazarov', city: 'andijan',
      skills: ['it'], languages: ['uz', 'ru', 'en'],
      status: 'none', rating: null, jobs: 0,
      bio: {
        en: "Web developer. I build simple, fast websites for small shops and services.",
        ru: "Веб-разработчик. Делаю простые и быстрые сайты для небольших магазинов и сервисов.",
        uz: "Veb dasturchi. Kichik do‘konlar va xizmatlar uchun oddiy va tez saytlar yarataman."
      }
    }
  ];

  /* ----- SAMPLE GIGS ----- */
  D.gigs = [
    {
      id: 'g1', sample: true, workerId: 'w1', category: 'design', mode: 'online', city: 'any',
      price: 150000, unit: 'fixed', days: 5, posted: '2026-10-20',
      title: {
        en: "Logo design for a small business",
        ru: "Дизайн логотипа для малого бизнеса",
        uz: "Kichik biznes uchun logotip dizayni"
      },
      desc: {
        en: "A clean, simple logo with two rounds of changes.",
        ru: "Чистый и простой логотип с двумя правками.",
        uz: "Toza va oddiy logotip, ikki marta o‘zgartirish bilan."
      }
    },
    {
      id: 'g2', sample: true, workerId: 'w1', category: 'design', mode: 'online', city: 'any',
      price: 200000, unit: 'fixed', days: 4, posted: '2026-10-18',
      title: {
        en: "10 social media post designs",
        ru: "10 дизайнов постов для соцсетей",
        uz: "Ijtimoiy tarmoqlar uchun 10 ta post dizayni"
      },
      desc: {
        en: "A set of matching designs in your colors and style.",
        ru: "Набор согласованных дизайнов в ваших цветах и стиле.",
        uz: "Sizning ranglaringiz va uslubingizdagi uyg‘un dizaynlar to‘plami."
      }
    },
    {
      id: 'g3', sample: true, workerId: 'w2', category: 'tutoring', mode: 'online', city: 'any',
      price: 80000, unit: 'hour', days: 2, posted: '2026-10-22',
      title: {
        en: "English conversation lesson, 1 hour",
        ru: "Урок разговорного английского, 1 час",
        uz: "Ingliz tilida suhbat darsi, 1 soat"
      },
      desc: {
        en: "Practice speaking by video call in a relaxed way.",
        ru: "Практика разговорной речи по видеосвязи в спокойной обстановке.",
        uz: "Video aloqada erkin muhitda gapirish mashqi."
      }
    },
    {
      id: 'g4', sample: true, workerId: 'w2', category: 'tutoring', mode: 'inperson', city: 'samarkand',
      price: 100000, unit: 'hour', days: 3, posted: '2026-10-15',
      title: {
        en: "IELTS speaking practice",
        ru: "Практика устной части IELTS",
        uz: "IELTS speaking mashqi"
      },
      desc: {
        en: "Mock interviews and tips to raise your speaking score.",
        ru: "Пробные собеседования и советы, чтобы повысить балл за устную часть.",
        uz: "Gapirish balini oshirish uchun sinov suhbatlari va maslahatlar."
      }
    },
    {
      id: 'g5', sample: true, workerId: 'w3', category: 'cleaning', mode: 'inperson', city: 'tashkent',
      price: 120000, unit: 'fixed', days: 2, posted: '2026-10-21',
      title: {
        en: "Apartment cleaning, 3 hours",
        ru: "Уборка квартиры, 3 часа",
        uz: "Kvartira tozalash, 3 soat"
      },
      desc: {
        en: "Floors, dust, bathroom and kitchen. Cleaning products included.",
        ru: "Полы, пыль, ванная и кухня. Чистящие средства включены.",
        uz: "Pollar, chang, hammom va oshxona. Tozalash vositalari kiritilgan."
      }
    },
    {
      id: 'g6', sample: true, workerId: 'w3', category: 'cleaning', mode: 'inperson', city: 'tashkent',
      price: 90000, unit: 'fixed', days: 3, posted: '2026-10-12',
      title: {
        en: "Deep kitchen cleaning",
        ru: "Генеральная уборка кухни",
        uz: "Oshxonani chuqur tozalash"
      },
      desc: {
        en: "Oven, fridge, cupboards and surfaces cleaned carefully.",
        ru: "Тщательная чистка духовки, холодильника, шкафов и поверхностей.",
        uz: "Duxovka, muzlatgich, shkaflar va sirtlar sinchiklab tozalanadi."
      }
    },
    {
      id: 'g7', sample: true, workerId: 'w4', category: 'repair', mode: 'inperson', city: 'bukhara',
      price: 70000, unit: 'fixed', days: 2, posted: '2026-10-19',
      title: {
        en: "Fix a leaking tap",
        ru: "Ремонт протекающего крана",
        uz: "Oqayotgan jo‘mrakni tuzatish"
      },
      desc: {
        en: "Small plumbing jobs at home. Simple parts included.",
        ru: "Мелкие сантехнические работы дома. Простые детали включены.",
        uz: "Uyda mayda santexnika ishlari. Oddiy ehtiyot qismlar kiritilgan."
      }
    },
    {
      id: 'g8', sample: true, workerId: 'w4', category: 'repair', mode: 'inperson', city: 'bukhara',
      price: 50000, unit: 'hour', days: 3, posted: '2026-10-10',
      title: {
        en: "Furniture assembly",
        ru: "Сборка мебели",
        uz: "Mebel yig‘ish"
      },
      desc: {
        en: "Wardrobes, beds, shelves and tables assembled with care.",
        ru: "Аккуратная сборка шкафов, кроватей, полок и столов.",
        uz: "Shkaf, karavot, javon va stollarni puxta yig‘ish."
      }
    },
    {
      id: 'g9', sample: true, workerId: 'w5', category: 'photo', mode: 'inperson', city: 'tashkent',
      price: 250000, unit: 'fixed', days: 5, posted: '2026-10-23',
      title: {
        en: "Portrait photo session, 1 hour",
        ru: "Портретная фотосессия, 1 час",
        uz: "Portret fotosessiyasi, 1 soat"
      },
      desc: {
        en: "Natural light photos. You get 20 edited pictures.",
        ru: "Фото при естественном свете. Вы получите 20 обработанных снимков.",
        uz: "Tabiiy yorug‘likda suratlar. Siz 20 ta tahrirlangan surat olasiz."
      }
    },
    {
      id: 'g10', sample: true, workerId: 'w5', category: 'photo', mode: 'online', city: 'any',
      price: 180000, unit: 'fixed', days: 4, posted: '2026-10-17',
      title: {
        en: "Short video editing for social media",
        ru: "Монтаж короткого видео для соцсетей",
        uz: "Ijtimoiy tarmoqlar uchun qisqa video montaji"
      },
      desc: {
        en: "Cuts, music and text for a video up to 1 minute.",
        ru: "Нарезка, музыка и текст для видео до 1 минуты.",
        uz: "1 daqiqagacha video uchun kesish, musiqa va matn."
      }
    },
    {
      id: 'g11', sample: true, workerId: 'w6', category: 'it', mode: 'online', city: 'any',
      price: 600000, unit: 'fixed', days: 10, posted: '2026-10-24',
      title: {
        en: "Simple one-page website",
        ru: "Простой сайт из одной страницы",
        uz: "Bir sahifali oddiy sayt"
      },
      desc: {
        en: "A fast website that works well on phones.",
        ru: "Быстрый сайт, который хорошо работает на телефонах.",
        uz: "Telefonlarda yaxshi ishlaydigan tez sayt."
      }
    },
    {
      id: 'g12', sample: true, workerId: 'w6', category: 'it', mode: 'online', city: 'any',
      price: 70000, unit: 'hour', days: 3, posted: '2026-10-14',
      title: {
        en: "Fix small problems on your website",
        ru: "Исправление небольших проблем на вашем сайте",
        uz: "Saytingizdagi mayda muammolarni tuzatish"
      },
      desc: {
        en: "Broken links, slow pages and small changes.",
        ru: "Битые ссылки, медленные страницы и небольшие правки.",
        uz: "Buzilgan havolalar, sekin sahifalar va mayda o‘zgarishlar."
      }
    }
  ];

  /* ----- SAMPLE REVIEWS (workers w3, w4 and w6 have none on purpose) ----- */
  D.reviews = [
    {
      id: 'r1', sample: true, workerId: 'w1', author: 'Nargiza A.', rating: 5,
      text: {
        en: "Fast and friendly. The logo looks exactly how I imagined.",
        ru: "Быстро и дружелюбно. Логотип получился именно таким, как я представляла.",
        uz: "Tez va xushmuomala. Logotip men tasavvur qilganday chiqdi."
      }
    },
    {
      id: 'r2', sample: true, workerId: 'w1', author: 'Timur S.', rating: 5,
      text: {
        en: "Clear communication and two good ideas to choose from.",
        ru: "Понятное общение и два хороших варианта на выбор.",
        uz: "Aniq muloqot va tanlash uchun ikkita yaxshi g‘oya."
      }
    },
    {
      id: 'r3', sample: true, workerId: 'w2', author: 'Madina R.', rating: 4,
      text: {
        en: "Patient teacher. My speaking is much better after four lessons.",
        ru: "Терпеливый преподаватель. После четырёх уроков я говорю заметно лучше.",
        uz: "Sabrli o‘qituvchi. To‘rt darsdan keyin gapirishim ancha yaxshilandi."
      }
    },
    {
      id: 'r4', sample: true, workerId: 'w5', author: 'Zarina K.', rating: 5,
      text: {
        en: "Relaxed session and beautiful photos. Delivered on time.",
        ru: "Спокойная съёмка и красивые фото. Сдано вовремя.",
        uz: "Erkin fotosessiya va chiroyli suratlar. O‘z vaqtida topshirildi."
      }
    }
  ];

  /* ----- Helpers (they never crash: when nothing is found they return null or an empty list) ----- */
  function findById(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) { return list[i]; }
    }
    return null;
  }

  D.getGig = function (id) { return findById(D.gigs, id); };
  D.getWorker = function (id) { return findById(D.workers, id); };

  D.gigsOfWorker = function (workerId) {
    var out = [];
    for (var i = 0; i < D.gigs.length; i++) {
      if (D.gigs[i].workerId === workerId) { out.push(D.gigs[i]); }
    }
    return out;
  };

  D.reviewsOfWorker = function (workerId) {
    var out = [];
    for (var i = 0; i < D.reviews.length; i++) {
      if (D.reviews[i].workerId === workerId) { out.push(D.reviews[i]); }
    }
    return out;
  };

  /* "Dilnoza Karimova" -> "DK" (letters shown in the round avatar) */
  D.initials = function (name) {
    var parts = String(name || '').split(' ');
    var letters = '';
    for (var i = 0; i < parts.length && letters.length < 2; i++) {
      if (parts[i]) { letters += parts[i].charAt(0).toUpperCase(); }
    }
    return letters || '?';
  };

  /* 150000 -> "150 000 UZS" (or "сум" / "so‘m" in other languages) */
  IO.formatPrice = function (amount) {
    var n = Number(amount);
    if (!isFinite(n)) { return '-'; }
    var digits = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    return digits + '\u00A0' + IO.t('common.currency');
  };
})();