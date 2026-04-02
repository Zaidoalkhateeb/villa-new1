const members = [
  {
    name: "Jamil AlKhlaif",
    role: "Managing Director",
    desc: "A visionary leader, guiding the company’s growth and setting the standard for luxury villa development—driven by quality, innovation, and client satisfaction.",
    imageSrc: "/jamil-khalif.jpg",
  },
  {
    name: "Noor Alyyan",
    role: "Sales Executive",
    desc: "Part of a distinguished sales team, providing premium residential consultations and ensuring an exceptional client experience from selection to handover.",
    imageSrc: "/Noor-Alayan.jpg",
  },
  {
    name: "Abeer",
    role: "Sales Executive",
    desc: "Part of a distinguished sales team, providing premium residential consultations and ensuring an exceptional client experience from selection to handover.",
    imageSrc: "/Abeer-Omran.jpg",
  },
  {
    name: "Ahmad Taha",
    role: "Financial Manager",
    desc: "A trusted financial leader, overseeing budgets, forecasting, and cost control to ensure every project is delivered efficiently, transparently, and with long-term value.",
    imageSrc: "/Ahmad-taha2.jpg",
  },
  {
    name: "Eng. Shaker Abu Jamous",
    role: "Projects Execution Manager",
    desc: "A distinguished professional at CCC – Al-Naht Al-Mutqan, with solid expertise in executing upscale residential developments to the highest standards.",
    imageSrc: "/Shaker-abu-jamous-2.jpg",
  },
] as const;

type TeamMember = (typeof members)[number];

function MemberCard({ member, className = "" }: { member: TeamMember; className?: string }) {
  return (
    <div
      className={`bg-[#0c0c0c] border border-gray-800 rounded-xl hover:border-yellow-500 transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.01] ${className}`}
    >
      {member.imageSrc && (
        <div className="relative overflow-hidden rounded-t-xl border-b border-gray-800 bg-black aspect-square">
          <img
            src={member.imageSrc}
            alt={member.name}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width={800}
            height={800}
            draggable={false}
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="font-serif text-lg mb-1">{member.name}</h3>
        <p className="text-yellow-600 font-serif text-xs tracking-wide mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
      </div>
    </div>
  );
}

/** Team section, with a highlighted managing director and a grid of members. */
export default function Team() {
  const managingDirector = members.find((m) => m.role === "Managing Director") ?? members[0];
  const nonManagingMembers = members.filter((m) => m !== managingDirector);

  return (
    <section id="team" className="bg-black text-white py-24 px-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-12 bg-yellow-400" />
          <p className="text-yellow-600 font-serif text-xs tracking-[0.3em]">
            THE PEOPLE BEHIND IT
          </p>
          <span className="h-px w-12 bg-yellow-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif">Our Team</h2>
      </div>

      {/* Single-line grid layout */}
      <div className="max-w-6xl mx-auto">
        <div className="max-w-md mx-auto">
          <MemberCard member={managingDirector} />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          {nonManagingMembers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>

    </section>
  );
}