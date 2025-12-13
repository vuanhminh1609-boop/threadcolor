function normalizeHex(hex) {
  if (!hex || typeof hex !== "string") return null;

  hex = hex.trim().toLowerCase();

  // sửa ##xxxxxx → #xxxxxx
  hex = hex.replace(/^##/, "#");

  // thêm # nếu thiếu
  if (!hex.startsWith("#")) {
    hex = "#" + hex;
  }

  // kiểm tra hợp lệ
  if (!/^#[0-9a-f]{6}$/.test(hex)) {
    return null;
  }

  return hex;
}
function hexToRgbArray(hex) {
  const num = parseInt(hex.slice(1), 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}
function rgbToLab([r, g, b]) {
  r /= 255; g /= 255; b /= 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x) + 16 / 116;
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y) + 16 / 116;
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z) + 16 / 116;

  return [
    +(116 * y - 16).toFixed(2),
    +(500 * (x - y)).toFixed(2),
    +(200 * (y - z)).toFixed(2)
  ];
}

let threads = [];
let isDataReady = false;

const resultBox = document.getElementById("result");

resultBox.innerHTML =
  "<p class='text-gray-600 text-center'>Đang tải dữ liệu màu…</p>";

// ⬇️ BẮT ĐẦU FETCH DỮ LIỆU
fetch("threads.json")
  .then(res => res.json())
  .then(data => {
    // xử lý dữ liệu
  })
  .catch(err => {
    console.error(err);
  });




// Nạp dữ liệu từ threads.json
fetch("threads.json")
  .then(res => res.json())
  .then(data => {
    threads = data
      .map(t => {
        const hex = normalizeHex(t.hex);
        if (!hex) return null;

        const rgb = hexToRgbArray(hex);
        const lab = rgbToLab(rgb);

        return { ...t, hex, rgb, lab };
      })
      .filter(Boolean);

    isDataReady = true;
resultBox.innerHTML =
      "<p class='text-green-600 text-center'>Dữ liệu màu đã sẵn sàng ✔</p>";

    console.log("Threads loaded:", threads.length);
  })
  .catch(err => {
    console.error("Lỗi tải threads.json:", err);
    alert("Không tải được dữ liệu màu!");
  });

function deltaE76(lab1, lab2) {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2
  );
}
function findNearestColors(chosenHex, limit = 10) {
  const chosenRgb = hexToRgbArray(normalizeHex(chosenHex));
  const chosenLab = rgbToLab(chosenRgb);

  return threads
    .map(t => ({
      ...t,
      delta: deltaE76(chosenLab, t.lab)
    }))
    .sort((a, b) => a.delta - b.delta)
    .slice(0, limit);
}
function groupByColorSimilarity(results, threshold = 2.5) {
  const groups = [];

  results.forEach(color => {
    let foundGroup = null;

    for (const group of groups) {
      const dE = deltaE76(color.lab, group.leader.lab);
      if (dE <= threshold) {
        foundGroup = group;
        break;
      }
    }

    if (foundGroup) {
      foundGroup.items.push(color);
    } else {
      groups.push({
        leader: color,
        items: [color]
      });
    }
  });

  return groups;
}

function showResults(results, chosenHex) {
  const result = document.getElementById("result");

  const rows = results.map((t, i) => `
    <tr class="border-b">
      <td class="p-2 text-center">${i + 1}</td>
      <td class="p-2">
        <div class="w-8 h-8 rounded mx-auto" style="background:${t.hex}"></div>
      </td>
      <td class="p-2 text-center">${t.brand}</td>
      <td class="p-2 text-center">${t.code}</td>
      <td class="p-2">${t.name}</td>
      <td class="p-2 text-center">${t.delta.toFixed(2)}</td>
    </tr>
  `).join("");

  result.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded" style="background:${chosenHex}"></div>
      <div class="font-semibold">Màu đã chọn</div>
    </div>

    <table class="w-full border text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">#</th>
          <th class="p-2">Màu</th>
          <th class="p-2">Hãng</th>
          <th class="p-2">Mã</th>
          <th class="p-2">Tên</th>
          <th class="p-2">ΔE</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function showGroupedResults(groups, chosenHex) {
  const result = document.getElementById("result");

  const html = groups.map((group, idx) => `
    <div class="mb-6 p-4 border rounded-lg bg-gray-50">
      <div class="flex items-center gap-4 mb-2">
        <div class="w-10 h-10 rounded" style="background:${group.leader.hex}"></div>
        <div class="font-semibold">
          Nhóm ${idx + 1} – ${group.items.length} màu
        </div>
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr>
            <th class="p-1">Hãng</th>
            <th class="p-1">Mã</th>
            <th class="p-1">Tên</th>
            <th class="p-1">ΔE</th>
          </tr>
        </thead>
        <tbody>
          ${group.items.map(t => `
            <tr class="border-t">
              <td class="p-1">${t.brand}</td>
              <td class="p-1">${t.code}</td>
              <td class="p-1">${t.name}</td>
              <td class="p-1">${t.delta.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `).join("");

  result.innerHTML = `
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded" style="background:${chosenHex}"></div>
      <div class="font-semibold">Màu đã chọn</div>
    </div>
    ${html}
  `;
}


/*
=============================
PIPELINE CŨ – KHÔNG DÙNG
RGB / 1 kết quả
=============================
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
  const chosenRgb = hexToRgbArray(normalizeHex(chosenHex));
  const chosenLab = rgbToLab(chosenRgb);

  let nearest = threads[0];
  let minDelta = deltaE76(chosenLab, nearest.lab);

  threads.forEach(t => {
    const dE = deltaE76(chosenLab, t.lab);
    if (dE < minDelta) {
      minDelta = dE;
      nearest = t;
    }
  });

  showResult(nearest, chosenHex, minDelta);
}

// Hiển thị kết quả
function showResult(thread, chosenHex, delta) {
  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="flex gap-4 items-center">
      <div class="w-20 h-20 rounded" style="background:${chosenHex}"></div>
      <div class="text-xl">→</div>
      <div class="w-20 h-20 rounded" style="background:${thread.hex}"></div>
    </div>

    <p class="mt-4"><strong>Hãng:</strong> ${thread.brand}</p>
    <p><strong>Mã:</strong> ${thread.code}</p>
    <p><strong>Tên:</strong> ${thread.name}</p>
    <p><strong>ΔE:</strong> ${delta.toFixed(2)}</p>
  `;
}
*/

// Sự kiện nút tìm màu từ color picker
document.getElementById('btnFindNearest').addEventListener('click', () => {
  if (!isDataReady) {
    alert("Dữ liệu màu chưa tải xong, vui lòng đợi!");
    return;
  }

  const color = document.getElementById('colorPicker').value;

  const results = findNearestColors(color, 10);
  const groups = groupByColorSimilarity(results, 2.5);
  showGroupedResults(groups, color);
});


// Tra ngược theo mã
document.getElementById('btnFindByCode').addEventListener('click', () => {
if (!isDataReady) {
  alert("Dữ liệu màu chưa tải xong, vui lòng đợi!");
  return;
}

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
  if (!isDataReady) {
    alert("Dữ liệu màu chưa tải xong, vui lòng đợi!");
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
  const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
  const d = ctx.getImageData(x, y, 1, 1).data;

  const hex = `#${[d[0], d[1], d[2]]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('')}`;

  const results = findNearestColors(hex, 10);
  const groups = groupByColorSimilarity(results, 2.5);
  showGroupedResults(groups, hex);
});

