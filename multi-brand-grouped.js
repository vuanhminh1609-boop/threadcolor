function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function colorDistance(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

// Làm tròn RGB để gom nhóm (ví dụ làm tròn theo bội số 16)
function roundRgb(rgb, step = 16) {
  return {
    r: Math.round(rgb.r / step) * step,
    g: Math.round(rgb.g / step) * step,
    b: Math.round(rgb.b / step) * step
  };
}

function rgbToHex(rgb) {
  return "#" + [rgb.r, rgb.g, rgb.b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function groupByRoundedRgb(results, step = 16) {
  const groups = {};
  results.forEach(r => {
    const rounded = roundRgb(hexToRgb(r.hex), step);
    const key = rgbToHex(rounded).toUpperCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });
  return groups;
}

function showGroupedResults(results, chosenHex) {
  const grouped = groupByRoundedRgb(results);
  let html = `
    <div class="p-4 bg-white rounded-lg shadow-md mb-4">
      <p class="font-semibold mb-2">Màu chọn: ${chosenHex}</p>
      <div class="w-12 h-12 rounded-md border mb-2" style="background:${chosenHex}"></div>
    </div>
  `;

  for (const hex in grouped) {
    html += `
      <div class="mb-4 p-4 bg-gray-50 rounded-lg shadow-inner">
        <div class="flex items-center gap-4 mb-2">
          <div class="w-10 h-10 rounded border" style="background:${hex}"></div>
          <p class="font-semibold">Màu gần giống: ${hex}</p>
        </div>
        <ul class="list-disc pl-6">
          ${grouped[hex].map(r => `<li>${r.brand} ${r.code} - ${r.name}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  document.getElementById('result').innerHTML = html;
}

document.getElementById('btnFindAllBrands').addEventListener('click', () => {
  const chosenHex = document.getElementById('colorPicker').value;
  const threshold = 20;
  const matches = threads
    .map(t => ({ ...t, diff: colorDistance(chosenHex, t.hex) }))
    .filter(t => t.diff <= threshold)
    .sort((a, b) => a.diff - b.diff);

  showGroupedResults(matches, chosenHex);
});
