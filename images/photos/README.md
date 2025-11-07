# Trip Photos

## 📱 Easy Option: Google Photos (Recommended for Trip)

**Perfect for uploading photos during your trip without GitHub access!**

### How to Set Up:

1. **Create a Google Photos Album**
   - Open Google Photos on your phone
   - Create a new album: "Italy Trip 2025"
   - Share the album with all travelers so everyone can add photos

2. **Get the Share Link**
   - Open the album
   - Tap the Share button
   - Tap "Create link"
   - Copy the link

3. **Add Link to Your Website**
   - Open `config.js` in your repository
   - Find the `GOOGLE_PHOTOS_CONFIG` section
   - Paste your album link in the `albumUrl` field:
   ```javascript
   window.GOOGLE_PHOTOS_CONFIG = {
     albumUrl: 'https://photos.app.goo.gl/yourAlbumLinkHere'
   };
   ```
   - Commit and push to GitHub

4. **Upload Photos During Trip**
   - Just add photos to your Google Photos album from your phone
   - They'll automatically appear on your website!
   - No GitHub access needed while traveling

---

## 💻 Alternative: Upload to GitHub

If you prefer to store photos directly in your repository:

### How to Add Photos

1. Upload your Italy trip photos to this folder (`images/photos/`)
2. Name your photos descriptively (e.g., `rome-colosseum.jpg`, `lake-garda-sunset.jpg`)
3. The photos will automatically appear in the Photos tab on your website

### Recommended Photo Format

- **Format**: JPG or PNG
- **Size**: Optimize photos to be under 2MB for faster loading
- **Resolution**: 1200x800 pixels or similar aspect ratio works well

### Organizing Photos

You can organize photos by:
- Location (Rome, Lake Garda, Florence, Milan)
- Date
- Activity type

### Example Photo Names

- `rome-colosseum-day1.jpg`
- `lake-garda-sirmione-nov23.jpg`
- `florence-duomo-sunset.jpg`
- `milan-duomo-cathedral.jpg`
- `verona-arena-group-photo.jpg`

---

Happy memories! 📸
