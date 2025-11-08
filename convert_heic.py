"""
HEIC to JPG Converter for Trip Photos
Automatically converts all HEIC files in images/photos/ to JPG format
"""

import os
import sys
from pathlib import Path

def convert_heic_to_jpg():
    """
    Convert all HEIC files in images/photos/ folder to JPG
    Requires: pip install pillow-heif pillow
    """
    
    # Check if required libraries are installed
    try:
        from pillow_heif import register_heif_opener
        from PIL import Image
        register_heif_opener()
    except ImportError:
        print("❌ Required libraries not installed!")
        print("\nPlease install them with:")
        print("   pip install pillow-heif pillow")
        print("\nThen run this script again.")
        return
    
    # Get the photos directory
    photos_dir = Path(__file__).parent / "images" / "photos"
    
    if not photos_dir.exists():
        print(f"❌ Photos directory not found: {photos_dir}")
        return
    
    # Find all HEIC files
    heic_files = list(photos_dir.glob("*.heic")) + list(photos_dir.glob("*.HEIC"))
    
    if not heic_files:
        print("✅ No HEIC files found in images/photos/")
        return
    
    print(f"Found {len(heic_files)} HEIC file(s) to convert...\n")
    
    converted = 0
    for heic_file in heic_files:
        try:
            # Create output filename (replace .heic with .jpg)
            jpg_file = heic_file.with_suffix('.jpg')
            
            print(f"Converting: {heic_file.name} → {jpg_file.name}")
            
            # Open HEIC and save as JPG
            image = Image.open(heic_file)
            image.convert('RGB').save(jpg_file, 'JPEG', quality=95)
            
            # Optionally delete the HEIC file after conversion
            # Uncomment the next line if you want to auto-delete HEIC files:
            # heic_file.unlink()
            
            converted += 1
            
        except Exception as e:
            print(f"   ❌ Error converting {heic_file.name}: {e}")
    
    print(f"\n✅ Successfully converted {converted} file(s) to JPG!")
    print(f"📁 Location: {photos_dir}")
    print("\nNext steps:")
    print("   1. Delete the HEIC files if you want (keep JPG only)")
    print("   2. Rename JPG files to photo1.jpg, photo2.jpg, etc. (optional)")
    print("   3. Run: git add images/photos/*.jpg")
    print("   4. Run: git commit -m 'Add trip photos'")
    print("   5. Run: git push origin main")

if __name__ == "__main__":
    print("=" * 60)
    print("HEIC to JPG Converter for Italy Trip Photos")
    print("=" * 60)
    print()
    convert_heic_to_jpg()
