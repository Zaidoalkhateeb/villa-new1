
import { Phone } from "lucide-react";


/** Floating WhatsApp and Phone buttons on the right side of the page. */
export default function BottomBar() {
  const phoneNumberDisplay = "+962 6 593 1620";
  const phoneNumberTel = "+96265931620";
  const whatsappNumber = "962796033600";

  return (
    <div className="fixed right-6 bottom-10 z-50 flex flex-col items-end gap-4">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg hover:bg-green-400 transition"
        aria-label="Open WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.132-.175.263-.678.858-.831 1.033-.153.175-.306.197-.569.066-.263-.132-1.111-.409-2.117-1.304-.782-.696-1.31-1.556-1.464-1.819-.153-.263-.016-.405.115-.537.118-.117.263-.306.395-.459.132-.153.175-.263.263-.438.088-.175.044-.329-.022-.46-.066-.132-.593-1.433-.813-1.963-.214-.514-.432-.444-.593-.452-.153-.007-.329-.009-.505-.009-.175 0-.46.066-.701.329-.241.263-.92.899-.92 2.19 0 1.29.942 2.537 1.073 2.712.131.175 1.853 2.83 4.49 3.852.628.216 1.117.345 1.499.441.63.16 1.204.137 1.658.083.506-.06 1.558-.637 1.779-1.253.219-.616.219-1.144.153-1.253-.066-.109-.241-.175-.504-.306z" />
          <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
      <a
        href={`tel:${phoneNumberTel}`}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500 shadow-lg hover:bg-yellow-400 transition"
        aria-label={`Call now ${phoneNumberDisplay}`}
      >
        <Phone size={28} className="text-white" />
      </a>
    </div>
  );
}
