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

// Hàm tìm màu gần nhất
function findNearestColor(chosenHex) {
  let best = threads[0];
  let bestDiff = Infinity;

  threads.forEach(t => {
    const diff = colorDistance(chosenHex, t.hex);
    if(diff < bestDiff){ bestDiff = diff; best = t; }
  });

  showResult(best, chosenHex);
}

// Hiển thị kết quả
function showResult(thread, chosenHex) {
  document.getElementById('result').innerHTML = `
    <div class="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
      <div class="w-12 h-12 rounded-md border" style="background:${chosenHex}"></div>
      <div>
        <p class="font-semibold">Màu chọn: ${chosenHex}</p>
        <p>Mã chỉ gần nhất: <b>${thread.brand} ${thread.code}</b> (${thread.name})</p>
        <div class="w-12 h-12 rounded-md border mt-2" style="background:${thread.hex}"></div>
      </div>
    </div>
  `;
}

// Sự kiện nút tìm màu từ color picker
document.getElementById('btnFindNearest').addEventListener('click', () => {
  const chosenHex = document.getElementById('colorPicker').value;
  findNearestColor(chosenHex);
});

// Tra ngược theo mã
document.getElementById('btnFindByCode').addEventListener('click', () => {
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  const found = threads.find(t => (`${t.brand} ${t.code}`).toUpperCase() === code);
  if(found){
    document.getElementById('result').innerHTML = `
      <div class="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
        <div class="w-12 h-12 rounded-md border" style="background:${found.hex}"></div>
        <div>
          <p class="font-semibold">${found.brand} ${found.code} - ${found.name}</p>
          <p class="text-sm text-gray-600">Mã màu: ${found.hex}</p>
        </div>
      </div>
    `;
  } else {
    document.getElementById('result').innerHTML = `<p class="text-red-600">Không tìm thấy mã chỉ này.</p>`;
  }
});

// Chọn màu từ ảnh
const imgInput = document.getElementById('imgInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

imgInput.onchange = e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width; canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
  const d = ctx.getImageData(x, y, 1, 1).data;
  const hex = `#${[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('')}`;
  findNearestColor(hex);
});
