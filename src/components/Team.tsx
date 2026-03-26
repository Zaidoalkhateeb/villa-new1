export default function Team() {
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
      name: "Abeer Omran",
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

  const managingDirector = members.find((m) => m.role === "Managing Director") ?? members[0];
  const salesMembers = members.filter((m) => m.role.toLowerCase().includes("sales"));
  const otherMembers = members.filter(
    (m) => m !== managingDirector && !m.role.toLowerCase().includes("sales"),
  );

  const MemberCard = ({
    member,
    className = "",
  }: {
    member: (typeof members)[number];
    className?: string;
  }) => (
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
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="font-serif text-lg mb-1">{member.name}</h3>
        <p className="text-yellow-400 text-xs tracking-wide mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{member.desc}</p>
      </div>
    </div>
  );

  return (
    <section id="team" className="bg-black text-white py-24 px-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-3">
          <span className="h-px w-12 bg-yellow-400" />
          <p className="text-yellow-400 text-xs tracking-[0.3em]">
            THE PEOPLE BEHIND IT
          </p>
          <span className="h-px w-12 bg-yellow-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif">Our Team</h2>
      </div>

      {/* Hierarchy layout */}
      <div className="max-w-6xl mx-auto">
        {/* Top: Managing Director */}
        <div className="max-w-md mx-auto">
          <MemberCard member={managingDirector} />
        </div>

        {/* Below: Sales (left) + Others (right) */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            {salesMembers.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {otherMembers.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}