// Google Calendar Integration Service
class CalendarService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
    this.calendarId = process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'primary';
    this.baseUrl = 'https://www.googleapis.com/calendar/v3';
  }

  // Fetch events from Google Calendar
  async getGoogleCalendarEvents() {
    if (!this.apiKey) {
      console.warn('Google Calendar API key not configured');
      return [];
    }

    try {
      const now = new Date();
      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(now.getMonth() + 1);

      const response = await fetch(
        `${this.baseUrl}/calendars/${encodeURIComponent(this.calendarId)}/events?` +
        `key=${this.apiKey}&` +
        `timeMin=${now.toISOString()}&` +
        `timeMax=${oneMonthFromNow.toISOString()}&` +
        `singleEvents=true&` +
        `orderBy=startTime`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.transformGoogleEvents(data.items || []);
    } catch (error) {
      console.error('Failed to fetch Google Calendar events:', error);
      return [];
    }
  }

  // Transform Google Calendar events to our format
  transformGoogleEvents(googleEvents) {
    return googleEvents.map(event => ({
      id: event.id,
      title: event.summary || 'Untitled Event',
      date: new Date(event.start.dateTime || event.start.date),
      duration: this.calculateDuration(event.start, event.end),
      type: this.categorizeEvent(event.summary, event.description),
      description: event.description || '',
      location: event.location || '',
      attendees: event.attendees || []
    }));
  }

  // Calculate event duration in minutes
  calculateDuration(start, end) {
    const startTime = new Date(start.dateTime || start.date);
    const endTime = new Date(end.dateTime || end.date);
    return Math.round((endTime - startTime) / (1000 * 60));
  }

  // Categorize events based on title/description
  categorizeEvent(title, description) {
    const text = (title + ' ' + (description || '')).toLowerCase();
    
    if (text.includes('consultation') || text.includes('meeting')) {
      return 'consultation';
    } else if (text.includes('sample') || text.includes('review')) {
      return 'meeting';
    } else if (text.includes('production') || text.includes('planning')) {
      return 'planning';
    } else if (text.includes('quality') || text.includes('qc')) {
      return 'qc';
    } else {
      return 'general';
    }
  }

  // Create a new event in Google Calendar
  async createGoogleCalendarEvent(eventData) {
    if (!this.apiKey) {
      throw new Error('Google Calendar API key not configured');
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/calendars/${encodeURIComponent(this.calendarId)}/events?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary: eventData.title,
            description: eventData.description,
            start: {
              dateTime: eventData.startTime,
              timeZone: 'America/New_York',
            },
            end: {
              dateTime: eventData.endTime,
              timeZone: 'America/New_York',
            },
            attendees: eventData.attendees || [],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 30 },
              ],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create Google Calendar event:', error);
      throw error;
    }
  }

  // Get Odoo calendar events (if you have calendar module)
  async getOdooCalendarEvents() {
    // This would integrate with your Odoo calendar module
    // You'd need to implement this based on your Odoo setup
    return [];
  }

  // Combine events from multiple sources
  async getAllEvents() {
    const [googleEvents, odooEvents] = await Promise.all([
      this.getGoogleCalendarEvents(),
      this.getOdooCalendarEvents()
    ]);

    return [...googleEvents, ...odooEvents].sort((a, b) => a.date - b.date);
  }
}

const calendarServiceInstance = new CalendarService();
export default calendarServiceInstance; 