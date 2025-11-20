export interface Member {
  id: number;
  name: string;
  position: string;
  photo: string;
  parentId: number | null;
  x: number;
  y: number;
  role: 'lurah' | 'sekretaris' | 'kasi' | 'staf' | 'bendahara' | 'pengurus';
}

const orgData: Member[] = [
  { id: 1, name: "", position: "Lurah", photo: "foto", parentId: null, x: 600, y: 30, role: 'lurah' },
  { id: 2, name: "", position: "Sekretaris Kelurahan", photo: "foto", parentId: 1, x: 1050, y: 180, role: 'sekretaris' },
  { id: 3, name: "", position: "Bendahara", photo: "foto", parentId: 2, x: 920, y: 380, role: 'bendahara' },
  { id: 4, name: "", position: "Pengurus Barang", photo: "foto", parentId: 2, x: 1180, y: 380, role: 'pengurus' },
  { id: 5, name: "", position: "Kasi Pemerintahan", photo: "foto", parentId: 1, x: 80, y: 380, role: 'kasi' },
  { id: 6, name: "", position: "Kasi Ekonomi Pembangunan", photo: "foto", parentId: 1, x: 370, y: 380, role: 'kasi' },
  { id: 7, name: "", position: "Kasi Kesejahteraan Rakyat", photo: "foto", parentId: 1, x: 660, y: 380, role: 'kasi' },
  { id: 8, name: "", position: "Staf Pemerintahan", photo: "foto", parentId: 5, x: 80, y: 600, role: 'staf' },
  { id: 9, name: "", position: "Staf Ekonomi Pembangunan", photo: "foto", parentId: 6, x: 370, y: 600, role: 'staf' },
  { id: 10, name: "", position: "Staf Kesejahteraan Rakyat", photo: "foto", parentId: 7, x: 660, y: 600, role: 'staf' }
];

export default orgData;