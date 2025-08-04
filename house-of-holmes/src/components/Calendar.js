import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import calendarService from '../services/calendarService';

const Calendar = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample events - replace with real data from Google Calendar or Odoo
  const sampleEvents = [
    {
      id: 1,
      title: 'Consultation - Fashion Brand',
      date: new Date(2024, 0, 15, 10, 0),
      duration: 60,
      type: 'consultation',
      description: 'Product development consultation for new fashion line'
    },
    {
      id: 2,
      title: 'Sample Review Meeting',
      date: new Date(2024, 0, 18, 14, 0),
      duration: 90,
      type: 'meeting',
      description: 'Review of sample garments for client approval'
    },
    {
      id: 3,
      title: 'Production Planning',
      date: new Date(2024, 0, 22, 9, 0),
      duration: 120,
      type: 'planning',
      description: 'Production planning session for upcoming orders'
    },
    {
      id: 4,
      title: 'Quality Control Check',
      date: new Date(2024, 0, 25, 11, 0),
      duration: 60,
      type: 'qc',
      description: 'Quality control inspection for finished products'
    }
  ];

  useEffect(() => {
    loadEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Try to load real events from Google Calendar
      const realEvents = await calendarService.getAllEvents();
      
      if (realEvents.length > 0) {
        setEvents(realEvents);
      } else {
        // Fallback to sample events if no real events found
        setEvents(sampleEvents);
      }
    } catch (error) {
      console.error('Failed to load calendar events:', error);
      // Fallback to sample events
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'consultation': return '#000000';
      case 'meeting': return '#333333';
      case 'planning': return '#666666';
      case 'qc': return '#999999';
      default: return '#cccccc';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  if (loading) {
    return (
      <section className="calendar-section">
        <h2>{t('calendar.title', 'Calendar & Events')}</h2>
        <div className="loading-spinner">Loading calendar...</div>
      </section>
    );
  }

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section className="calendar-section">
      <h2>{t('calendar.title', 'Calendar & Events')}</h2>
      
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="calendar-nav-btn">‹</button>
          <h3>{monthName}</h3>
          <button onClick={nextMonth} className="calendar-nav-btn">›</button>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          
          <div className="calendar-days">
            {days.map((day, index) => (
              <div key={index} className={`calendar-day ${!day ? 'empty' : ''}`}>
                {day && (
                  <>
                    <span className="day-number">{day.getDate()}</span>
                    <div className="day-events">
                      {getEventsForDate(day).map(event => (
                        <div 
                          key={event.id}
                          className="event-dot"
                          style={{ backgroundColor: getEventTypeColor(event.type) }}
                          title={`${event.title} - ${formatTime(event.date)}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="upcoming-events">
        <h3>{t('calendar.upcoming', 'Upcoming Events')}</h3>
        <div className="events-list">
          {events
            .filter(event => event.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 5)
            .map(event => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <span className="event-day">{event.date.getDate()}</span>
                  <span className="event-month">
                    {event.date.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <span className="event-time">{formatTime(event.date)}</span>
                </div>
                <div 
                  className="event-type-indicator"
                  style={{ backgroundColor: getEventTypeColor(event.type) }}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar; 