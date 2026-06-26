export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Canvas with Fixed Birdview Image Background */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 px-6 md:py-40 overflow-hidden"
        style={{ backgroundImage: "linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7)), url('/ds-assembly.jpg')" }}
      >
        <div className="absolute right-0 top-0 w-96 h-96 bg-school-orange opacity-20 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wider text-school-orange uppercase mx-auto">
            <span>✨ National Association of Private Schools (NAPS) Accredited</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight drop-shadow-sm">
            Rooted in Christ,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-school-orange to-amber-400">
              Ready for Tomorrow
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow">
            Discovery School Burundi is an American-system Christian Pre-school, Primary, and Secondary school operating a comprehensive nursery through four-year high school program in Bujumbura.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="/admissions" 
              className="w-full sm:w-auto px-8 py-3.5 bg-school-orange hover:bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-200 text-center transform hover:-translate-y-0.5"
            >
              Admissions Info
            </a>
            <a 
              href="/curriculum" 
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white/40 hover:border-white/80 transition-all duration-200 text-center backdrop-blur-sm"
            >
              Academics & Schedules
            </a>
          </div>
        </div>
      </section>

      {/* Institutional Credentials - Large Hero Logos */}
      <section className="bg-white border-b border-slate-200/60 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Institutional Identity</span>
            <h2 className="text-2xl md:text-3xl font-black text-school-blue tracking-tight">
              Fully Accredited International Standing
            </h2>
            <div className="w-12 h-1 bg-school-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
            {/* Left Side: Massive NAPS Seal */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center select-none transform hover:scale-105 transition-transform duration-300 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                <img src="/naps-logo.png" alt="National Association of Private Schools Seal" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-grow">
                <h3 className="font-black text-xl text-school-blue leading-snug">National Association of Private Schools</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our official NAPS member credentials fully validate our academic structures, curriculum mapping, and school transcript legitimacy against strict international standards.
                </p>
              </div>
            </div>

            {/* Right Side: Massive Real Discovery School Logo */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-48 h-48 flex-shrink-0 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2 select-none transform hover:scale-105 transition-transform duration-300 shadow-sm">
                <img src="/ds-logo.jpg" alt="Discovery School Burundi Official Emblem" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-2 text-center sm:text-left flex-grow">
                <h3 className="font-black text-xl text-school-blue leading-snug">Discovery School Emblem</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The official institutional emblem of Discovery School Burundi, representing our dedicated instructional presence and student body in Gihosha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: High-Impact Motto Section Using Your Lab Asset */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-28 px-6 text-white text-center"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.85)), url('/image_6cc402.jpg')" }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-school-orange uppercase bg-school-orange/10 px-3 py-1 rounded border border-school-orange/20 inline-block">
            Institutional Motto
          </span>
          <p className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto italic">
            "An investment in knowledge pays the best interest."
          </p>
          <div className="w-8 h-0.5 bg-school-orange mx-auto my-2 rounded-full" />
          <p className="text-sm font-bold tracking-wider uppercase text-slate-300">— Benjamin Franklin</p>
          
          <div className="pt-4">
            <a 
              href="/curriculum" 
              className="inline-block px-6 py-2.5 bg-school-orange hover:bg-amber-600 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
            >
              Explore Our Programs
            </a>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-school-blue/5 rounded-lg flex items-center justify-center text-xl font-bold mb-4">📖</div>
          <h3 className="text-xl font-bold text-school-blue mb-2">American Curriculum</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Program instruction based on the US Common Core Standards and Next Generation Science Standards, fully preparing graduates for college-level metrics.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-school-blue/5 rounded-lg flex items-center justify-center text-xl font-bold mb-4">⛪</div>
          <h3 className="text-xl font-bold text-school-blue mb-2">Faith Foundation</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our vision is explicitly built on Jeremiah 17:7-8 and John 15:5, leading students in a deep, transformative relationship with Jesus Christ.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-school-blue/5 rounded-lg flex items-center justify-center text-xl font-bold mb-4">🚌</div>
          <h3 className="text-xl font-bold text-school-blue mb-2">6-Acre Urban Campus</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Operating a sprawling urban campus site layout in northern Bujumbura, with dedicated cross-city school bus route transport systems.
          </p>
        </div>
      </section>

      {/* Address Label Contact Block */}
      <section className="bg-white border-t border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-school-orange block">Contact Us</span>
              <h2 className="text-2xl font-bold text-school-blue">Discovery School Registry</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Get in touch with our office support lines for inquiries regarding transcript authorizations, tuition details, or campus bus route mappings.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3 text-slate-600">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <span className="font-bold text-school-blue block text-xs">Address</span>
                  <span className="text-xs">7 Ave Bukiriro Ave, Bujumbura, Burundi</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-600">
                <span className="text-lg mt-0.5">📧</span>
                <div>
                  <span className="font-bold text-school-blue block text-xs">Email</span>
                  <span className="text-xs">info@discoveryschoolburundi.org</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-600">
                <span className="text-lg mt-0.5">📞</span>
                <div>
                  <span className="font-bold text-school-blue block text-xs">Tel</span>
                  <span className="text-xs">+257 22232059</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-school-bgLight p-6 rounded-xl border border-slate-200/60 space-y-4">
            <h3 className="font-bold text-sm text-school-blue">Send an Office Message</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Name</label>
                <input type="text" placeholder="Your Name" className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500">Phone</label>
                <input type="text" placeholder="Contact Number" className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 focus:outline-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500">Message</label>
              <textarea rows={3} placeholder="How can our administration team help you?" className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2.5 focus:outline-none resize-none" />
            </div>
            <button className="w-full py-2.5 bg-school-blue text-white font-bold text-xs rounded-lg shadow">
              Submit Message
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}