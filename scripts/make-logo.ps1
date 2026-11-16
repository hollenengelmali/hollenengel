Add-Type -AssemblyName System.Drawing
Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
public static class LogoTool {
  public static Bitmap Recolor(Bitmap src) {
    int w = src.Width, h = src.Height;
    var dst = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    var r = new Rectangle(0, 0, w, h);
    var sd = src.LockBits(r, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
    var dd = dst.LockBits(r, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
    int n = Math.Abs(sd.Stride) * h;
    byte[] s = new byte[n], d = new byte[n];
    Marshal.Copy(sd.Scan0, s, 0, n);
    for (int i = 0; i < n; i += 4) {
      int b = s[i], g = s[i+1], rr = s[i+2], a = s[i+3];
      double alpha;
      byte or, og, ob;
      if (rr - g > 50) { // red
        alpha = Math.Min(1.0, (255.0 - g) / (255.0 - 48.0));
        or = 232; og = 48; ob = 55;
      } else { // dark/grey -> bone
        int v = (rr + g + b) / 3;
        alpha = Math.Min(1.0, (255.0 - v) / (255.0 - 51.0));
        or = 243; og = 240; ob = 234;
      }
      alpha = alpha * a / 255.0;
      if (alpha < 0.02) alpha = 0;
      d[i] = ob; d[i+1] = og; d[i+2] = or; d[i+3] = (byte)Math.Round(alpha * 255);
    }
    Marshal.Copy(d, 0, dd.Scan0, n);
    src.UnlockBits(sd); dst.UnlockBits(dd);
    return dst;
  }
  public static Bitmap Resize(Bitmap src, int w, int h) {
    var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(bmp)) {
      g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
      g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
      g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
      g.DrawImage(src, 0, 0, w, h);
    }
    return bmp;
  }
}
"@ -ReferencedAssemblies System.Drawing

$root = "C:\Users\razvan.mircea\AI stuff"
$src = New-Object System.Drawing.Bitmap("$root\logos\Kennel Name Logo.png")
$out = Join-Path $root "public\images"
New-Item -ItemType Directory -Force $out | Out-Null

# Dark-theme logo (full + web size)
$dark = [LogoTool]::Recolor($src)
$web = [LogoTool]::Resize($dark, 1200, [int](1200 * $src.Height / $src.Width))
$web.Save("$out\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Original colours for light backgrounds
$orig = [LogoTool]::Resize($src, 1200, [int](1200 * $src.Height / $src.Width))
$orig.Save("$out\logo-light.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Favicon: dog head on ink square
$headRect = New-Object System.Drawing.Rectangle(1505, 0, 512, 663)
$head = $dark.Clone($headRect, $dark.PixelFormat)
$size = 256
$fav = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($fav)
$g.Clear([System.Drawing.ColorTranslator]::FromHtml("#09090a"))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$scale = ($size * 0.86) / [Math]::Max($head.Width, $head.Height)
$hw = [int]($head.Width * $scale); $hh = [int]($head.Height * $scale)
$g.DrawImage($head, [int](($size - $hw) / 2), [int](($size - $hh) / 2), $hw, $hh)
$g.Dispose()
$fav.Save("$out\..\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$fav.Save("$out\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
"done"
