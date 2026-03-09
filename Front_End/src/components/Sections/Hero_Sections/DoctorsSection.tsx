import { Star, ArrowRight } from 'lucide-react';

const TERRA = '#C4521A';
const AMBER = '#C8960A';

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'CARDIOLOGIST',
    experience: '15+ years',
    rating: 4.9,
    reviews: 312,
    accentColor: TERRA,
    bio: 'Board-certified cardiologist from Johns Hopkins. Specialises in preventive cardiology and remote cardiac monitoring.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Dr. James Anderson',
    specialty: 'GENERAL PRACTITIONER',
    experience: '12+ years',
    rating: 4.8,
    reviews: 528,
    accentColor: AMBER,
    bio: 'Your go-to for everything from annual check-ups to chronic condition management. Fluent in English and Spanish.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    name: 'Dr. Emily Chen',
    specialty: 'PEDIATRICIAN',
    experience: '10+ years',
    rating: 5.0,
    reviews: 207,
    accentColor: TERRA,
    bio: "Dedicated to children's health from newborn to adolescence. Known for her calm demeanour and thorough assessments.",
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
];

const DoctorsSection = () => (
  <div className="space-y-16">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      <div className="space-y-6 max-w-xl">
        <div className="text-xs tracking-[0.25em] text-[#A89080]">OUR DOCTORS</div>
        <h2 className="serif text-5xl lg:text-6xl leading-tight text-[#2C1810]">
          Real doctors,<br />
          <span style={{ color: AMBER }} className="italic">real credentials</span>
        </h2>
        <p className="text-base leading-relaxed text-[#7A6458]">
          Every practitioner on MedEdge is individually verified — licence, malpractice history and patient reviews checked before they see a single patient.
        </p>
        <div className="h-px w-24" style={{ backgroundColor: AMBER }} />
      </div>

      <div className="flex items-center gap-6 p-6 rounded-sm border border-[#EDE5DF] bg-white self-start lg:self-end">
        <div className="text-center">
          <div className="serif text-4xl" style={{ color: TERRA }}>1,200+</div>
          <div className="text-xs tracking-[0.2em] mt-1 text-[#7A6458]">VERIFIED DOCTORS</div>
        </div>
        <div className="w-px h-12 bg-[#EDE5DF]" />
        <div className="text-center">
          <div className="serif text-4xl" style={{ color: AMBER }}>40+</div>
          <div className="text-xs tracking-[0.2em] mt-1 text-[#7A6458]">SPECIALTIES</div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {doctors.map((doc, i) => (
        <div key={i} className="group overflow-hidden rounded-sm border border-[#EDE5DF] bg-white transition-all duration-300 hover:shadow-xl">
          <div className="h-1" style={{ backgroundColor: doc.accentColor }} />
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=EDE5DF&color=2C1810&size=400`;
              }}
            />
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-xs tracking-[0.2em] mb-1 text-[#A89080]">{doc.specialty}</div>
              <h3 className="text-xl serif text-[#2C1810]">{doc.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#7A6458]">{doc.bio}</p>
            <div className="flex items-center justify-between pt-4 border-t border-[#EDE5DF]">
              <div className="text-sm text-[#7A6458]">{doc.experience}</div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4" style={{ fill: doc.accentColor, color: doc.accentColor }} />
                <span className="text-sm font-medium text-[#2C1810]">{doc.rating}</span>
                <span className="text-xs text-[#7A6458]">({doc.reviews})</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center">
      <button className="group inline-flex items-center gap-3 text-sm text-[#7A6458] hover:text-[#2C1810] transition-colors">
        Browse all 1,200+ doctors
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

export default DoctorsSection;