import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
    const colorMap = {
      indigo: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
      green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      yellow: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
    };

    return (
        <div className='glass-card rounded-2xl p-6 border border-white/10 flex items-center justify-between transition-all'>
            <div>
                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1'>{title}</p>
                <p className='text-2xl font-extrabold text-white tracking-tight'>
                    {value}
                </p>
            </div>
            <div className={`size-12 rounded-2xl border flex items-center justify-center ${colorMap[color] || colorMap.indigo}`}>
                {icon}
            </div>
        </div>
    );
};

export default StatCard;
