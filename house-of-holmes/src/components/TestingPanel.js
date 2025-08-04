import React, { useState, useEffect } from 'react';
import realtimeService from '../services/realtimeService';

const TestingPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [testHistory, setTestHistory] = useState([]);
  const [customPost, setCustomPost] = useState({
    platform: 'instagram',
    username: 'test_account',
    content: '',
    hasImage: false,
    imageUrl: ''
  });

  useEffect(() => {
    // Monitor connection status
    const checkStatus = () => {
      const status = realtimeService.getConnectionStatus();
      setConnectionStatus(status.isConnected ? 'connected' : 'disconnected');
    };

    checkStatus();
    const statusInterval = setInterval(checkStatus, 2000);

    return () => clearInterval(statusInterval);
  }, []);

  const predefinedPosts = [
    {
      platform: 'instagram',
      username: 'houseofholmes_official',
      content: '🧵 Just completed a new custom clothing line for our amazing client! The attention to detail in every stitch reflects our commitment to quality. #CustomClothing #HouseOfHolmes #QualityCraftsmanship',
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600'
    },
    {
      platform: 'linkedin',
      username: 'House of Holmes Manufacturing',
      content: '🏭 Excited to share our latest manufacturing innovation! We\'ve just implemented new quality control standards that ensure 99.9% accuracy in our production process. This milestone represents our dedication to excellence in fashion manufacturing.',
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
    },
    {
      platform: 'instagram',
      username: 'houseofholmes_official', 
      content: '✨ Behind the scenes at our design studio! Our talented team is working on pattern development for next season\'s collection. Each design tells a story of innovation and craftsmanship. #BehindTheScenes #PatternMaking #DesignStudio',
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1558618047-1c1c4d7d3917?w=600'
    },
    {
      platform: 'facebook',
      username: 'House of Holmes',
      content: '🎉 We\'re thrilled to announce our partnership with sustainable fabric suppliers! This collaboration brings us one step closer to our goal of 100% eco-friendly manufacturing. Together, we\'re creating fashion that cares for our planet.',
      hasImage: false,
      imageUrl: ''
    },
    {
      platform: 'linkedin',
      username: 'House of Holmes Manufacturing',
      content: '📊 Industry Report: The future of fashion manufacturing lies in the perfect blend of traditional craftsmanship and modern technology. Our recent investments in automation have increased productivity by 40% while maintaining our signature quality standards.',
      hasImage: false,
      imageUrl: ''
    }
  ];

  const triggerPredefinedPost = async (postData) => {
    try {
      const testId = Date.now();
      const fakeWebhookData = {
        platform: postData.platform,
        message: `🔔 New ${postData.platform} post published!`,
        data: {
          id: `test_${postData.platform}_${testId}`,
          username: postData.username,
          content: postData.content,
          image: postData.hasImage ? postData.imageUrl : null,
          timestamp: new Date().toISOString(),
          likes: Math.floor(Math.random() * 500) + 10,
          comments: Math.floor(Math.random() * 50) + 2,
          testPost: true
        }
      };

      const response = await fetch('http://localhost:5000/api/trigger-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fakeWebhookData),
      });

      if (response.ok) {
        const result = await response.json();
        setTestHistory(prev => [{
          id: testId,
          timestamp: new Date().toISOString(),
          platform: postData.platform,
          content: postData.content.substring(0, 100) + '...',
          status: 'success'
        }, ...prev.slice(0, 9)]);
        console.log('✅ Test post triggered successfully:', result);
      }
    } catch (error) {
      console.error('❌ Failed to trigger test post:', error);
      setTestHistory(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        platform: postData.platform,
        content: 'Failed to send',
        status: 'error'
      }, ...prev.slice(0, 9)]);
    }
  };

  const triggerCustomPost = async () => {
    if (!customPost.content.trim()) {
      alert('Please enter post content');
      return;
    }

    const testData = {
      ...customPost,
      content: customPost.content,
      imageUrl: customPost.hasImage ? customPost.imageUrl : ''
    };

    await triggerPredefinedPost(testData);
    
    // Reset form
    setCustomPost({
      platform: 'instagram',
      username: 'test_account',
      content: '',
      hasImage: false,
      imageUrl: ''
    });
  };

  const simulateRealTimeScenario = async () => {
    const scenarios = [
      { delay: 0, post: predefinedPosts[0] },
      { delay: 3000, post: predefinedPosts[1] },
      { delay: 6000, post: predefinedPosts[2] },
      { delay: 9000, post: predefinedPosts[3] }
    ];

    for (const scenario of scenarios) {
      setTimeout(() => {
        triggerPredefinedPost(scenario.post);
      }, scenario.delay);
    }
  };

  const testWebhookEndpoint = async () => {
    try {
      const response = await fetch('http://localhost:5000/health');
      const data = await response.json();
      alert(`Backend Status: ${data.status}\nConnected Clients: ${data.connectedClients}\nUptime: ${Math.floor(data.uptime)}s`);
    } catch (error) {
      alert('❌ Backend server is not running!\nPlease start it with: npm run dev');
    }
  };

  const clearTestHistory = () => {
    setTestHistory([]);
  };

  if (!isOpen) {
    return (
      <div className="testing-panel-toggle">
        <button 
          onClick={() => setIsOpen(true)}
          className="toggle-testing-btn"
          title="Open Testing Panel"
        >
          🧪 Test Alerts
        </button>
      </div>
    );
  }

  return (
    <div className="testing-panel-overlay">
      <div className="testing-panel">
        <div className="testing-panel-header">
          <h3>🧪 Social Media Alert Testing Panel</h3>
          <div className="header-controls">
            <div className={`connection-badge ${connectionStatus}`}>
              <span className="connection-dot"></span>
              {connectionStatus === 'connected' ? 'Live' : 'Offline'}
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
          </div>
        </div>

        <div className="testing-panel-content">
          {/* Quick Actions */}
          <div className="test-section">
            <h4>⚡ Quick Actions</h4>
            <div className="quick-actions">
              <button onClick={testWebhookEndpoint} className="action-btn health-check">
                🏥 Check Backend
              </button>
              <button onClick={simulateRealTimeScenario} className="action-btn scenario-test">
                🎬 Multi-Post Scenario
              </button>
              <button onClick={() => realtimeService.triggerTestAlert('test', '🧪 Simple test alert')} className="action-btn simple-test">
                🔔 Simple Alert
              </button>
            </div>
          </div>

          {/* Predefined Posts */}
          <div className="test-section">
            <h4>📱 Simulate Real Posts</h4>
            <div className="predefined-posts">
              {predefinedPosts.map((post, index) => (
                <div key={index} className="post-preview">
                  <div className="post-preview-header">
                    <span className={`platform-badge ${post.platform}`}>
                      {post.platform === 'instagram' ? '📸' : 
                       post.platform === 'linkedin' ? '💼' : '📘'} {post.platform}
                    </span>
                    <span className="username">@{post.username}</span>
                  </div>
                  <div className="post-preview-content">
                    {post.content.substring(0, 120)}...
                  </div>
                  {post.hasImage && (
                    <div className="post-preview-image">
                      <img src={post.imageUrl} alt="Post preview" />
                    </div>
                  )}
                  <button 
                    onClick={() => triggerPredefinedPost(post)}
                    className="trigger-post-btn"
                  >
                    🚀 Send Alert
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Post Creator */}
          <div className="test-section">
            <h4>✏️ Create Custom Post</h4>
            <div className="custom-post-form">
              <div className="form-row">
                <select 
                  value={customPost.platform}
                  onChange={(e) => setCustomPost(prev => ({...prev, platform: e.target.value}))}
                  className="platform-select"
                >
                  <option value="instagram">📸 Instagram</option>
                  <option value="linkedin">💼 LinkedIn</option>
                  <option value="facebook">📘 Facebook</option>
                </select>
                <input
                  type="text"
                  placeholder="Username"
                  value={customPost.username}
                  onChange={(e) => setCustomPost(prev => ({...prev, username: e.target.value}))}
                  className="username-input"
                />
              </div>
              <textarea
                placeholder="Post content..."
                value={customPost.content}
                onChange={(e) => setCustomPost(prev => ({...prev, content: e.target.value}))}
                className="content-textarea"
                rows="3"
              />
              <div className="form-row">
                <label className="image-checkbox">
                  <input
                    type="checkbox"
                    checked={customPost.hasImage}
                    onChange={(e) => setCustomPost(prev => ({...prev, hasImage: e.target.checked}))}
                  />
                  Has Image
                </label>
                {customPost.hasImage && (
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={customPost.imageUrl}
                    onChange={(e) => setCustomPost(prev => ({...prev, imageUrl: e.target.value}))}
                    className="image-url-input"
                  />
                )}
              </div>
              <button onClick={triggerCustomPost} className="create-post-btn">
                🎯 Create & Send Alert
              </button>
            </div>
          </div>

          {/* Test History */}
          {testHistory.length > 0 && (
            <div className="test-section">
              <div className="section-header">
                <h4>📊 Test History</h4>
                <button onClick={clearTestHistory} className="clear-history-btn">
                  Clear
                </button>
              </div>
              <div className="test-history">
                {testHistory.map(test => (
                  <div key={test.id} className={`history-item ${test.status}`}>
                    <div className="history-platform">
                      {test.platform === 'instagram' ? '📸' : 
                       test.platform === 'linkedin' ? '💼' : '📘'}
                    </div>
                    <div className="history-content">
                      <div className="history-text">{test.content}</div>
                      <div className="history-time">
                        {new Date(test.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`history-status ${test.status}`}>
                      {test.status === 'success' ? '✅' : '❌'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestingPanel; 