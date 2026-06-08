import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  User,
  Users,
  Wallet,
} from 'lucide-react'
import './App.css'

const onboardingSteps = ['Базові дані', 'Інтереси', 'Фільтри', 'Верифікація']

const interestOptions = [
  "Б'юті",
  'Творчість',
  'Психологія',
  'Бізнес',
  'Нетворкінг',
  'Кава',
  'Йога',
  'Активний відпочинок',
  'Настільні ігри',
  'Пари',
]

const formatOptions = [
  'Тільки для дівчат',
  'Пари & Мікс',
  'Бізнес / Нетворкінг',
  'Активний відпочинок',
]

const categories = [
  'Усі',
  "Б'юті",
  'Творчість',
  'Психологія',
  'Бізнес',
  'Активний відпочинок',
  'Пари',
]

const events = [
  {
    id: 1,
    title: 'Кава & знайомства для дівчат',
    category: "Б'юті",
    date: '8 червня',
    time: '18:30',
    place: 'Центр Харкова',
    price: '350 грн',
    format: 'Тільки для дівчат',
    spots: 8,
    description:
      'Легка зустріч для нових знайомств, розмов про життя, красу та плани на літо.',
  },
  {
    id: 2,
    title: 'Настільні ігри для пар і друзів',
    category: 'Пари',
    date: '10 червня',
    time: '19:00',
    place: 'Площа Конституції',
    price: '500 грн',
    format: 'Пари & Мікс',
    spots: 12,
    description:
      'Невимушений вечір з іграми, знайомствами та командними активностями.',
  },
  {
    id: 3,
    title: 'Бізнес-сніданок: знайомства та нетворкінг',
    category: 'Бізнес',
    date: '12 червня',
    time: '10:00',
    place: 'Коворкінг, Харків',
    price: '700 грн',
    format: 'Мікс',
    spots: 15,
    description:
      'Зустріч для підприємців, маркетологів, фрилансерів та тих, хто шукає корисні контакти.',
  },
  {
    id: 4,
    title: 'Пікнік-знайомство в парку',
    category: 'Активний відпочинок',
    date: '15 червня',
    time: '16:00',
    place: 'Парк Горького',
    price: '300 грн',
    format: 'Пари & Мікс',
    spots: 20,
    description:
      'Активна зустріч на свіжому повітрі з легкими іграми та знайомствами.',
  },
]

const friends = [
  {
    id: 1,
    name: 'Марина',
    age: 29,
    interests: 'кава, психологія, йога',
    distance: '1.2 км',
    status: 'Готова зустрітись сьогодні',
  },
  {
    id: 2,
    name: 'Олена',
    age: 34,
    interests: 'бізнес, прогулянки, кіно',
    distance: '2.4 км',
    status: 'Шукає компанію на каву',
  },
  {
    id: 3,
    name: 'Ірина',
    age: 27,
    interests: "творчість, виставки, б'юті",
    distance: '3.1 км',
    status: 'Вільна після 18:00',
  },
]

function AppHeader() {
  return (
    <div className="app-header">
      <div>
        <p>Telegram WebApp</p>
        <h1>СВОЇ Харків</h1>
      </div>
      <div className="logo-circle">С</div>
    </div>
  )
}

