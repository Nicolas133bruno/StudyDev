// Remove fundo do logo usando chroma key simples em canvas
// Heurística: pega a cor média dos 4 cantos e torna transparente
// pixels próximos a essa cor (threshold ajustável).

function removeLogoBackground(img, threshold = 40) {
  if (!img || !img.complete) return;
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h);
  const px = data.data;

  function sample(x, y) {
    const i = (y * w + x) * 4;
    return [px[i], px[i + 1], px[i + 2]];
  }
  const corners = [
    sample(0, 0),
    sample(w - 1, 0),
    sample(0, h - 1),
    sample(w - 1, h - 1),
  ];
  const bg = corners.reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0]).map(v => Math.round(v / corners.length));

  function dist(r, g, b) {
    const dr = r - bg[0];
    const dg = g - bg[1];
    const db = b - bg[2];
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      if (dist(r, g, b) <= threshold) {
        px[i + 3] = 0; // torna transparente
      }
    }
  }

  ctx.putImageData(data, 0, 0);
  try {
    const url = canvas.toDataURL('image/png');
    img.src = url;
  } catch (e) {
    // falha silenciosa; mantém imagem original
  }
}

function initLogoBackgroundRemoval() {
  const img = document.querySelector('img.logo');
  if (!img) return;
  if (img.complete) {
    removeLogoBackground(img);
  } else {
    img.addEventListener('load', () => removeLogoBackground(img));
  }
}

window.addEventListener('DOMContentLoaded', initLogoBackgroundRemoval);