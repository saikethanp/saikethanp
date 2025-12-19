
import React from 'react';

const Watermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center opacity-[0.03] select-none rotate-[-45deg]">
      <div className="text-[20vw] font-black whitespace-nowrap uppercase tracking-tighter">
        kethanstudios
      </div>
    </div>
  );
};

export default Watermark;
