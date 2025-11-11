import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [season, setSeason] = useState('summer');
  const [budget, setBudget] = useState(5000);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [plannerData, setPlannerData] = useState({
    days: 7,
    travelers: 1,
    interests: [],
    budget: 5000,
    region: 'all'
  });

  // Данные о достопримечательностях Сибири
  const attractions = [
    {
      id: 1,
      name: "Озеро Байкал",
      region: "buriatia",
      type: "nature",
      description: "Самое глубокое и чистое озеро в мире, объект Всемирного наследия ЮНЕСКО. Вода настолько прозрачна, что дно видно на 40 метрах!",
      image: "https://travel-baikal.com/upload/resize_cache/iblock/3a0/1600_920_2/3a0ff42fc244f9bd609ddac6592cd8ef.jpg",
      coordinates: { lat: 53.2833, lng: 107.7833 },
      highlights: ["Ледовые гроты", "Кругобайкальская железная дорога", "Остров Ольхон"],
      summer: { price: 2000, tourists: "high", bestTime: "Июль-Август", activities: ["Кемпинг", "Рыбалка", "Каякинг"] },
      winter: { price: 2500, tourists: "medium", bestTime: "Февраль-Март", activities: ["Подлёдная рыбалка", "Хождение по льду", "Фотосафари"] },
      spring: { price: 1500, tourists: "low", bestTime: "Май-Июнь", activities: ["Наблюдение за птицами", "Трекинг"] },
      autumn: { price: 1800, tourists: "medium", bestTime: "Сентябрь", activities: ["Фотография", "Сбор ягод"] }
    },
    {
      id: 2,
      name: "Ленские столбы",
      region: "yakutia",
      type: "nature",
      description: "Грандиозные каменные столбы высотой до 100 метров вдоль реки Лены. Объект Всемирного наследия ЮНЕСКО.",
      image: "https://2spalnika.ru/wp-content/uploads/2022/12/zakat-reka-lena-stolbi-800x600.png",
      coordinates: { lat: 61.1048, lng: 127.3346 },
      highlights: ["Речные круизы", "Скальные образования", "Древние окаменелости", "Фотосафари"],
      summer: { price: 3500, tourists: "medium", bestTime: "Июнь-Август", activities: ["Речной круиз", "Трекинг", "Фотография", "Кемпинг"] },
      winter: { price: 4200, tourists: "low", bestTime: "Февраль-Март", activities: ["Снегоходы", "Зимняя рыбалка", "Северное сияние"] },
      spring: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      autumn: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] }
    },
    {
      id: 3,
      name: "Восточные Саяны",
      region: "sayan",
      type: "mountains",
      description: "Величественные горные хребты с альпийскими лугами, водопадами и уникальной флорой. Рай для альпинистов и треккеров.",
      image: "https://www.climbing.ru/media/pic_middle/6/19321.jpg",
      coordinates: { lat: 52.6556, lng: 98.5833 },
      highlights: ["Пик Мунку-Сардык", "Долина вулканов", "Минеральные источники"],
      summer: { price: 3500, tourists: "medium", bestTime: "Июль-Август", activities: ["Альпинизм", "Треккинг", "Рафтинг"] },
      winter: { price: 4000, tourists: "low", bestTime: "Январь-Февраль", activities: ["Хели-ски", "Снегоходы", "Лыжные походы"] },
      spring: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      autumn: { price: 3000, tourists: "low", bestTime: "Сентябрь", activities: ["Фотография", "Сбор грибов"] }
    },
    {
      id: 4,
      name: "Иволгинский дацан",
      region: "buriatia",
      type: "culture",
      description: "Духовная столица российского буддизма. Здесь хранится нетленное тело Хамбо-ламы Итигэлова.",
      image: "https://ivolgdatsan.ru/assets/images/header-main-bg.jpg",
      coordinates: { lat: 51.7510, lng: 107.2100 },
      highlights: ["Храм-дворец", "Нетленное тело ламы", "Буддийские церемонии"],
      summer: { price: 500, tourists: "high", bestTime: "Круглый год", activities: ["Экскурсии", "Медитация", "Участие в церемониях"] },
      winter: { price: 500, tourists: "medium", bestTime: "Круглый год", activities: ["Экскурсии", "Новогодние церемонии"] },
      spring: { price: 500, tourists: "medium", bestTime: "Круглый год", activities: ["Экскурсии", "Праздник Весны"] },
      autumn: { price: 500, tourists: "medium", bestTime: "Круглый год", activities: ["Экскурсии", "Фестивали"] }
    },
    {
      id: 5,
      name: "Тункинская долина",
      region: "buriatia",
      type: "nature",
      description: "Живописная долина между Хамар-Дабаном и Восточными Саянами, известная целебными источниками.",
      image: "https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/7d80d364-c546-4a77-9e4d-f722e5c7b137/-/format/webp/-/quality/smart_retina/-/stretch/off/-/resize/900x/",
      coordinates: { lat: 51.5000, lng: 102.5000 },
      highlights: ["Аршанские источники", "Пик Любви", "Жемчужный водопад"],
      summer: { price: 1200, tourists: "medium", bestTime: "Июнь-Сентябрь", activities: ["Лечение водами", "Треккинг", "Конные прогулки"] },
      winter: { price: 1000, tourists: "low", bestTime: "Декабрь-Февраль", activities: ["Лыжные прогулки", "Купание в источниках"] },
      spring: { price: 800, tourists: "low", bestTime: "Апрель-Май", activities: ["Фотография", "Отдых"] },
      autumn: { price: 900, tourists: "low", bestTime: "Сентябрь-Октябрь", activities: ["Сбор трав", "Отдых"] }
    },
    {
      id: 6,
      name: "Гора Белуха",
      region: "altai",
      type: "mountains",
      description: "Самая высокая точка Сибири (4506 м). Священная гора для местных народов и центр альпинизма.",
      image: "https://club-voshod.com/files/materials/453/group_cf/altayskaya_gora_beluha_velichestvennaya_i_nepovtorimaya_3_1.jpg",
      coordinates: { lat: 49.8067, lng: 86.5897 },
      highlights: ["Альпинистские маршруты", "Ледники", "Аккемское озеро", "Древние петроглифы"],
      summer: { price: 4200, tourists: "medium", bestTime: "Июль-Август", activities: ["Альпинизм", "Треккинг", "Рафтинг", "Фотография"] },
      winter: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      spring: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      autumn: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] }
    },
    {
      id: 7,
      name: "Долина Царей Тувы",
      region: "tuva",
      type: "history",
      description: "Древние курганы скифских царей, где были найдены уникальные золотые артефакты.",
      image: "https://minio.nplus1.ru/app-images/694469/f7ece189386ea56871288c4fe02eae7d.jpg",
      coordinates: { lat: 51.4333, lng: 93.7167 },
      highlights: ["Скифские курганы", "Золотые артефакты", "Степные пейзажи", "Археологические памятники"],
      summer: { price: 1500, tourists: "low", bestTime: "Июнь-Август", activities: ["Экскурсии", "Археологические туры", "Фотография"] },
      winter: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      spring: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] },
      autumn: { price: 0, tourists: "none", bestTime: "Не доступно", activities: [] }
    }
  ];

  const regions = [
    { id: 'all', name: 'Все регионы', emoji: '🗺️' },
    { id: 'yakutia', name: 'Якутия', emoji: '❄️' },
    { id: 'buriatia', name: 'Бурятия', emoji: '🏞️' },
    { id: 'novosibirsk', name: 'Новосибирск', emoji: '🏛️' },
    { id: 'tuva', name: 'Тува', emoji: '🐎' },
    { id: 'altai', name: 'Алтай', emoji: '⛰️' }
  ];

  const seasons = [
    { id: 'summer', name: 'Лето', emoji: '☀️', color: '#f39c12' },
    { id: 'winter', name: 'Зима', emoji: '❄️', color: '#3498db' },
    { id: 'spring', name: 'Весна', emoji: '🌷', color: '#2ecc71' },
    { id: 'autumn', name: 'Осень', emoji: '🍂', color: '#e67e22' }
  ];

  const types = [
    { id: 'all', name: 'Все типы', emoji: '🌟' },
    { id: 'nature', name: 'Природа', emoji: '🏞️' },
    { id: 'culture', name: 'Культура', emoji: '🏛️' },
    { id: 'history', name: 'История', emoji: '🏺' },
    { id: 'mountains', name: 'Горы', emoji: '⛰️' },
    { id: 'extreme', name: 'Экстрим', emoji: '🎯' }
  ];

  const interests = [
    { id: 'adventure', name: 'Приключения', emoji: '🧗' },
    { id: 'culture', name: 'Культура', emoji: '🎭' },
    { id: 'nature', name: 'Природа', emoji: '🌲' },
    { id: 'photography', name: 'Фотография', emoji: '📸' },
    { id: 'extreme', name: 'Экстрим', emoji: '⚡' },
    { id: 'relax', name: 'Отдых', emoji: '😌' }
  ];

  const [selectedType, setSelectedType] = useState('all');

  // Фильтрация достопримечательностей
  const filteredAttractions = attractions.filter(attr => {
    const regionMatch = selectedRegion === 'all' || attr.region === selectedRegion;
    const typeMatch = selectedType === 'all' || attr.type === selectedType;
    const budgetMatch = attr[season].price <= budget || attr[season].price === 0;
    return regionMatch && typeMatch && budgetMatch;
  });

  const openModal = (attraction) => {
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAttraction(null);
  };

  const openPlanner = () => {
    setIsPlannerOpen(true);
  };

  const closePlanner = () => {
    setIsPlannerOpen(false);
  };

  const handlePlannerChange = (field, value) => {
    setPlannerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleInterest = (interestId) => {
    setPlannerData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateTravelPlan = () => {
    // Фильтруем достопримечательности по выбранным параметрам
    const suitableAttractions = attractions.filter(attr => {
      const regionMatch = plannerData.region === 'all' || attr.region === plannerData.region;
      const budgetMatch = attr[season].price <= plannerData.budget || attr[season].price === 0;
      const interestMatch = plannerData.interests.length === 0 || 
        plannerData.interests.some(interest => {
          if (interest === 'adventure') return ['mountains', 'extreme', 'nature'].includes(attr.type);
          if (interest === 'culture') return ['culture', 'history'].includes(attr.type);
          if (interest === 'nature') return attr.type === 'nature';
          if (interest === 'photography') return true; // все места подходят для фото
          if (interest === 'extreme') return attr.type === 'extreme';
          if (interest === 'relax') return ['nature', 'culture'].includes(attr.type);
          return true;
        });
      
      return regionMatch && budgetMatch && interestMatch;
    });

    // Сортируем по цене и выбираем топ для маршрута
    const recommendedPlaces = suitableAttractions
      .sort((a, b) => b[season].price - a[season].price)
      .slice(0, Math.min(plannerData.days / 2, 5));

    return recommendedPlaces;
  };

  const calculateTotalCost = (plan) => {
    return plan.reduce((total, attraction) => total + attraction[season].price, 0);
  };

  const [travelPlan, setTravelPlan] = useState([]);

  useEffect(() => {
    if (isPlannerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isPlannerOpen]);

  const getTouristsText = (level) => {
    const levels = {
      'high': { text: 'Много туристов', color: '#e74c3c' },
      'medium': { text: 'Умеренно', color: '#f39c12' },
      'low': { text: 'Мало туристов', color: '#27ae60' },
      'none': { text: 'Практически нет', color: '#95a5a6' }
    };
    return levels[level] || levels.medium;
  };

  return (
    <>
      {/* Hero Section с параллакс-эффектом */}
      <header className="hero" style={{ backgroundImage: 'url(https://media.rsrv.me/img.php?rst=9179&pid=85723&v=1920x1080&webp=1)' }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Сибирь: Земля легенд</h1>
            <p>Откройте магию Байкала, величие Саян и духовность Бурятии</p>
            <div className="hero-stats">
              <div className="stat">10+ Уникальных мест</div>
              <div className="stat">4 Сезона приключений</div>
              <div className="stat">100% Незабываемых эмоций</div>
            </div>
            <button 
              className="cta-button"
              onClick={() => document.querySelector('.filters').scrollIntoView({behavior: 'smooth'})}
            >
              Найти своё приключение
            </button>
          </div>
        </div>
      </header>

      {/* Интерактивные фильтры */}
      <section className="filters">
        <div className="filter-section">
          <h3>🗺️ Выберите направление</h3>
          <div className="filter-buttons">
            {regions.map(region => (
              <button
                key={region.id}
                className={`filter-btn ${selectedRegion === region.id ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <span className="emoji">{region.emoji}</span>
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>🎯 Тип отдыха</h3>
          <div className="filter-buttons">
            {types.map(type => (
              <button
                key={type.id}
                className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <span className="emoji">{type.emoji}</span>
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>📅 Сезон путешествия</h3>
          <div className="season-cards">
            {seasons.map(s => (
              <div
                key={s.id}
                className={`season-card ${season === s.id ? 'active' : ''}`}
                style={{ borderColor: s.color }}
                onClick={() => setSeason(s.id)}
              >
                <div className="season-emoji">{s.emoji}</div>
                <div className="season-name">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>💰 Бюджет на билеты: до {budget} ₽</h3>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="budget-slider"
          />
          <div className="budget-labels">
            <span>0 ₽</span>
            <span>2500 ₽</span>
            <span>5000 ₽</span>
          </div>
        </div>
      </section>

      {/* Счетчик найденных мест */}
      <div className="results-counter">
        Найдено {filteredAttractions.length} мест для путешествия
      </div>

      {/* Сетка достопримечательностей */}
      <section className="attractions-grid">
        {filteredAttractions.map(attraction => {
          const seasonInfo = attraction[season];
          const touristsInfo = getTouristsText(seasonInfo.tourists);
          
          return (
            <div 
              key={attraction.id} 
              className="attraction-card"
              onClick={() => openModal(attraction)}
            >
              <div className="card-image">
                <img src={attraction.image} alt={attraction.name} />
                <div className="card-badge">{attraction.type === 'nature' ? '🏞️' : attraction.type === 'culture' ? '🕌' : '⛰️'}</div>
                <div className="card-overlay">
                  <h3>{attraction.name}</h3>
                  <div className="card-region">{regions.find(r => r.id === attraction.region)?.name}</div>
                </div>
              </div>
              
              <div className="card-content">
                <p className="description">{attraction.description}</p>
                
                <div className="season-pricing">
                  <div className="price">
                    {seasonInfo.price > 0 ? `от ${seasonInfo.price} ₽` : 'Не в сезон'}
                  </div>
                  <div 
                    className="tourists"
                    style={{ color: touristsInfo.color }}
                  >
                    {touristsInfo.text}
                  </div>
                </div>

                <div className="activities">
                  {seasonInfo.activities.slice(0, 2).map((activity, index) => (
                    <span key={index} className="activity-tag">{activity}</span>
                  ))}
                  {seasonInfo.activities.length > 2 && (
                    <span className="activity-tag">+{seasonInfo.activities.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Модальное окно с детальной информацией */}
      {isModalOpen && selectedAttraction && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <img src={selectedAttraction.image} alt={selectedAttraction.name} />
              <div className="modal-title">
                <h2>{selectedAttraction.name}</h2>
                <div className="modal-subtitle">
                  {regions.find(r => r.id === selectedAttraction.region)?.name} • 
                  {selectedAttraction.type === 'nature' ? ' Природа' : 
                   selectedAttraction.type === 'culture' ? ' Культура' : ' Горы'}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>📖 Описание</h3>
                <p>{selectedAttraction.description}</p>
              </div>

              <div className="modal-section">
                <h3>⭐ Особенности</h3>
                <div className="highlights">
                  {selectedAttraction.highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">• {highlight}</div>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>🎯 Сезонная информация</h3>
                <div className="season-details">
                  <div className="detail-item">
                    <span>Лучшее время:</span>
                    <strong>{selectedAttraction[season].bestTime}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Стоимость:</span>
                    <strong>{selectedAttraction[season].price > 0 ? `${selectedAttraction[season].price} ₽` : 'Не доступно'}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Туристы:</span>
                    <span style={{ color: getTouristsText(selectedAttraction[season].tourists).color }}>
                      {getTouristsText(selectedAttraction[season].tourists).text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>🎪 Активности</h3>
                <div className="activities-grid">
                  {selectedAttraction[season].activities.map((activity, index) => (
                    <div key={index} className="activity-card">{activity}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="book-btn">Забронировать тур</button>
              <button className="share-btn">Поделиться</button>
            </div>
          </div>
        </div>
      )}

      {/* Призыв к действию */}
<section className="inspiration-section">
  <div className="inspiration-content">
    <h2>Готовы к магии Сибири?</h2>
    <p>Байкал, Саяны и древняя культура Бурятии ждут вас. Это путешествие изменит ваше представление о России.</p>
    <div className="inspiration-stats">
      <div className="inspiration-stat">
        <div className="number">99%</div>
        <div className="label">туристов рекомендуют</div>
      </div>
      <div className="inspiration-stat">
        <div className="number">#1</div>
        <div className="label">в рейтинге National Geographic</div>
      </div>
      <div className="inspiration-stat">
        <div className="number">24/7</div>
        <div className="label">поддержка гидов</div>
      </div>
    </div>
    <button 
      className="inspiration-cta"
      onClick={openPlanner}
    >
      Начать планирование
    </button>
  </div>
</section>

      {/* Модальное окно планировщика */}
      {isPlannerOpen && (
        <div className="modal-overlay" onClick={closePlanner}>
          <div className="planner-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closePlanner}>×</button>
            
            <div className="planner-header">
              <h2>🗓️ Планировщик путешествия по Сибири</h2>
              <p>Создайте идеальный маршрут по вашим предпочтениям</p>
            </div>

            <div className="planner-body">
              <div className="planner-section">
                <h3>👥 Количество путешественников</h3>
                <div className="travelers-selector">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      className={`traveler-btn ${plannerData.travelers === num ? 'active' : ''}`}
                      onClick={() => handlePlannerChange('travelers', num)}
                    >
                      {num} {num === 1 ? 'человек' : 'человека'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="planner-section">
                <h3>📅 Длительность путешествия</h3>
                <div className="days-slider-container">
                  <input
                    type="range"
                    min="3"
                    max="21"
                    value={plannerData.days}
                    onChange={(e) => handlePlannerChange('days', parseInt(e.target.value))}
                    className="days-slider"
                  />
                  <div className="days-display">{plannerData.days} дней</div>
                </div>
              </div>

              <div className="planner-section">
                <h3>💰 Бюджет на человека</h3>
                <div className="budget-slider-container">
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={plannerData.budget}
                    onChange={(e) => handlePlannerChange('budget', parseInt(e.target.value))}
                    className="budget-slider"
                  />
                  <div className="budget-display">{plannerData.budget.toLocaleString()} ₽</div>
                </div>
              </div>

              <div className="planner-section">
                <h3>🎯 Интересы</h3>
                <div className="interests-grid">
                  {interests.map(interest => (
                    <button
                      key={interest.id}
                      className={`interest-btn ${plannerData.interests.includes(interest.id) ? 'active' : ''}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <span className="interest-emoji">{interest.emoji}</span>
                      {interest.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="planner-section">
                <h3>🗺️ Регион</h3>
                <div className="region-buttons">
                  {regions.map(region => (
                    <button
                      key={region.id}
                      className={`region-btn ${plannerData.region === region.id ? 'active' : ''}`}
                      onClick={() => handlePlannerChange('region', region.id)}
                    >
                      <span className="region-emoji">{region.emoji}</span>
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="planner-section">
                <h3>📅 Сезон</h3>
                <div className="season-buttons-planner">
                  {seasons.map(s => (
                    <button
                      key={s.id}
                      className={`season-btn-planner ${season === s.id ? 'active' : ''}`}
                      onClick={() => setSeason(s.id)}
                    >
                      <span className="season-emoji">{s.emoji}</span>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="planner-footer">
              <button 
                className="generate-plan-btn"
                onClick={() => {
                  const plan = generateTravelPlan();
                  setTravelPlan(plan);
                }}
              >
                🗺️ Сгенерировать маршрут
              </button>
              
              {travelPlan.length > 0 && (
                <div className="travel-plan">
                  <h3>✨ Ваш идеальный маршрут:</h3>
                  <div className="plan-list">
                    {travelPlan.map((place, index) => (
                      <div key={place.id} className="plan-item">
                        <div className="plan-day">День {index + 1}</div>
                        <div className="plan-place">{place.name}</div>
                        <div className="plan-price">{place[season].price} ₽</div>
                      </div>
                    ))}
                  </div>
                  <div className="plan-total">
                    Общая стоимость: {calculateTotalCost(travelPlan).toLocaleString()} ₽
                  </div>
                  <button className="save-plan-btn">
                    💾 Сохранить маршрут
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
          {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Всё права защищены. Сибирь: Земля легенд</p>
      </footer>
    </>
  );
};

export default App;