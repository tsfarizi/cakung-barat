document.getElementById('strukturForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    lurah: document.getElementById('lurah').value,
    sekretaris: document.getElementById('sekretaris').value,
    staff: document.getElementById('staff').value.split(',')
  };
  localStorage.setItem('struktur', JSON.stringify(data));
  alert('Struktur berhasil disimpan!');
});

const data = JSON.parse(localStorage.getItem('struktur'));
if (data) {
  document.getElementById('strukturDisplay').innerHTML = `
    <p><strong>Lurah:</strong> ${data.lurah}</p>
    <p><strong>Sekretaris:</strong> ${data.sekretaris}</p>
    <h4>Staf:</h4>
    <ul>${data.staff.map(n => `<li>${n.trim()}</li>`).join('')}</ul>
  `;
} else {
  document.getElementById('strukturDisplay').innerHTML = `<p>Belum ada data struktur organisasi.</p>`;
}
