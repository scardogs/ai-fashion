export async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.9,
  forceWebp = false
): Promise<File> {
  const type = forceWebp ? "image/webp" : (file.type === "image/png" ? "image/png" : "image/webp");

  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);

  const { width, height } = getConstrainedSize(
    img.width,
    img.height,
    maxDimension,
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(
      (b) => resolve(b),
      type,
      type === "image/png" ? undefined : quality,
    ),
  );
  if (!blob) return file;

  if (blob.size < file.size) {
    return new File([blob], renameWithExt(file.name, type), { type });
  }
  return file;
}

export async function compressToSize(
  file: File,
  targetSizeKB: number = 50,
  maxRetries: number = 5,
  forceWebp: boolean = false
): Promise<File> {
  const targetBytes = targetSizeKB * 1024;
  let quality = 0.9;
  let maxDimension = 1600;
  let compressed = file;

  // Quick check if already small enough AND correct format
  if (file.size <= targetBytes && (!forceWebp || file.type === "image/webp")) {
    return file;
  }

  // First pass: aggressive downscale if file is very large
  if (file.size > 2 * 1024 * 1024) { // > 2MB
    maxDimension = 1200;
    quality = 0.8;
  }

  for (let i = 0; i < maxRetries; i++) {
    compressed = await compressImage(file, maxDimension, quality, forceWebp);

    if (compressed.size <= targetBytes) {
      return compressed;
    }

    // Reduce parameters for next iteration
    quality *= 0.8;
    maxDimension = Math.floor(maxDimension * 0.8);

    // Safety lower bounds
    if (quality < 0.3) quality = 0.3;
    if (maxDimension < 300) maxDimension = 300;
  }

  return compressed;
}

function renameWithExt(name: string, mime: string): string {
  const ext = mime === "image/png" ? "png" : "webp";
  return name.replace(/\.[^.]+$/, "") + "." + ext;
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function getConstrainedSize(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h };
  const ratio = w / h;
  if (ratio > 1) {
    return { width: max, height: Math.round(max / ratio) };
  }
  return { width: Math.round(max * ratio), height: max };
}
