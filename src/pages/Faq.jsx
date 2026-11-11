import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { FAQS } from "@/lib/faq";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything businesses need to know about Cryptobus." />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className="glass rounded-xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
