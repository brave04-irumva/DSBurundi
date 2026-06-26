export default function AboutPage() {
  return (
    <div className="py-12 bg-school-bgLight">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Who We Are</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-school-blue">
            About Our Institution
          </h1>
          <div className="w-16 h-1 bg-school-orange mx-auto rounded-full" />
        </div>

        {/* Foundation Statement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-school-orange uppercase tracking-wider block">School&apos;s Slogan</span>
            <h2 className="text-2xl font-black text-school-blue tracking-tight">Rooted in Christ, Ready for Tomorrow.</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discovery School Burundi provides a comprehensive nursery through four-year high school program using an authentic American educational methodology tailored to empower international students within East Africa.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-school-blue">
              <p className="text-xs font-medium text-school-blue italic">
                "Blessed is the man who trusts in the Lord, whose trust is the Lord. He is like a tree planted by water, that sends out its roots by the stream..." — Jeremiah 17:7-8
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100 h-64">
            <img src="/ds-assembly.jpg" alt="Discovery School Student Body Assembly" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Core Institutional Objectives Mapped from Old Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-black text-base text-school-blue">🎯 Our Mission Vision</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              To operate a high-caliber educational framework that enables children to develop exceptional academic skillsets, robust critical logic capabilities, and deep, lasting spiritual growth grounded firmly in global biblical truths.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-black text-base text-school-blue">✨ Academic Strategy</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Aligning classroom metrics directly with accredited international benchmarks while utilizing modern learning spaces, comprehensive lab practicals, and professional testing modules.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}