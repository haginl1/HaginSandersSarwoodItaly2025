# Converting HEIC Photos to JPG

HEIC files (iPhone photos) need to be converted to JPG for web display.

## Option 1: Windows Photos App (Built-in)

1. Open the HEIC file in Windows Photos app
2. Click "..." (three dots) → "Save as"
3. Choose JPG format
4. Save to `images/photos/` folder

## Option 2: Bulk Conversion (Free Online)

1. Go to: https://heictojpg.com/
2. Upload your HEIC files (up to 50 at once)
3. Click "Convert"
4. Download the JPG files
5. Save to `images/photos/` folder

## Option 3: iPhone Settings (Prevent HEIC)

**Change iPhone to save as JPG by default:**

1. Open Settings → Camera
2. Tap "Formats"
3. Select "Most Compatible" instead of "High Efficiency"
4. Future photos will be JPG instead of HEIC

## Option 4: Use Python Script (Automated)

I can create a Python script that automatically converts all HEIC files in the photos folder to JPG. Let me know if you want this!

## Quick Tip

After converting, name your photos simply:
- `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Or `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.

Then just:
```bash
git add images/photos/*
git commit -m "Add Italy trip photos"
git push origin main
```
