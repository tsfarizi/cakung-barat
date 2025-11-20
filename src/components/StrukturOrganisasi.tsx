import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import orgData from '../data/struktur';
import type { Member } from '../data/struktur';

const CARD_WIDTH = 220;
const CARD_HEIGHT = 100;

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const getRoleColor = (role: Member['role']) => {
    switch (role) {
      case 'lurah': return 'border-l-4 border-blue-500';
      case 'sekretaris': return 'border-l-4 border-green-500';
      case 'kasi': return 'border-l-4 border-orange-500';
      case 'bendahara':
      case 'pengurus': return 'border-l-4 border-purple-500';
      default: return 'border-l-4 border-gray-500';
    }
  };

  return (
    <div
      className={`absolute bg-white rounded-xl p-3 shadow-md hover:shadow-xl transition-all duration-300 z-20 flex flex-col justify-center group ${getRoleColor(member.role)}`}
      style={{
        left: `${member.x}px`,
        top: `${member.y}px`,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
          {member.photo && member.photo !== 'foto' ? (
            <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400 font-medium">FOTO</span>
          )}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="font-bold text-sm text-gray-800 truncate">{member.name || "-"}</div>
          <div className="text-xs text-gray-500 leading-tight mt-0.5 line-clamp-2">{member.position}</div>
        </div>
      </div>
    </div>
  );
};

const Lines: React.FC = () => {
  // Helper to get center top/bottom connection points
  const getPoints = (member: Member) => ({
    top: { x: member.x + CARD_WIDTH / 2, y: member.y },
    bottom: { x: member.x + CARD_WIDTH / 2, y: member.y + CARD_HEIGHT },
  });

  const members = orgData;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
        </marker>
      </defs>

      {members.map(parent => {
        const children = members.filter(m => m.parentId === parent.id);
        if (children.length === 0) return null;

        const pPts = getPoints(parent);

        return (
          <React.Fragment key={parent.id}>
            {children.map(child => {
              const cPts = getPoints(child);
              // Calculate mid-y for ortholinear routing
              // If child is directly below, midY is halfway.
              // If child is far down, maybe we need a specific offset?
              // For now, let's try a fixed offset from parent bottom or dynamic based on vertical distance.
              const verticalGap = cPts.top.y - pPts.bottom.y;
              const midY = pPts.bottom.y + (verticalGap / 2);

              return (
                <path
                  key={`${parent.id}-${child.id}`}
                  d={`M ${pPts.bottom.x} ${pPts.bottom.y} V ${midY} H ${cPts.top.x} V ${cPts.top.y}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  className="opacity-50"
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

const StrukturOrganisasi: React.FC = () => {
  return (
    <section className="py-10 px-5 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Struktur Organisasi</h2>
        <p className="text-gray-600 mb-8">Kelurahan Cakung Barat</p>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-[700px] border border-gray-200">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
          <TransformWrapper
            initialScale={0.8}
            minScale={0.5}
            maxScale={2}
            limitToBounds={true}
            centerOnInit={true}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-4 right-4 z-30 flex gap-2">
                  <button onClick={() => zoomIn()} className="bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors font-bold text-xl" title="Zoom In">+</button>
                  <button onClick={() => zoomOut()} className="bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors font-bold text-xl" title="Zoom Out">-</button>
                  <button onClick={() => resetTransform()} className="bg-white text-gray-700 w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 flex items-center justify-center transition-colors font-bold text-lg" title="Reset">⟳</button>
                </div>
                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
                  <div className="relative" style={{ width: '1400px', height: '800px' }}>
                    <Lines />
                    {orgData.map(member => (
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