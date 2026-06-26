interface StaffMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export default function FacultyPage() {
  const leadership: StaffMember[] = [
    { id: 1, name: "Mrs. Joy Johnson", role: "Executive Director", image: "/joy.jpg" },
    { id: 2, name: "Mr. Lucien Iradukunda", role: "Administrative Director", image: "/lucien.jpg" },
    { id: 3, name: "Mr. Jesse Johnson", role: "Academic Dean / Instructor", image: "/jesse.jpg" },
  ];

  const instructors: StaffMember[] = [
    { id: 4, name: "Mr. Ezekiel Ndayisaba", role: "Secondary Instructor", image: "/ezekiel.jpg" },
    { id: 5, name: "Mr. Alain Niyomwungere", role: "Languages & Instruction", image: "/alain.jpg" },
    { id: 6, name: "Mr. Alexandre Nsengiyumva", role: "Science Department", image: "/alexandre.jpg" },
    { id: 7, name: "Mrs. Alice Nimbona", role: "Academic Director", image: "/alice.jpg" },
    { id: 8, name: "Mrs. Annonciate Ndayisenga", role: "Early Childhood Program", image: "/annonciate.jpg" },
    { id: 9, name: "Mr. Benard Ochieng", role: "Mathematics Instruction", image: "/benard.jpg" },
    { id: 10, name: "Mrs. Christella Ciza", role: "Elementary Program Support", image: "/christella.jpg" },
    { id: 11, name: "Mr. Donatien Nsengiyumva", role: "Administrative Desk Operations", image: "/donatien.jpg" },
    { id: 12, name: "Mrs. Esperance Niyonzima", role: "Registrar Desk Registry", image: "/esperance.jpg" },
    { id: 13, name: "Mr. Gerard Ndayishimiye", role: "Student Affairs Counselor", image: "/gerard.jpg" },
  ];

  return (
    <div className="py-12 bg-school-bgLight">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Our Educators</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-school-blue">
            Faculty & Administration
          </h1>
          <div className="w-16 h-1 bg-school-orange mx-auto rounded-full" />
        </div>

        {/* Executive Administration Block */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-school-blue border-b-2 border-slate-200 pb-2">
            Executive Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {leadership.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-center p-8 space-y-4 hover:border-school-blue/30 transition-colors">
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border-4 border-school-blue shadow-sm bg-slate-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-lg text-school-blue tracking-tight">{member.name}</h3>
                  <p className="text-xs font-bold text-school-orange uppercase tracking-wider bg-orange-50 inline-block px-3 py-1 rounded">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Teaching Staff Block */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-school-blue border-b-2 border-slate-200 pb-2">
            Instructional Faculty
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {instructors.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-center p-6 space-y-4 hover:border-school-orange/30 transition-colors">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-slate-300 bg-slate-50">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-base text-school-blue tracking-tight leading-tight">{member.name}</h4>
                  <p className="text-xs font-semibold text-slate-600 bg-slate-100 inline-block px-2.5 py-0.5 rounded mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}