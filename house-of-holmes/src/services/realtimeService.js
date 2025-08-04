import { io } from 'socket.io-client';

class RealtimeService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  }

  connect() {
    if (this.socket) {
      return;
    }

    console.log('Connecting to real-time service...');
    
    this.socket = io(this.baseUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('✅ Connected to real-time service');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.showNotification('Connected to live updates', 'success');
      
      // Notify listeners about connection
      this.triggerListeners('connection', { connected: true });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from real-time service:', reason);
      this.isConnected = false;
      this.showNotification('Disconnected from live updates', 'warning');
      
      // Notify listeners about disconnection
      this.triggerListeners('connection', { connected: false, reason });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.showNotification('Failed to connect to live updates', 'error');
      }
    });

    this.socket.on('new-post', (data) => {
      console.log('📱 New post alert received:', data);
      this.handleNewPost(data);
    });

    this.socket.on('connected', (data) => {
      console.log('📡 Real-time service confirmation:', data.message);
    });

    this.socket.on('post-history', (history) => {
      console.log('📚 Received post history:', history);
      this.triggerListeners('post-history', history);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('Disconnected from real-time service');
    }
  }

  handleNewPost(data) {
    // Show browser notification
    this.showBrowserNotification(data);
    
    // Show in-app notification
    this.showNotification(data.message, 'info', data.platform);
    
    // Play notification sound
    this.playNotificationSound();
    
    // Trigger callbacks for components
    this.triggerListeners('new-post', data);
  }

  async showBrowserNotification(data) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notification = new Notification(`New ${data.platform} Post!`, {
          body: data.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `social-post-${data.platform}-${data.id}`,
          requireInteraction: false,
          silent: false,
          data: {
            platform: data.platform,
            timestamp: data.timestamp,
            url: window.location.origin
          }
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
          
          // Scroll to social feed section
          const socialSection = document.querySelector('.social-feed-section');
          if (socialSection) {
            socialSection.scrollIntoView({ behavior: 'smooth' });
          }
        };

        // Auto close after 6 seconds
        setTimeout(() => {
          if (notification) {
            notification.close();
          }
        }, 6000);
      } catch (error) {
        console.error('Error showing browser notification:', error);
      }
    }
  }

  showNotification(message, type = 'info', platform = '') {
    // Remove existing notifications of the same type
    const existingToasts = document.querySelectorAll(`.toast-notification.toast-${type}`);
    existingToasts.forEach(toast => {
      if (toast.parentElement) {
        toast.remove();
      }
    });

    // Create toast notification element
    const notification = document.createElement('div');
    notification.className = `toast-notification toast-${type}`;
    
    const platformEmoji = this.getPlatformEmoji(platform);
    const typeIcon = this.getTypeIcon(type);
    
    notification.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${platformEmoji || typeIcon}</span>
        <div class="toast-text">
          <span class="toast-message">${message}</span>
          ${platform ? `<span class="toast-platform">${platform}</span>` : ''}
        </div>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    // Add animation class
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-100%)';
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
      notification.style.transition = 'all 0.3s ease-out';
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  getPlatformEmoji(platform) {
    const emojis = {
      instagram: '📸',
      linkedin: '💼', 
      facebook: '📘',
      twitter: '🐦',
      test: '🧪'
    };
    return emojis[platform?.toLowerCase()] || '';
  }

  getTypeIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: '📱'
    };
    return icons[type] || '📱';
  }

  playNotificationSound() {
    try {
      // Create audio context for notification sound
      if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Create a simple notification beep
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      }
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }

  // Subscribe to events
  onEvent(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    const id = Date.now() + Math.random();
    const callbackWithId = { id, callback };
    this.listeners.get(eventType).add(callbackWithId);
    
    return id;
  }

  // Unsubscribe from events
  offEvent(eventType, listenerId) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      for (const cb of callbacks) {
        if (cb.id === listenerId) {
          callbacks.delete(cb);
          break;
        }
      }
    }
  }

  // Convenience methods for specific events
  onNewPost(callback) {
    return this.onEvent('new-post', callback);
  }

  onConnection(callback) {
    return this.onEvent('connection', callback);
  }

  onPostHistory(callback) {
    return this.onEvent('post-history', callback);
  }

  // Trigger listeners
  triggerListeners(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(({ callback }) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${eventType} listener:`, error);
        }
      });
    }
  }

  // Request notification permission
  async requestNotificationPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
        return permission === 'granted';
      }
      return Notification.permission === 'granted';
    }
    return false;
  }

  // Trigger manual test alert
  async triggerTestAlert(platform = 'test', message = 'Test alert from frontend') {
    try {
      const response = await fetch(`${this.baseUrl}/api/trigger-alert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          platform, 
          message,
          data: { 
            test: true, 
            triggeredFrom: 'frontend',
            timestamp: new Date().toISOString()
          }
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Test alert triggered successfully:', result);
        return result;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to trigger test alert:', error);
      this.showNotification('Failed to trigger test alert', 'error');
      throw error;
    }
  }

  // Get recent alerts
  async getRecentAlerts(limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/api/recent-alerts?limit=${limit}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to fetch recent alerts:', error);
      return { alerts: [], total: 0 };
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }

  // Check server health
  async checkServerHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Server health check failed:', error);
      return null;
    }
  }
}

const realtimeService = new RealtimeService();
export default realtimeService; 