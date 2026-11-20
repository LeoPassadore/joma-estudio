import { FAQ } from "@/lib/site";

/* <details> nativo: se abre sin JavaScript y es accesible por defecto. */
export default function FaqList({ groups = FAQ }: { groups?: typeof FAQ }) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((g) => (
        <div key={g.grupo}>
          <h2 className="mb-4 font-mono text-[10.5px] tracking-[0.2em] text-cool-hi uppercase">
            {g.grupo}
          </h2>
          <div className="flex flex-col gap-3">
            {g.items.map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-[20px]"
                style={{
                  background: "linear-gradient(145deg,#2C3A43,#1E272D)",
                  boxShadow:
                    "12px 12px 30px rgba(10,14,17,0.55), -8px -8px 20px rgba(108,170,183,0.05)",
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] px-[26px] py-[22px] text-[17px] font-semibold text-ink">
                  {item.q}
                  <span className="text-xl text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="m-0 px-[26px] pb-6 font-serif text-[15px] leading-[1.65] text-[rgba(215,230,229,0.72)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
