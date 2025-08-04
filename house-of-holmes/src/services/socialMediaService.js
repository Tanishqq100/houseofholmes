// Social Media API Integration Service
class SocialMediaService {
  constructor() {
    this.instagramToken = process.env.REACT_APP_INSTAGRAM_TOKEN;
    this.facebookToken = process.env.REACT_APP_FACEBOOK_TOKEN;
    this.linkedinToken = process.env.REACT_APP_LINKEDIN_TOKEN;
  }

  // Fetch Instagram posts
  async getInstagramPosts() {
    if (!this.instagramToken) {
      console.warn('Instagram token not configured');
      return [];
    }

    try {
      // Instagram Basic Display API
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${this.instagramToken}`
      );

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformInstagramPosts(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
      return [];
    }
  }

  // Transform Instagram posts to our format
  transformInstagramPosts(instagramPosts) {
    return instagramPosts.map(post => ({
      id: `instagram_${post.id}`,
      platform: 'instagram',
      username: 'hofh.houseofholmes',
      content: post.caption || '',
      image: post.media_url || post.thumbnail_url,
      likes: 0, // Instagram API doesn't provide likes count in basic display
      comments: 0, // Instagram API doesn't provide comments count in basic display
      timestamp: new Date(post.timestamp),
      link: post.permalink
    }));
  }

  // Fetch Facebook posts
  async getFacebookPosts() {
    if (!this.facebookToken) {
      console.warn('Facebook token not configured');
      return [];
    }

    try {
      // Facebook Graph API
      const response = await fetch(
        `https://graph.facebook.com/v18.0/HofH.HouseofHolmes/posts?fields=id,message,created_time,permalink_url&access_token=${this.facebookToken}`
      );

      if (!response.ok) {
        throw new Error(`Facebook API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformFacebookPosts(data.data || []);
    } catch (error) {
      console.error('Failed to fetch Facebook posts:', error);
      return [];
    }
  }

  // Transform Facebook posts to our format
  transformFacebookPosts(facebookPosts) {
    return facebookPosts.map(post => ({
      id: `facebook_${post.id}`,
      platform: 'facebook',
      username: 'HofH.HouseofHolmes',
      content: post.message || '',
      image: null, // Facebook API doesn't provide images in basic posts endpoint
      likes: 0, // Would need additional API call for likes
      comments: 0, // Would need additional API call for comments
      timestamp: new Date(post.created_time),
      link: post.permalink_url
    }));
  }

  // Fetch LinkedIn posts
  async getLinkedInPosts() {
    if (!this.linkedinToken) {
      console.warn('LinkedIn token not configured');
      return [];
    }

    try {
      // LinkedIn API (requires different authentication)
      const response = await fetch(
        `https://api.linkedin.com/v2/ugcPosts?authors=List(urn:li:organization:YOUR_ORG_ID)&q=authors&count=10`,
        {
          headers: {
            'Authorization': `Bearer ${this.linkedinToken}`,
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformLinkedInPosts(data.elements || []);
    } catch (error) {
      console.error('Failed to fetch LinkedIn posts:', error);
      return [];
    }
  }

  // Transform LinkedIn posts to our format
  transformLinkedInPosts(linkedinPosts) {
    return linkedinPosts.map(post => ({
      id: `linkedin_${post.id}`,
      platform: 'linkedin',
      username: 'House of Holmes',
      content: post.specificContent?.['com.linkedin.ugc.ShareContent']?.text || '',
      image: null, // LinkedIn API structure is complex for images
      likes: 0,
      comments: 0,
      timestamp: new Date(post.created.time),
      link: `https://www.linkedin.com/feed/update/${post.id}/`
    }));
  }

  // Get all social media posts
  async getAllSocialPosts() {
    try {
      const [instagramPosts, facebookPosts, linkedinPosts] = await Promise.all([
        this.getInstagramPosts(),
        this.getFacebookPosts(),
        this.getLinkedInPosts()
      ]);

      // Combine and sort by timestamp
      const allPosts = [...instagramPosts, ...facebookPosts, ...linkedinPosts];
      
      // If no real posts available, return fallback posts
      if (allPosts.length === 0) {
        console.log('No real social posts available, using fallback posts');
        return this.getFallbackPosts();
      }
      
      return allPosts.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Failed to fetch social posts:', error);
      return this.getFallbackPosts();
    }
  }

  // Fallback posts for when APIs are not configured
  getFallbackPosts() {
    return [
      {
        id: 1,
        platform: 'instagram',
        username: 'hofh.houseofholmes',
        content: 'New fashion line development in progress! 🧵✨ Our team is working on innovative designs for our latest client. #HouseOfHolmes #FashionManufacturing #MadeInUSA',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
        timestamp: new Date('2024-01-15T10:30:00Z'),
        likes: 234,
        comments: 45,
        link: 'https://www.instagram.com/hofh.houseofholmes/'
      },
      {
        id: 2,
        platform: 'facebook',
        username: 'HofH.HouseofHolmes',
        content: 'Quality control check completed! ✅ Our rigorous standards ensure every garment meets the highest quality standards. #QualityControl #Manufacturing #HouseOfHolmes',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        timestamp: new Date('2024-01-14T15:45:00Z'),
        likes: 189,
        comments: 23,
        link: 'https://www.facebook.com/HofH.HouseofHolmes/'
      },
      {
        id: 3,
        platform: 'linkedin',
        username: 'House of Holmes',
        content: 'Excited to announce our partnership with a major fashion brand! This collaboration will bring innovative manufacturing solutions to the industry. #Partnership #Innovation #FashionTech',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
        timestamp: new Date('2024-01-13T09:15:00Z'),
        likes: 156,
        comments: 12,
        link: 'https://www.linkedin.com/company/houseofholmes/posts/'
      },
      {
        id: 4,
        platform: 'instagram',
        username: 'hofh.houseofholmes',
        content: 'Behind the scenes: Sample making process! 📏✂️ Our expert team creates perfect prototypes for client approval. #SampleMaking #Prototype #Manufacturing',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        timestamp: new Date('2024-01-12T14:20:00Z'),
        likes: 312,
        comments: 67,
        link: 'https://www.instagram.com/hofh.houseofholmes/'
      }
    ];
  }

  // Manual post addition (for testing or when APIs are not available)
  addManualPost(postData) {
    const newPost = {
      id: `manual_${Date.now()}`,
      platform: postData.platform,
      username: postData.username,
      content: postData.content,
      image: postData.image || null,
      likes: postData.likes || 0,
      comments: postData.comments || 0,
      timestamp: new Date(postData.timestamp || Date.now()),
      link: postData.link || '#'
    };

    // In a real app, you'd save this to a database
    console.log('Manual post added:', newPost);
    return newPost;
  }
}

const socialMediaServiceInstance = new SocialMediaService();
export default socialMediaServiceInstance; 