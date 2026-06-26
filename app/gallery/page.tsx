interface ProgramDetail {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: "Campus" | "Graduation" | "Academics" | "Athletics";
  image: string;
  description: string;
}

export default function GalleryPage() {
  const studentLifePrograms: ProgramDetail[] = [
    {
      id: "spiritual",
      title: "Spiritual Life",
      icon: "⛪",
      description: "Rooted firmly in Christian stewardship. Students participate in weekly integrated chapel services, scriptural focus blocks, and daily classroom devotionals to cultivate a deep relationship with Jesus Christ.",
    },
    {
      id: "athletics",
      title: "School Athletics",
      icon: "⚽",
      description: "Fostering teamwork, discipline, and physical fitness through structured team sports and playground group physical education across our campus facilities.",
    },
    {
      id: "arts",
      title: "Fine Arts & Expression",
      icon: "🎨",
      description: "Encouraging creative exploration in early childhood and primary divisions through tactile arts, sketching, crafts, and festive musical showcases.",
    },
    {
      id: "tech",
      title: "Technology Skills",
      icon: "💻",
      description: "Developing critical digital literacy and computational logic inside our dedicated IT laboratory spaces, equipping secondary levels for modern technical challenges.",
    },
  ];

  const galleryData: GalleryItem[] = [
    {
      id: 1,
      title: "Gihosha Campus Birdview Layout",
      category: "Campus",
      image: "/ds-birdview.jpg",
      description: "Our safe, structured 6-acre urban campus infrastructure layout situated in northern Bujumbura.",
    },
    {
      id: 2,
      title: "Class of 2022 Graduation Ceremony",
      category: "Graduation",
      image: "/grad-22.jpg",
      description: "Celebrating our senior secondary graduates moving on to premium higher university programs.",
    },
    {
      id: 3,
      title: "Commencement Assembly Cohort Shot",
      category: "Graduation",
      image: "/grad-22-shot.jpg",
      description: "High school student honors award ceremonies reflecting our core values: Rooted in Christ, Ready for Tomorrow.",
    },
    {
      id: 4,
      title: "Structured Team Sports Training",
      category: "Athletics",
      image: "/ds-sport.jpg",
      description: "Physical conditioning and athletic development programs built directly into the student schedules.",
    },
    {
      id: 5,
      title: "Morning Institutional Student Gathering",
      category: "Campus",
      image: "/ds-assembly.jpg",
      description: "Daily devotionals and community alignments gathered on the primary playground grounds.",
    },
  ];

  return (
    <div className="py-12 bg-school-bgLight">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Campus Vitality</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-school-blue">
            Student Life & Gallery
          </h1>
          <div className="w-16 h-1 bg-school-orange mx-auto rounded-full" />
          <p className="text-sm text-slate-500 pt-2 leading-relaxed">
            Discover how high academic standards blend with deep spiritual enrichment, arts, and physical training within our student community.
          </p>
        </div>

        {/* Core Student Programs Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-school-blue border-b-2 border-slate-200 pb-2">
            Core Student Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studentLifePrograms.map((program) => (
              <div key={program.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                  {program.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-base text-school-blue">{program.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Photo Grid Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-school-blue border-b-2 border-slate-200 pb-2">
            Campus Highlights & Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-56 bg-slate-100 relative overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded text-white bg-school-blue shadow-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 flex-grow space-y-1">
                  <h3 className="font-bold text-sm text-school-blue tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}