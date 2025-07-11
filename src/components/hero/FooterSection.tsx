
export default function FooterSection() {
  return (
    <footer className="absolute bottom-0 left-0 w-full py-4 flex flex-col items-center space-y-1 z-20">
      <div className="flex justify-center gap-4">
        <a
          href="https://instagram.com/reviveai.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5BCBFF]/70 hover:text-[#5BCBFF] transition underline underline-offset-2 text-sm"
        >
          @reviveai.cl
        </a>
        <span className="text-white/20">|</span>
        <a
          href="https://instagram.com/thehumanupgrade"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5BCBFF]/70 hover:text-[#5BCBFF] transition underline underline-offset-2 text-sm"
        >
          @thehumanupgrade
        </a>
      </div>
      <p className="text-white/30 text-xs font-montserrat">
        © 2025 ImplantDX — El futuro de la sonrisa perfecta
      </p>
    </footer>
  );
}
