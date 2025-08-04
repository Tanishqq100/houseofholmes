import socialMediaService from './socialMediaService';

class PollingService {
  constructor() {
    this.interval = null;
    this.lastPostIds = new Set();
    this.callbacks = new Set();
    this.isPolling = false;
    this.pollIntervalMs = 30000; // 30 seconds default
    this.lastPollTime = null;
    this.errorCount = 0;
    this.maxErrors = 5;
  }

  startPolling(intervalMs = this.pollIntervalMs) {
    if (this.isPolling) {
      console.log('Polling already started');
      return;
    }

    this.pollIntervalMs = intervalMs;
    this.isPolling = true;
    this.errorCount = 0;

    console.log(`🔄 Started polling for new posts every ${intervalMs}ms`);
    
    // Initial check
    this.checkForNewPosts();
    
    // Set interval for recurring checks
    this.interval = setInterval(async () => {
      await this.checkForNewPosts();
    }, intervalMs);

    // Trigger listeners about polling start
    this.triggerListeners('polling-started', { intervalMs });
  }

  stopPolling() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    this.isPolling = false;
    console.log('⏹️ Stopped polling for new posts');
    
    // Trigger listeners about polling stop
    this.triggerListeners('polling-stopped', {});
  }

  async checkForNewPosts() {
    if (!this.isPolling) {
      return;
    }

    try {
      console.log('🔍 Checking for new posts...');
      const posts = await socialMediaService.getAllSocialPosts();
      const now = new Date();
      
      // Filter for new posts (not seen before)
      const newPosts = posts.filter(post => {
        const postId = post.id;
        const isNew = !this.lastPostIds.has(postId);
        
        // Also check if post is recent (within last hour for first load)
        const postTime = new Date(post.timestamp);
        const timeDiff = now - postTime;
        const isRecent = timeDiff < (60 * 60 * 1000); // 1 hour
        
        // For subsequent polls, only consider posts newer than last poll
        if (this.lastPollTime) {
          return isNew && postTime > this.lastPollTime;
        }
        
        // For first poll, only show recent new posts
        return isNew && isRecent;
      });
      
      if (newPosts.length > 0) {
        console.log(`📱 Found ${newPosts.length} new posts:`, newPosts.map(p => ({
          id: p.id,
          platform: p.platform,
          timestamp: p.timestamp
        })));
        
        // Add to seen posts
        newPosts.forEach(post => {
          this.lastPostIds.add(post.id);
        });
        
        // Notify listeners about new posts
        newPosts.forEach(post => {
          this.triggerListeners('new-post', {
            id: `polling_${post.id}`,
            platform: post.platform,
            type: 'new_post_polling',
            data: post,
            timestamp: new Date().toISOString(),
            message: `🔔 New ${post.platform} post detected via polling!`
          });
        });
      } else {
        console.log('✅ No new posts found');
      }
      
      this.lastPollTime = now;
      this.errorCount = 0; // Reset error count on success
      
      // Trigger listeners about successful poll
      this.triggerListeners('poll-success', {
        timestamp: now.toISOString(),
        newPostsCount: newPosts.length,
        totalPostsChecked: posts.length
      });
      
    } catch (error) {
      this.errorCount++;
      console.error(`❌ Error checking for new posts (${this.errorCount}/${this.maxErrors}):`, error);
      
      // Trigger listeners about poll error
      this.triggerListeners('poll-error', {
        error: error.message,
        errorCount: this.errorCount,
        timestamp: new Date().toISOString()
      });
      
      // Stop polling if too many errors
      if (this.errorCount >= this.maxErrors) {
        console.error('🛑 Too many polling errors, stopping polling');
        this.stopPolling();
        this.triggerListeners('polling-failed', {
          reason: 'Too many consecutive errors',
          errorCount: this.errorCount
        });
      }
    }
  }

  // Initialize with existing posts to avoid false positives
  async initializeWithExistingPosts() {
    try {
      console.log('🔄 Initializing polling service with existing posts...');
      const existingPosts = await socialMediaService.getAllSocialPosts();
      
      // Add all existing posts to seen list
      existingPosts.forEach(post => {
        this.lastPostIds.add(post.id);
      });
      
      this.lastPollTime = new Date();
      console.log(`✅ Initialized with ${existingPosts.length} existing posts`);
      
      return existingPosts.length;
    } catch (error) {
      console.error('❌ Error initializing polling service:', error);
      return 0;
    }
  }

  // Event listener management
  onEvent(eventType, callback) {
    const listener = { eventType, callback, id: Date.now() + Math.random() };
    this.callbacks.add(listener);
    return listener.id;
  }

  offEvent(listenerId) {
    for (const listener of this.callbacks) {
      if (listener.id === listenerId) {
        this.callbacks.delete(listener);
        break;
      }
    }
  }

  // Convenience methods
  onNewPost(callback) {
    return this.onEvent('new-post', callback);
  }

  onPollingStarted(callback) {
    return this.onEvent('polling-started', callback);
  }

  onPollingStopped(callback) {
    return this.onEvent('polling-stopped', callback);
  }

  onPollError(callback) {
    return this.onEvent('poll-error', callback);
  }

  // Trigger listeners
  triggerListeners(eventType, data) {
    for (const listener of this.callbacks) {
      if (listener.eventType === eventType) {
        try {
          listener.callback(data);
        } catch (error) {
          console.error(`Error in ${eventType} listener:`, error);
        }
      }
    }
  }

  // Get polling status
  getStatus() {
    return {
      isPolling: this.isPolling,
      pollIntervalMs: this.pollIntervalMs,
      lastPollTime: this.lastPollTime,
      errorCount: this.errorCount,
      maxErrors: this.maxErrors,
      seenPostsCount: this.lastPostIds.size
    };
  }

  // Update polling interval
  updateInterval(intervalMs) {
    if (this.isPolling) {
      this.stopPolling();
      this.startPolling(intervalMs);
    } else {
      this.pollIntervalMs = intervalMs;
    }
  }

  // Manual check trigger
  async manualCheck() {
    console.log('🔄 Manual poll check triggered');
    await this.checkForNewPosts();
  }

  // Clear seen posts (reset)
  reset() {
    this.lastPostIds.clear();
    this.lastPollTime = null;
    this.errorCount = 0;
    console.log('🔄 Polling service reset');
  }
}

const pollingService = new PollingService();
export default pollingService; 