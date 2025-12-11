let threads = [];

// Nạp dữ liệu từ threads.json
fetch('threads.json')
  .then(res => res.json())
  .then(data => threads = data)
  .catch(err => console.error('Lỗi tải dữ liệu:', err));

// Hàm chuyển HEX sang RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

// Hàm tính khoảng cách Euclidean trong RGB
function colorDistance(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

// Hàm tìm nhiều màu gần nhất
function findNearestColors(chosenHex, topN = 3) {
  const results = threads.map(t => ({
    ...t,
    diff: colorDistance(chosenHex, t.hex)
  }));

  results.sort((a, b) => a.diff - b.diff);

  const topResults = results.slice(0, topN);

  showResults(topResults, chosenHex);
}

// Hiển thị kết quả
function showResults(results, chosenHex) {
  let html = `
    <div class="p-4 bg-white rounded-lg shadow-md mb-4">
      <p class="font-semibold mb-2">Màu chọn: ${chosenHex}</p>
      <div class="w-12 h-12 rounded-md border mb-2" style="background:${chosenHex}"></div>
    </div>
  `;

  results.forEach(r => {
    html += `
      <div class="p-4 bg-white rounded-lg shadow-md flex items-center gap-4 mb-4">
        <div class="w-12 h-12 rounded-md border" style="background:${r.hex}"></div>
        <div>
          <p class="font-semibold">${r.brand} ${r.code} - ${r.name}</p>
          <p class="text-sm text-gray-600">Mã màu: ${r.hex}</p>
        </div>
      </div>
    `;
  });

  document.getElementById('result').innerHTML = html;
}

// Sự kiện nút tìm màu từ color picker
document.getElementById('btnFindNearest').addEventListener('click', () => {
