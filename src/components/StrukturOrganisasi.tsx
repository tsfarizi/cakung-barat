import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'https://cakung-barat-server-1065513777845.asia-southeast2.run.app';

// Server API response type
interface OrganizationMember {
  id: number;
  name: string | null;
  position: string;
  photo: string | null;
  parent_id: number | null;
  level: number;
  role: string;
}

// Client-side type with calculated positions
interface Member {
  id: number;
  name: string;
  position: string;
  photo: string;
  parentId: number | null;
  x: number;
  y: number;
  role: 'lurah' | 'sekretaris' | 'kasi' | 'staf' | 'bendahara' | 'pengurus';
}

const CARD_WIDTH = 220;
const CARD_HEIGHT = 100;

// Calculate positions based on level and index
function calculatePositions(members: OrganizationMember[]): Member[] {
  // Group members by level
  const levelGroups = new Map<number, OrganizationMember[]>();
  members.forEach(m => {
    const group = levelGroups.get(m.level) || [];
    group.push(m);
    levelGroups.set(m.level, group);
  });

  // Y position by level
  const levelY: Record<number, number> = {
    0: 30,    // Top (Lurah)
    1: 180,   // Second row (Sekretaris)
    2: 380,   // Third row (Kasi, Bendahara, etc)
    3: 600,   // Fourth row (Staff)
  };

  const positioned: Member[] = [];
  const containerWidth = 1400;

  // Process each level
  for (const [level, group] of levelGroups) {
    const y = levelY[level] || (level * 200 + 30);
    const count = group.length;
    const spacing = Math.min(280, (containerWidth - 100) / (count + 1));
    const startX = (containerWidth - (count - 1) * spacing) / 2 - CARD_WIDTH / 2;

    group.forEach((member, index) => {
      positioned.push({
        id: member.id,
        name: member.name || '',
        position: member.position,
        photo: member.photo || 'foto',
        parentId: member.parent_id,
        x: startX + index * spacing,
        y: y,
        role: member.role as Member['role'],
      });
    });
  }

  return positioned;
}

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

const Lines: React.FC<{ members: Member[] }> = ({ members }) => {
  const getPoints = (member: Member) => ({
    top: { x: member.x + CARD_WIDTH / 2, y: member.y },
    bottom: { x: member.x + CARD_WIDTH / 2, y: member.y + CARD_HEIGHT },
  });

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
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/organization`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: OrganizationMember[] = await response.json();
        const positioned = calculatePositions(data);
        setMembers(positioned);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch organization:', err);
        setError('Gagal memuat data struktur organisasi');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  if (loading) {
    return (
      <section className="py-10 px-5 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Struktur Organisasi</h2>
          <p className="text-gray-600 mb-8">Kelurahan Cakung Barat</p>
          <div className="bg-white rounded-2xl shadow-xl h-[400px] flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-5 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Struktur Organisasi</h2>
          <p className="text-gray-600 mb-8">Kelurahan Cakung Barat</p>
          <div className="bg-white rounded-2xl shadow-xl h-[400px] flex items-center justify-center">
            <div className="text-red-500 text-center">
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (members.length === 0) {
    return (
      <section className="py-10 px-5 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Struktur Organisasi</h2>
          <p className="text-gray-600 mb-8">Kelurahan Cakung Barat</p>
          <div className="bg-white rounded-2xl shadow-xl h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Belum ada data struktur organisasi</p>
          </div>
        </div>
      </section>
    );
  }

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
                    <Lines members={members} />
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