function OnboardingScreen({ setScreen }) {
  const [step, setStep] = useState(0)

  const [form, setForm] = useState({
    name: '',
    age: '',
    city: 'Харків',
    searchAgeFrom: '25',
    searchAgeTo: '38',
    verification: 'Instagram',
    interests: [],
    formats: [],
  })

  const toggleArrayValue = (field, value) => {
    setForm((prev) => {
      const exists = prev[field].includes(value)

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      }
    })
  }

  const nextStep = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1)
    } else {
      setScreen('home')
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="screen">
      <div>
        <p className="muted">Реєстрація</p>
        <h2>Створи профіль у «СВОЇ»</h2>
        <p className="description">
          Ці дані потрібні для безпечного підбору людей, подій і закритих
          розділів.
        </p>
      </div>

      <div className="steps">
        {onboardingSteps.map((item, index) => (
          <div key={item} className="step-item">
            <div className={index <= step ? 'step-line active' : 'step-line'} />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <div className="card">
        {step === 0 && (
          <div className="form-block">
            <InputField
              label="Ім'я"
              value={form.name}
              placeholder="Наприклад, Анна"
              onChange={(value) => setForm({ ...form, name: value })}
            />

            <InputField
              label="Реальний вік"
              value={form.age}
              placeholder="Наприклад, 32"
              type="number"
              onChange={(value) => setForm({ ...form, age: value })}
            />

            <p className="hint">
              Вік потрібен для безпеки та модерації. Його видимість можна буде
              налаштувати.
            </p>

            <InputField
              label="Місто"
              value={form.city}
              onChange={(value) => setForm({ ...form, city: value })}
            />
          </div>
        )}

        {step === 1 && (
          <div className="form-block">
            <h3>Обери інтереси</h3>
            <p className="description">
              За ними система буде пропонувати людей і події.
            </p>

            <div className="chips">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleArrayValue('interests', interest)}
                  className={
                    form.interests.includes(interest) ? 'chip active' : 'chip'
                  }
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-block">
            <h3>Кого хочеш бачити?</h3>
            <p className="description">
              Це гнучкий фільтр. Він не зобов'язаний збігатися з твоїм віком.
            </p>

            <div className="two-cols">
              <InputField
                label="Вік від"
                value={form.searchAgeFrom}
                type="number"
                onChange={(value) =>
                  setForm({ ...form, searchAgeFrom: value })
                }
              />

              <InputField
                label="Вік до"
                value={form.searchAgeTo}
                type="number"
                onChange={(value) => setForm({ ...form, searchAgeTo: value })}
              />
            </div>

            <h4>Формати</h4>

            <div className="list-buttons">
              {formatOptions.map((format) => (
                <button
                  key={format}
                  onClick={() => toggleArrayValue('formats', format)}
                  className={
                    form.formats.includes(format)
                      ? 'list-button active'
                      : 'list-button'
                  }
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-block">
            <h3>Верифікація профілю</h3>
            <p className="description">
              Після перевірки відкриється доступ до подій, радара та закритих
              розділів.
            </p>

            <div className="two-cols">
              {['Instagram', 'Відео'].map((method) => (
                <button
                  key={method}
                  onClick={() => setForm({ ...form, verification: method })}
                  className={
                    form.verification === method
                      ? 'verify-button active'
                      : 'verify-button'
                  }
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="preview-box">
              <p>
                <strong>Попередній перегляд заявки</strong>
              </p>
              <p>Ім'я: {form.name || 'не вказано'}</p>
              <p>Вік: {form.age || 'не вказано'}</p>
              <p>Місто: {form.city}</p>
              <p>
                Пошук: {form.searchAgeFrom}–{form.searchAgeTo}
              </p>
              <p>
                Інтереси:{' '}
                {form.interests.length ? form.interests.join(', ') : 'не обрано'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="two-cols">
        <button className="secondary-button" onClick={prevStep} disabled={step === 0}>
          Назад
        </button>
        <button className="primary-button" onClick={nextStep}>
          {step === onboardingSteps.length - 1 ? 'Надіслати заявку' : 'Далі'}
        </button>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, placeholder = '', type = 'text' }) {
  return (
    <label className="input-field">
      <span>{label}</span>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function HomeScreen({ setScreen }) {
  return (
    <div className="screen">
      <div className="hero-card">
        <div className="hero-top">
          <div>
            <p>Локальне ком'юніті</p>
            <h2>Знайди своїх людей у Харкові</h2>
            <span>
              Події, знайомства, жіночий простір, пари, нетворкінг і зустрічі
              на каву.
            </span>
          </div>
          <Sparkles />
        </div>

        <button className="white-button" onClick={() => setScreen('events')}>
          Переглянути афішу
        </button>
      </div>

      <div className="feature-grid">
        <FeatureCard
          icon={<Heart />}
          title="Тільки для дівчат"
          text="Закриті зустрічі, б'юті, психологія, творчість."
          onClick={() => setScreen('girls')}
        />

        <FeatureCard
          icon={<Users />}
          title="Пари & Мікс"
          text="Квести, ігри, пікніки, спільні івенти."
          onClick={() => setScreen('mix')}
        />

        <FeatureCard
          icon={<CalendarDays />}
          title="Афіша"
          text="Календар подій із записом та квитками."
          onClick={() => setScreen('events')}
        />

        <FeatureCard
          icon={<MapPin />}
          title="Радар подруг"
          text="Пошук людей поруч для швидкої зустрічі."
          onClick={() => setScreen('radar')}
        />
      </div>

      <div className="card safety-card">
        <ShieldCheck />
        <div>
          <h3>Безпечний формат</h3>
          <p>
            Особисті контакти приховані. Анкети проходять модерацію перед
            доступом до ком'юніті.
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, text, onClick }) {
  return (
    <button className="feature-card" onClick={onClick}>
      <div className="icon-box">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </button>
  )
}

function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState('Усі')

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'Усі') return events
    return events.filter((event) => event.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="screen">
      <div>
        <h2>Афіша подій</h2>
        <p className="description">
          Обирай подію, бронюй місце або купуй квиток.
        </p>
      </div>

      <div className="category-scroll">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category ? 'category active' : 'category'
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="cards-list">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <div className="card event-card">
      <div className="event-head">
        <div>
          <span className="tag">{event.format}</span>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>

        <div className="event-price">
          <strong>{event.price}</strong>
          <span>{event.spots} місць</span>
        </div>
      </div>

      <div className="event-meta">
        <div>
          <CalendarDays />
          {event.date}, {event.time}
        </div>

        <div>
          <MapPin />
          {event.place}
        </div>
      </div>

      <div className="two-cols">
        <button className="secondary-button">Детальніше</button>
        <button className="primary-button">
          <Ticket size={16} />
          Записатись
        </button>
      </div>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="screen">
      <div>
        <h2>Профіль</h2>
        <p className="description">
          Тут користувач керує анкетою, віком, інтересами та видимістю.
        </p>
      </div>

      <div className="card">
        <div className="profile-head">
          <div className="avatar">А</div>
          <div>
            <h3>Анна, 32</h3>
            <p>Харків · профіль на модерації</p>
          </div>
        </div>

        <div className="info-grid">
          <InfoBox label="Вік для пошуку" value="25–38" />
          <InfoBox label="Формат" value="Дівчата / Мікс" />
          <InfoBox label="Інтереси" value="Б'юті, кава, бізнес" />
          <InfoBox label="Видимість" value="Тільки верифіковані" />
        </div>

        <button className="primary-button full">Редагувати анкету</button>
      </div>

      <div className="card">
        <h3>Верифікація</h3>
        <p className="description">
          Для доступу до закритих розділів потрібно підтвердити особистість
          через Instagram або коротке відео.
        </p>

        <div className="two-cols">
          <button className="secondary-button">Instagram</button>
          <button className="secondary-button">Відео</button>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ label, value }) {
  return (
    <div className="info-box">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

function GirlsScreen() {
  return (
    <SectionScreen
      icon={<Heart />}
      title="Тільки для дівчат"
      subtitle="Закритий простір для знайомств, підтримки, б'юті-подій, майстер-класів та психології."
      items={[
        "Б'юті-сніданки",
        'Майстер-класи',
        'Психологічні зустрічі',
        'Жіночий нетворкінг',
      ]}
    />
  )
}

function MixScreen() {
  return (
    <SectionScreen
      icon={<Users />}
      title="Пари & Мікс"
      subtitle="Події для пар, друзів і змішаних компаній: квести, настільні ігри, прогулянки, пікніки."
      items={['Настільні ігри', 'Квести', 'Пікніки', 'Вечори знайомств']}
    />
  )
}

function SectionScreen({ icon, title, subtitle, items }) {
  return (
    <div className="screen">
      <div className="section-banner">
        <div className="section-icon">{icon}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="cards-list">
        {items.map((item) => (
          <div key={item} className="card list-card">
            <div>
              <h3>{item}</h3>
              <p>Скоро буде доступно в афіші.</p>
            </div>

            <button className="secondary-button small">Дивитись</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadarScreen() {
  return (
    <div className="screen">
      <div>
        <h2>Радар подруг</h2>
        <p className="description">
          У реальному проєкті цей блок має працювати тільки після верифікації та
          дозволу на геолокацію.
        </p>
      </div>

      <div className="card safety-card">
        <Search />
        <div>
          <h3>Пошук поруч</h3>
          <p>Показує тільки верифікованих користувачів у Харкові.</p>
        </div>
      </div>

      <div className="cards-list">
        {friends.map((friend) => (
          <div key={friend.id} className="card friend-card">
            <div className="event-head">
              <div>
                <h3>
                  {friend.name}, {friend.age}
                </h3>
                <p>{friend.interests}</p>
                <strong>{friend.status}</strong>
              </div>

              <span className="tag">{friend.distance}</span>
            </div>

            <button className="primary-button full">
              <MessageCircle size={16} />
              Запросити на каву
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TicketsScreen() {
  return (
    <div className="screen">
      <div>
        <h2>Мої записи</h2>
        <p className="description">
          Тут будуть бронювання, квитки та історія подій.
        </p>
      </div>

      <div className="card empty-card">
        <Wallet />
        <h3>Поки немає квитків</h3>
        <p>Оберіть подію в афіші та забронюйте місце.</p>
      </div>
    </div>
  )
}

function BottomNav({ screen, setScreen }) {
  const items = [
    { key: 'onboarding', label: 'Старт', icon: ShieldCheck },
    { key: 'home', label: 'Головна', icon: Sparkles },
    { key: 'events', label: 'Афіша', icon: CalendarDays },
    { key: 'radar', label: 'Радар', icon: MapPin },
    { key: 'tickets', label: 'Квитки', icon: Ticket },
    { key: 'profile', label: 'Профіль', icon: User },
  ]

  return (
    <div className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon
        const active = screen === item.key

        return (
          <button
            key={item.key}
            onClick={() => setScreen(item.key)}
            className={active ? 'nav-item active' : 'nav-item'}
          >
            <Icon size={17} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('onboarding')

  const tg = window.Telegram?.WebApp
  tg?.ready()
  tg?.expand()

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen setScreen={setScreen} />
      case 'home':
        return <HomeScreen setScreen={setScreen} />
      case 'events':
        return <EventsScreen />
      case 'profile':
        return <ProfileScreen />
      case 'girls':
        return <GirlsScreen />
      case 'mix':
        return <MixScreen />
      case 'radar':
        return <RadarScreen />
      case 'tickets':
        return <TicketsScreen />
      default:
        return <HomeScreen setScreen={setScreen} />
    }
  }

  return (
    <div className="app-bg">
      <div className="phone-shell">
        <AppHeader />
        <main>{renderScreen()}</main>
        <BottomNav screen={screen} setScreen={setScreen} />
      </div>
    </div>
  )
}