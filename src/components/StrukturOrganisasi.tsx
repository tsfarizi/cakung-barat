import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import orgData from '../data/struktur';
import type { Member } from '../data/struktur';


const members = orgData;

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div
    className="absolute bg-white rounded-xl p-3 shadow-lg text-center z-20 w-52 min-h-36 flex flex-col justify-center"
    style={{ left: `${member.x}px`, top: `${member.y}px` }}
  >
    <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-4 border-blue-400 bg-gray-200 flex items-center justify-center">
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
      ) : (
        <div className="text-4xl text-gray-400">👤</div>
      )}
    </div>
    <div className="font-bold text-sm text-gray-800">{member.name || member.position.split('\n')[0]}</div>
    <div
      className="text-xs text-gray-600 leading-tight mt-1"
      dangerouslySetInnerHTML={{ __html: member.position.replace(/\n/g, '<br />') }}
    />
  </div>
);

const Lines: React.FC = () => {
  const getCenter = (memberId: number) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return { x: 0, y: 0 };
    return { x: member.x + 104, y: member.y + 72 };
  };

  const L = getCenter(1);
  const S = getCenter(2);
  const B = getCenter(3);
  const P = getCenter(4);
  const K1 = getCenter(5);
  const K2 = getCenter(6);
  const K3 = getCenter(7);
  const ST1 = getCenter(8);
  const ST2 = getCenter(9);
  const ST3 = getCenter(10);

  const lineProps = {
    stroke: 'white',
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
  };

  const splitY = L.y + 80;
  const midY2 = S.y + 100;
  const midStaffY = K1.y + 100;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      {/* Main lines */}
      <line x1={L.x} y1={L.y + 40} x2={L.x} y2={splitY} {...lineProps} />
      <line x1={L.x} y1={splitY} x2={S.x} y2={splitY} {...lineProps} />
      <line x1={S.x} y1={splitY} x2={S.x} y2={S.y - 40} {...lineProps} />

      {/* Sekretaris branch */}
      <line x1={S.x} y1={S.y + 40} x2={S.x} y2={midY2} {...lineProps} />
      <line x1={B.x} y1={midY2} x2={P.x} y2={midY2} {...lineProps} />
      <line x1={B.x} y1={midY2} x2={B.x} y2={B.y - 40} {...lineProps} />
      <line x1={P.x} y1={midY2} x2={P.x} y2={P.y - 40} {...lineProps} />

      {/* Kasi branch */}
      <line x1={K1.x} y1={splitY} x2={K3.x} y2={splitY} {...lineProps} />
      <line x1={K1.x} y1={splitY} x2={K1.x} y2={K1.y - 40} {...lineProps} />
      <line x1={K2.x} y1={splitY} x2={K2.x} y2={K2.y - 40} {...lineProps} />
      <line x1={K3.x} y1={splitY} x2={K3.x} y2={K3.y - 40} {...lineProps} />

      {/* Staf branch */}
      <line x1={ST1.x} y1={midStaffY} x2={ST3.x} y2={midStaffY} {...lineProps} />
      <line x1={K1.x} y1={K1.y + 40} x2={ST1.x} y2={midStaffY} {...lineProps} />
      <line x1={K2.x} y1={K2.y + 40} x2={ST2.x} y2={midStaffY} {...lineProps} />
      <line x1={K3.x} y1={K3.y + 40} x2={ST3.x} y2={midStaffY} {...lineProps} />
      <line x1={ST1.x} y1={midStaffY} x2={ST1.x} y2={ST1.y - 40} {...lineProps} />
      <line x1={ST2.x} y1={midStaffY} x2={ST2.x} y2={ST2.y - 40} {...lineProps} />
      <line x1={ST3.x} y1={midStaffY} x2={ST3.x} y2={ST3.y - 40} {...lineProps} />
    </svg>
  );
};

const StrukturOrganisasi: React.FC = () => {
  // Import logo image
  const logoImg = '/cakung-barat/logo.png';
  
  return (
    <section className="py-10 px-5 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Struktur Organisasi</h2>
        <p className="text-gray-600 mb-8">Kelurahan Cakung Barat</p>
        <div className="bg-linear-to-b from-accent to-blue-700 rounded-2xl p-2 md:p-10 shadow-inner overflow-hidden relative">
            <TransformWrapper
                initialScale={0.7}
                minScale={0.5}
                maxScale={3}
                limitToBounds={true}
                centerOnInit={true}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="absolute top-2 left-2 z-30 p-2">
                            <button onClick={() => zoomIn()} className="bg-white text-black w-8 h-8 rounded-md shadow-md mr-2 font-bold">+</button>
                            <button onClick={() => zoomOut()} className="bg-white text-black w-8 h-8 rounded-md shadow-md mr-2 font-bold">-</button>
                            <button onClick={() => resetTransform()} className="bg-white text-black w-8 h-8 rounded-md shadow-md font-bold">⟳</button>
                        </div>
                        <TransformComponent wrapperStyle={{ width: '100%', height: '600px' }} contentStyle={{ width: '1400px' }}>
                            <div className="relative mx-auto" style={{ height: '900px', width: '1400px' }}>
                                <div className="absolute top-5 left-5 w-20 h-20 bg-white rounded-xl p-1 shadow-lg flex items-center justify-center">
                                    <img 
                                  src={logoImg} 
                                  alt="Logo Cakung Barat" 
                                  className="w-full h-full object-contain" 
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><rect width="24" height="24" fill="%239CCDDC"/><text x="12" y="16" font-family="Arial" font-size="14" fill="white" text-anchor="middle">CB</text></svg>';
                                  }} 
                                />
                                </div>
                                <Lines />
                                {members.map(member => (
                                    <MemberCard key={member.id} member={member} />
                                ))}
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;