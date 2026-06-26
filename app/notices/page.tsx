interface BulletinNotice {
  id: number;
  title: string;
  date: string;
  category: "Academic Calendar" | "School Holiday" | "General Bulletin";
  content: string;
  urgent: boolean;
}

export default function NoticesPage() {
  // Pure production array mapped to the authentic 38-week academic framework
  const bulletinsData: BulletinNotice[] = [
    {
      id: 1,
      title: "Trimester 3 Report Cards & Student Portfolios Ready for Pickup",
      date: "June 2026",
      category: "Academic Calendar",
      content: "Official student report cards, diagnostic evaluation summaries, and academic progress books are finalized. Parents can retrieve hardcopies from the main registry office desk at Gihosha upon clearance with the finance desk.",
      urgent: true,
    },
    {
      id: 2,
      title: "IOWA Standardized Testing Registration & Scheduling Notice",
      date: "August 2026",
      category: "Academic Calendar",
      content: "Scheduling blocks for the upcoming IOWA Test of Basic Skills and High School tracking diagnostics are now pinned. Grade placement test dates for incoming primary students can be finalized through the Registry Desk.",
      urgent: false,
    },
    {
      id: 3,
      title: "Annual Parent-Teacher Association Fellowship Assembly",
      date: "September 2026",
      category: "General Bulletin",
      content: "Our trimester-opening fellowship session will convene in the central assembly hall. Mrs. Joy Johnson will lead discussion paths reviewing new US Common Core instructional materials and upcoming cross-city bus route transport additions.",
      urgent: false,
    },
  ];

  return (
    <div className="py-12 bg-school-bgLight">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Section Title Banner */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Official Communications</span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-school-blue">
            Announcements & Notices
          </h1>
          <div className="w-12 h-1 bg-school-orange mx-auto rounded-full" />
          <p className="text-sm text-slate-500 pt-2 max-w-lg mx-auto leading-relaxed">
            Stay up to date with trimester scheduling changes, standardized testing calendars, and official administrative bulletins from the desk of the Director.
          </p>
        </div>

        {/* Notice Items Layout Stack */}
        <div className="space-y-6">
          {bulletinsData.map((notice) => (
            <div 
              key={notice.id}
              className={`bg-white p-6 rounded-xl border transition-all ${
                notice.urgent ? "border-red-200 bg-red-50/10 shadow-sm" : "border-slate-100 shadow-sm"
              }`}
            >
              {/* Header Segment */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded ${
                    notice.category === "School Holiday" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                    notice.category === "Academic Calendar" ? "bg-blue-50 text-school-blue border border-blue-200" :
                    "bg-slate-50 text-slate-600 border border-slate-200"
                  }`}>
                    {notice.category}
                  </span>
                  
                  {notice.urgent && (
                    <span className="animate-pulse bg-red-500 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                      ⚠️ Urgent Notice
                    </span>
                  )}
                </div>
                
                <span className="text-xs text-slate-400 font-medium">
                  {notice.date}
                </span>
              </div>

              {/* Body Content Node */}
              <div className="pt-4 space-y-2">
                <h3 className="font-bold text-base text-school-blue tracking-tight">
                  {notice.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {notice.content}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}