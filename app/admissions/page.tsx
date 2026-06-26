export default function AdmissionsPage() {
  return (
    <div className="py-12 bg-school-bgLight">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-school-orange">Join Our Family</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-school-blue">
            Admissions & Enrollment
          </h1>
          <div className="w-16 h-1 bg-school-orange mx-auto rounded-full" />
        </div>

        {/* Real-World Statistics Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg text-school-blue">Our Campus Matrix By The Numbers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discovery School Burundi operates an expansive, resource-rich environment designed for complete academic success and individualized instruction benchmarks.
            </p>
          </div>
          <div className="flex justify-center select-none">
            <img src="/staff-numbers.png" alt="Discovery School Growth Statistics Chart" className="max-w-xs object-contain" />
          </div>
        </div>

        {/* The 3-Step Enrollment Timeline */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-8">
          <h2 className="text-xl font-bold text-school-blue border-b border-slate-100 pb-3">
            📝 Registration Pathway
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-school-blue text-white rounded-lg flex items-center justify-center font-bold text-xs shadow">01</div>
              <h3 className="text-sm font-bold text-school-blue">Submit Documents</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Bring the student's birth certificate and previous official report cards to our Gihosha campus registry.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-school-orange text-white rounded-lg flex items-center justify-center font-bold text-xs shadow">02</div>
              <h3 className="text-sm font-bold text-school-blue">Readiness Assessment</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Prospective students complete a short diagnostic evaluation to ensure proper grade level placement.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-school-teal text-white rounded-lg flex items-center justify-center font-bold text-xs shadow">03</div>
              <h3 className="text-sm font-bold text-school-blue">Confirmation</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Upon clearance of administrative prerequisites, the family receives an official admission notice.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Notice Card with Authentic Bank Channels */}
        <div className="bg-slate-900 text-white p-8 rounded-xl shadow-md space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-school-orange tracking-widest bg-school-orange/10 px-2 py-1 rounded border border-school-orange/20 inline-block">
              Tuition Clearance Channels
            </span>
            <h4 className="text-lg font-bold">Authorized Banking & Mobile Partnerships</h4>
          </div>
          
          <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
            Discovery School accepts direct school fees clearance via verified mobile banking channels—including **EcoCash, Lumicash**, and official over-the-counter institutional transactions at our partner banking halls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded p-1 flex-shrink-0">
                <img src="/bancobu.png" alt="Bancobu Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-xs block text-white">Bancobu eNoti</span>
                <span className="text-[10px] text-slate-400">Clearance via standard institutional biller codes.</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded p-1 flex-shrink-0">
                <img src="/bcb.png" alt="BCB Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold text-xs block text-white">BCB Channels</span>
                <span className="text-[10px] text-slate-400">Direct school treasury deposit support routing.</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-slate-300 text-center">
            Need billing assistance? Call our financial desk directly at: <span className="text-school-orange font-bold">22 23 16 55</span>
          </div>
        </div>

      </div>
    </div>
  );
}