# House of Holmes Social Media Feed Setup

## Current Features

Your website now has a beautiful social media feed that displays:

### ✅ **What's Working Now:**
- **Interactive social feed** with platform filters
- **Sample posts** from Instagram, Facebook, and LinkedIn
- **Platform-specific styling** and icons
- **Engagement metrics** (likes, comments)
- **Direct links** to original posts
- **Responsive design** matching your brand

### 📱 **Sample Posts Displayed:**
1. **Instagram** - Fashion line development updates
2. **Facebook** - Quality control announcements
3. **LinkedIn** - Partnership announcements
4. **Mixed content** - Behind-the-scenes, team updates

## Connect Real Social Media Posts

### **Option 1: Instagram Integration**

#### Step 1: Create Instagram App
1. **Go to:** https://developers.facebook.com/
2. **Create a new app** → Consumer
3. **Add Instagram Basic Display** product
4. **Configure OAuth Redirect URIs**

#### Step 2: Get Instagram Token
1. **Generate Instagram Basic Display token**
2. **Add to your .env file:**
   ```env
   REACT_APP_INSTAGRAM_TOKEN=your_instagram_token_here
   ```

### **Option 2: Facebook Integration**

#### Step 1: Create Facebook App
1. **Go to:** https://developers.facebook.com/
2. **Create a new app** → Business
3. **Add Facebook Login** product
4. **Configure permissions**

#### Step 2: Get Facebook Token
1. **Generate Facebook Graph API token**
2. **Add to your .env file:**
   ```env
   REACT_APP_FACEBOOK_TOKEN=your_facebook_token_here
   ```

### **Option 3: LinkedIn Integration**

#### Step 1: Create LinkedIn App
1. **Go to:** https://www.linkedin.com/developers/
2. **Create a new app**
3. **Request access** to Marketing Developer Platform
4. **Configure OAuth settings**

#### Step 2: Get LinkedIn Token
1. **Generate LinkedIn API token**
2. **Add to your .env file:**
   ```env
   REACT_APP_LINKEDIN_TOKEN=your_linkedin_token_here
   ```

## Manual Post Management

### **Add Posts Manually**
You can add posts manually by editing the sample posts in `src/components/SocialFeed.js`:

```javascript
const samplePosts = [
  {
    id: 1,
    platform: 'instagram',
    username: 'hofh.houseofholmes',
    content: 'Your real post content here',
    image: '/images/social/your-image.jpg',
    likes: 45,
    comments: 12,
    timestamp: new Date(2024, 0, 20, 14, 30),
    link: 'https://www.instagram.com/p/your-post/'
  },
  // Add more posts...
];
```

## Platform Features

### **Instagram:**
- **Visual content** with images
- **Hashtag support** in captions
- **Engagement metrics** (likes, comments)
- **Direct links** to posts

### **Facebook:**
- **Text content** with links
- **Business updates** and announcements
- **Community engagement**
- **Professional branding**

### **LinkedIn:**
- **Professional content** and industry updates
- **Company announcements**
- **Thought leadership** posts
- **Business networking**

## Feed Features

### **Platform Filters:**
- **All Platforms** - Shows posts from all sources
- **Instagram** - Visual content and updates
- **Facebook** - Community and business posts
- **LinkedIn** - Professional and industry content

### **Post Display:**
- **Platform icons** with brand colors
- **Username** and timestamp
- **Post content** with hashtags
- **Images** (when available)
- **Engagement metrics** (likes, comments)
- **Direct links** to original posts

### **Design Features:**
- **Consistent with your brand** (black, white, grey)
- **Platform-specific colors** (Instagram pink, Facebook blue, LinkedIn blue)
- **Hover effects** and animations
- **Responsive design** for all devices

## Adding Real Posts

### **Via Social Media APIs:**
1. **Set up API tokens** for each platform
2. **Configure permissions** and access
3. **Posts automatically sync** to your website
4. **Real-time updates** from your social accounts

### **Via Manual Management:**
1. **Edit the sample posts** in the component
2. **Add your real posts** with proper content
3. **Include images** and engagement data
4. **Update regularly** to keep content fresh

## Troubleshooting

### **Posts Not Loading:**
- Check if API tokens are configured
- Verify API permissions and access
- Check browser console for errors
- Ensure social media accounts are public

### **API Rate Limits:**
- Instagram: 200 requests per hour
- Facebook: 200 requests per hour
- LinkedIn: 100 requests per day

### **Authentication Issues:**
- Verify token expiration
- Check app permissions
- Ensure correct redirect URIs
- Test API endpoints separately

## Next Steps

1. **Set up social media API tokens**
2. **Configure platform permissions**
3. **Test real post integration**
4. **Customize feed design** if needed
5. **Add more platforms** (Twitter, TikTok, etc.)

## Support

- **Instagram API:** [Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- **Facebook API:** [Documentation](https://developers.facebook.com/docs/graph-api)
- **LinkedIn API:** [Documentation](https://developer.linkedin.com/docs)

Your social media feed is now live and ready for real posts! 📱✨ 