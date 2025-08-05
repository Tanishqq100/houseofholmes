import React, { useState } from 'react';

const WebhookTester = () => {
  const [activeTab, setActiveTab] = useState('instagram');
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Instagram webhook payload examples
  const instagramWebhookPayloads = {
    media_created: {
      object: 'instagram',
      entry: [{
        id: '12345678901234567',
        time: Math.floor(Date.now() / 1000),
        changes: [{
          field: 'media',
          value: {
            media_id: 'test_media_123456789',
            media_type: 'IMAGE'
          }
        }]
      }]
    },
    video_created: {
      object: 'instagram',
      entry: [{
        id: '12345678901234567',
        time: Math.floor(Date.now() / 1000),
        changes: [{
          field: 'media',
          value: {
            media_id: 'test_video_123456789',
            media_type: 'VIDEO'
          }
        }]
      }]
    }
  };

  // LinkedIn webhook payload examples
  const linkedinWebhookPayloads = {
    share_created: {
      eventType: 'SHARE_LIFECYCLE_EVENT',
      shareId: 'urn:li:share:test123456789',
      timestamp: Date.now(),
      object: 'share',
      data: {
        author: 'urn:li:organization:house-of-holmes',
        content: 'Test LinkedIn post content',
        visibility: 'PUBLIC'
      }
    },
    ugc_post: {
      object: 'ugcPost',
      eventType: 'UGC_POST_LIFECYCLE_EVENT',
      id: 'urn:li:ugcPost:test987654321',
      timestamp: Date.now(),
      data: {
        author: 'urn:li:organization:house-of-holmes',
        text: 'Test UGC post content'
      }
    }
  };

  // Facebook webhook payload examples
  const facebookWebhookPayloads = {
    feed_post: {
      object: 'page',
      entry: [{
        id: 'page_id_123456789',
        time: Math.floor(Date.now() / 1000),
        changes: [{
          field: 'feed',
          value: {
            post_id: 'page_id_123456789_post_123456789',
            message: 'Test Facebook post content',
            created_time: new Date().toISOString()
          }
        }]
      }]
    }
  };

  const sendWebhook = async (platform, payloadType) => {
    setIsLoading(true);
    
    let payload;
    let endpoint;
    
    try {
      // Select payload based on platform and type
      switch (platform) {
        case 'instagram':
          payload = instagramWebhookPayloads[payloadType];
          endpoint = 'http://localhost:5000/webhooks/instagram';
          break;
        case 'linkedin':
          payload = linkedinWebhookPayloads[payloadType];
          endpoint = 'http://localhost:5000/webhooks/linkedin';
          break;
        case 'facebook':
          payload = facebookWebhookPayloads[payloadType];
          endpoint = 'http://localhost:5000/webhooks/facebook';
          break;
        default:
          throw new Error('Invalid platform');
      }

      console.log(`📤 Sending ${platform} webhook:`, payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = {
        id: Date.now(),
        platform,
        payloadType,
        timestamp: new Date().toISOString(),
        status: response.ok ? 'success' : 'error',
        statusCode: response.status,
        payload: payload
      };

      setTestResults(prev => [result, ...prev.slice(0, 9)]);
      
      if (response.ok) {
        console.log('✅ Webhook sent successfully');
      } else {
        console.error('❌ Webhook failed:', response.status);
      }

    } catch (error) {
      console.error('❌ Webhook error:', error);
      
      const errorResult = {
        id: Date.now(),
        platform,
        payloadType,
        timestamp: new Date().toISOString(),
        status: 'error',
        statusCode: 0,
        error: error.message
      };
      
      setTestResults(prev => [errorResult, ...prev.slice(0, 9)]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const renderInstagramTab = () => (
    <div className="webhook-tab-content">
      <h4>📸 Instagram Webhook Testing</h4>
      <p>Simulate Instagram Media webhooks to test real-time alerts.</p>
      
      <div className="webhook-actions">
        <button 
          onClick={() => sendWebhook('instagram', 'media_created')}
          disabled={isLoading}
          className="webhook-btn instagram-btn"
        >
          📷 New Image Post
        </button>
        <button 
          onClick={() => sendWebhook('instagram', 'video_created')}
          disabled={isLoading}
          className="webhook-btn instagram-btn"
        >
          🎥 New Video Post
        </button>
      </div>
      
      <div className="webhook-info">
        <h5>📋 Payload Preview:</h5>
        <pre className="payload-preview">
          {JSON.stringify(instagramWebhookPayloads.media_created, null, 2)}
        </pre>
      </div>
    </div>
  );

  const renderLinkedInTab = () => (
    <div className="webhook-tab-content">
      <h4>💼 LinkedIn Webhook Testing</h4>
      <p>Simulate LinkedIn Share webhooks to test professional network alerts.</p>
      
      <div className="webhook-actions">
        <button 
          onClick={() => sendWebhook('linkedin', 'share_created')}
          disabled={isLoading}
          className="webhook-btn linkedin-btn"
        >
          📝 New Share Created
        </button>
        <button 
          onClick={() => sendWebhook('linkedin', 'ugc_post')}
          disabled={isLoading}
          className="webhook-btn linkedin-btn"
        >
          📄 New UGC Post
        </button>
      </div>
      
      <div className="webhook-info">
        <h5>📋 Payload Preview:</h5>
        <pre className="payload-preview">
          {JSON.stringify(linkedinWebhookPayloads.share_created, null, 2)}
        </pre>
      </div>
    </div>
  );

  const renderFacebookTab = () => (
    <div className="webhook-tab-content">
      <h4>📘 Facebook Webhook Testing</h4>
      <p>Simulate Facebook Page webhooks to test social media alerts.</p>
      
      <div className="webhook-actions">
        <button 
          onClick={() => sendWebhook('facebook', 'feed_post')}
          disabled={isLoading}
          className="webhook-btn facebook-btn"
        >
          📝 New Feed Post
        </button>
      </div>
      
      <div className="webhook-info">
        <h5>📋 Payload Preview:</h5>
        <pre className="payload-preview">
          {JSON.stringify(facebookWebhookPayloads.feed_post, null, 2)}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="webhook-tester">
      <div className="webhook-header">
        <h3>🔗 Real Webhook Testing</h3>
        <p>Test your alert system with realistic webhook payloads</p>
      </div>

      {/* Tab Navigation */}
      <div className="webhook-tabs">
        <button 
          className={`tab-btn ${activeTab === 'instagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('instagram')}
        >
          📸 Instagram
        </button>
        <button 
          className={`tab-btn ${activeTab === 'linkedin' ? 'active' : ''}`}
          onClick={() => setActiveTab('linkedin')}
        >
          💼 LinkedIn
        </button>
        <button 
          className={`tab-btn ${activeTab === 'facebook' ? 'active' : ''}`}
          onClick={() => setActiveTab('facebook')}
        >
          📘 Facebook
        </button>
      </div>

      {/* Tab Content */}
      <div className="webhook-tab-container">
        {activeTab === 'instagram' && renderInstagramTab()}
        {activeTab === 'linkedin' && renderLinkedInTab()}
        {activeTab === 'facebook' && renderFacebookTab()}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="webhook-loading">
          <div className="loading-spinner"></div>
          <span>Sending webhook...</span>
        </div>
      )}

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="webhook-results">
          <div className="results-header">
            <h4>📊 Test Results</h4>
            <button onClick={clearResults} className="clear-btn">Clear</button>
          </div>
          
          <div className="results-list">
            {testResults.map(result => (
              <div key={result.id} className={`result-item ${result.status}`}>
                <div className="result-header">
                  <span className="result-platform">
                    {result.platform === 'instagram' ? '📸' : 
                     result.platform === 'linkedin' ? '💼' : '📘'} 
                    {result.platform}
                  </span>
                  <span className="result-type">{result.payloadType}</span>
                  <span className={`result-status ${result.status}`}>
                    {result.status === 'success' ? '✅' : '❌'} {result.statusCode}
                  </span>
                </div>
                <div className="result-details">
                  <span className="result-time">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                  {result.error && (
                    <span className="result-error">Error: {result.error}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhookTester; 