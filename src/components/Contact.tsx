import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useMemo, useState } from "react";

export default function Contact() {
  const whatsappNumber = "962796033600";
  const sheetsEndpoint = (import.meta as any).env?.VITE_GOOGLE_SHEETS_ENDPOINT as
    | string
    | undefined;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const fullName = useMemo(() => {
    const name = `${firstName} ${lastName}`.trim();
    return name.length ? name : "(not provided)";
  }, [firstName, lastName]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetsEndpoint) {
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");

    try {
      const payload = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        fullName,
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        pageUrl: window.location.href,
      };

      await fetch(sheetsEndpoint, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setSubmitState("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-neutral-100 text-neutral-900 py-24 px-6 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-yellow-400" />
            <p className="text-yellow-600 text-xs tracking-[0.3em]">GET IN TOUCH</p>
            <span className="h-px w-12 bg-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Register Your Interest
          </h2>

          <p className="mt-5 text-neutral-600 leading-relaxed max-w-xl">
            Connect with our sales team to receive detailed brochures, floor plans,
            and exclusive viewing arrangements.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-white px-5 py-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-neutral-500">PHONE</p>
                <p className="font-medium">+962 6 593 1620</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-black/10 bg-white px-5 py-4 transition hover:border-green-500/40"
              aria-label="Open WhatsApp chat"
            >
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-neutral-500">WHATSAPP</p>
                <p className="font-medium">+962 796 033 600</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-white px-5 py-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-neutral-500">EMAIL</p>
                <p className="font-medium">sales@alkhlaif.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-white px-5 py-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-neutral-500">OFFICE</p>
                <p className="font-medium leading-snug">
                  7th Circle – Royal Jordanian Airlines Complex, 3rd Floor, Office No. 313
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right (Form) */}
        <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-neutral-900 to-black p-6 sm:p-8">
          <form className="space-y-5" onSubmit={onSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/90 mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-500/60"
                />
              </div>
              <div>
                <label className="block text-xs text-white/90 mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-500/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/90 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-500/60"
              />
            </div>

            <div>
              <label className="block text-xs text-white/90 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+962 XX XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-500/60"
              />
            </div>

            <div>
              <label className="block text-xs text-white/90 mb-2">Message (Optional)</label>
              <textarea
                placeholder="I am interested in..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-yellow-500/60"
              />
            </div>

            <button
              type="submit"
              disabled={submitState === "loading"}
              className="w-full rounded-xl bg-yellow-500 text-black font-semibold tracking-wide py-3 hover:bg-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitState === "loading" ? "SENDING..." : "SUBMIT REQUEST"}
            </button>

            {submitState === "error" && (
              <p className="text-xs text-red-300">
                Could not submit. Set `VITE_GOOGLE_SHEETS_ENDPOINT` and try again.
              </p>
            )}
            {submitState === "success" && (
              <p className="text-xs text-green-300">Submitted successfully.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
