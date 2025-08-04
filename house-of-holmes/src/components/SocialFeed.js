import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import socialMediaService from '../services/socialMediaService';
import realtimeService from '../services/realtimeService';
import pollingService from '../services/pollingService';

const SocialFeed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState(false);
  const [pollingStatus, setPollingStatus] = useState(false);
  const [newPostAlert, setNewPostAlert] = useState(null);
  const [alertHistory, setAlertHistory] = useState([]);
  const [connectionMode, setConnectionMode] = useState('none'); // 'realtime', 'polling', 'none'

  useEffect(() => {
    loadSocialPosts();
    setupConnections();

    return () => {
      cleanupConnections();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSocialPosts = async () => {
    try {
      setLoading(true);
      const socialPosts = await socialMediaService.getAllSocialPosts();
      setPosts(socialPosts);
    } catch (error) {
      console.error('Error loading social posts:', error);
      // Service now handles fallback posts automatically
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const setupConnections = async () => {
    try {
      // First, try to set up real-time connection
      console.log('🚀 Setting up real-time connections...');
      
      // Request notification permission
      await realtimeService.requestNotificationPermission();
      
      // Connect to real-time service
      realtimeService.connect();
      
      // Set up real-time event listeners
      const realtimeListenerId = realtimeService.onNewPost((data) => {
        console.log('📱 Real-time alert received:', data);
        handleNewPostAlert(data, 'realtime');
      });

      const connectionListenerId = realtimeService.onConnection((status) => {
        setRealtimeStatus(status.connected);
        if (status.connected && connectionMode !== 'realtime') {
          setConnectionMode('realtime');
          console.log('✅ Switched to real-time mode');
          // Stop polling if it was running
          if (pollingService.getStatus().isPolling) {
            pollingService.stopPolling();
            setPollingStatus(false);
          }
        } else if (!status.connected && connectionMode === 'realtime') {
          // Real-time disconnected, fall back to polling
          console.log('📡 Real-time disconnected, falling back to polling...');
          startPollingFallback();
        }
      });

      // Set up polling as fallback
      await setupPollingFallback();

      // Check real-time connection status after a short delay
      setTimeout(() => {
        const status = realtimeService.getConnectionStatus();
        if (!status.isConnected) {
          console.log('📡 Real-time connection failed, starting polling fallback...');
          startPollingFallback();
        }
      }, 3000);

      // Store listener IDs for cleanup
      window.socialFeedListeners = {
        realtimeListenerId,
        connectionListenerId
      };

    } catch (error) {
      console.error('❌ Error setting up connections:', error);
      // Fall back to polling if real-time setup fails
      startPollingFallback();
    }
  };

  const setupPollingFallback = async () => {
    try {
      // Initialize polling service with existing posts
      await pollingService.initializeWithExistingPosts();
      
      // Set up polling event listeners
      const pollingListenerId = pollingService.onNewPost((data) => {
        console.log('🔄 Polling alert received:', data);
        handleNewPostAlert(data, 'polling');
      });

      const pollingStatusListenerId = pollingService.onPollingStarted(() => {
        setPollingStatus(true);
      });

      const pollingStoppedListenerId = pollingService.onPollingStopped(() => {
        setPollingStatus(false);
      });

      // Store polling listener IDs
      if (!window.socialFeedListeners) {
        window.socialFeedListeners = {};
      }
      window.socialFeedListeners.pollingListenerId = pollingListenerId;
      window.socialFeedListeners.pollingStatusListenerId = pollingStatusListenerId;
      window.socialFeedListeners.pollingStoppedListenerId = pollingStoppedListenerId;

    } catch (error) {
      console.error('❌ Error setting up polling fallback:', error);
    }
  };

  const startPollingFallback = () => {
    if (connectionMode !== 'polling' && !pollingService.getStatus().isPolling) {
      setConnectionMode('polling');
      pollingService.startPolling(30000); // Poll every 30 seconds
      console.log('🔄 Started polling fallback');
    }
  };

  const cleanupConnections = () => {
    console.log('🧹 Cleaning up connections...');
    
    // Disconnect real-time service
    realtimeService.disconnect();
    
    // Stop polling
    pollingService.stopPolling();
    
    // Clean up listeners
    if (window.socialFeedListeners) {
      const { 
        realtimeListenerId, 
        connectionListenerId, 
        pollingListenerId,
        pollingStatusListenerId,
        pollingStoppedListenerId
      } = window.socialFeedListeners;
      
      if (realtimeListenerId) realtimeService.offEvent('new-post', realtimeListenerId);
      if (connectionListenerId) realtimeService.offEvent('connection', connectionListenerId);
      if (pollingListenerId) pollingService.offEvent(pollingListenerId);
      if (pollingStatusListenerId) pollingService.offEvent(pollingStatusListenerId);
      if (pollingStoppedListenerId) pollingService.offEvent(pollingStoppedListenerId);
      
      delete window.socialFeedListeners;
    }
  };

  const handleNewPostAlert = (data, source) => {
    console.log(`📱 New post alert from ${source}:`, data);
    
    // Add to alert history
    const alertWithSource = { ...data, source, id: `alert_${Date.now()}` };
    setAlertHistory(prev => [alertWithSource, ...prev.slice(0, 9)]); // Keep last 10 alerts
    
    // Show temporary alert in UI
    setNewPostAlert(alertWithSource);
    setTimeout(() => setNewPostAlert(null), 6000);
    
    // Refresh posts to include the new one
    loadSocialPosts();
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.platform === filter);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1, 4);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  // Test functions
  const testRealtimeAlert = async () => {
    try {
      await realtimeService.triggerTestAlert('instagram', '🧪 Test: Real-time Instagram alert!');
    } catch (error) {
      console.error('Failed to trigger real-time test:', error);
    }
  };

  const testPollingAlert = async () => {
    pollingService.reset(); // Reset seen posts
    await pollingService.manualCheck(); // Trigger manual check
  };

  const getConnectionModeDisplay = () => {
    switch (connectionMode) {
      case 'realtime':
        return { text: 'Real-time', icon: '⚡', color: '#28a745' };
      case 'polling':
        return { text: 'Polling', icon: '🔄', color: '#ffc107' };
      default:
        return { text: 'Offline', icon: '⚫', color: '#dc3545' };
    }
  };

  if (loading) {
    return (
      <section className="social-feed-section">
        <h2>{t('socialFeed.title')}</h2>
        <div className="loading-spinner">Loading social media posts...</div>
      </section>
    );
  }

  return (
    <section className="social-feed-section">
      <h2>{t('socialFeed.title')}</h2>
      
      {/* Real-time Status Dashboard */}
      <div className="realtime-dashboard">
        <div className="status-row">
          <div className="connection-status">
            <div className={`status-indicator ${connectionMode}`}>
              <span className="status-dot" style={{ backgroundColor: getConnectionModeDisplay().color }}></span>
              <span className="status-text">
                {getConnectionModeDisplay().icon} {getConnectionModeDisplay().text} Updates
              </span>
            </div>
          </div>
          
          <div className="test-controls">
            <button onClick={testRealtimeAlert} className="test-btn realtime-test">
              🧪 Test Real-time
            </button>
            <button onClick={testPollingAlert} className="test-btn polling-test">
              🔄 Test Polling
            </button>
          </div>
        </div>

        {/* Alert History */}
        {alertHistory.length > 0 && (
          <div className="alert-history">
            <div className="alert-history-header">
              <span>Recent Alerts ({alertHistory.length})</span>
              <button onClick={() => setAlertHistory([])} className="clear-alerts-btn">
                Clear
              </button>
            </div>
            <div className="alert-history-list">
              {alertHistory.slice(0, 3).map(alert => (
                <div key={alert.id} className="alert-history-item">
                  <span className="alert-platform-emoji">
                    {alert.platform === 'instagram' ? '📸' : 
                     alert.platform === 'linkedin' ? '💼' : 
                     alert.platform === 'facebook' ? '📘' : '🧪'}
                  </span>
                  <span className="alert-text">{alert.message}</span>
                  <span className="alert-source">{alert.source}</span>
                  <span className="alert-time">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Post Alert */}
      {newPostAlert && (
        <div className="new-post-alert">
          <div className="alert-content">
            <span className="alert-icon">
              {newPostAlert.platform === 'instagram' ? '📸' : 
               newPostAlert.platform === 'linkedin' ? '💼' : 
               newPostAlert.platform === 'facebook' ? '📘' : '🧪'}
            </span>
            <div className="alert-text-content">
              <span className="alert-message">{newPostAlert.message}</span>
              <span className="alert-details">
                {newPostAlert.platform} • {newPostAlert.source} • {new Date(newPostAlert.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <button 
              onClick={() => setNewPostAlert(null)} 
              className="alert-close"
              aria-label="Close alert"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="platform-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Platforms
        </button>
        <button 
          className={`filter-btn ${filter === 'instagram' ? 'active' : ''}`}
          onClick={() => setFilter('instagram')}
        >
          Instagram
        </button>
        <button 
          className={`filter-btn ${filter === 'facebook' ? 'active' : ''}`}
          onClick={() => setFilter('facebook')}
        >
          Facebook
        </button>
        <button 
          className={`filter-btn ${filter === 'linkedin' ? 'active' : ''}`}
          onClick={() => setFilter('linkedin')}
        >
          LinkedIn
        </button>
      </div>

      {featuredPost && (
        <div className="social-feed-layout">
          {/* Left Section - Featured Post */}
          <div className="featured-post-section">
            <div className="featured-post">
              <div className="featured-post-image">
                <img src={featuredPost.image} alt={featuredPost.content} />
                <div className="featured-post-overlay">
                  <div className="featured-post-content">
                    <h3>THE JOURNAL</h3>
                    <p>A world of inspiration</p>
                    <a 
                      href="https://www.linkedin.com/company/houseofholmes/posts/?feedView=articles" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="featured-post-btn"
                    >
                      All articles
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Scrollable Posts */}
          <div className="product-showcase-section">
            <div className="scrollable-posts-container">
              <h3>Latest Updates</h3>
              <div className="scrollable-posts">
                {otherPosts.map(post => (
                  <div key={post.id} className="scrollable-post-card">
                    <div className="post-header">
                      <div className="platform-icon">
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div className="post-meta">
                        <div className="username">{post.username}</div>
                        <div className="timestamp">{formatDate(post.timestamp)}</div>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>
                    
                    {post.image && (
                      <div className="post-image">
                        <img src={post.image} alt={post.content} />
                      </div>
                    )}
                    
                    <div className="post-engagement">
                      <div className="engagement-stats">
                        <span className="likes">❤️ {post.likes}</span>
                        <span className="comments">💬 {post.comments}</span>
                      </div>
                      <a href={post.link} target="_blank" rel="noopener noreferrer" className="view-post-btn">
                        View Post
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Posts Grid - Removed since posts are now in scrollable section */}
    </section>
  );
};

export default SocialFeed; 