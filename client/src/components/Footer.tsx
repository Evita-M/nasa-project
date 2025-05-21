interface FooterProps {
  text: string;
}

export const Footer = ({ text }: FooterProps) => {
  return (
    <footer className="border-b border-cyan-400/10 backdrop-blur-xl py-4 shadow-[0_0_24px_rgba(0,255,247,0.15)]">
      <p className="text-sm text-center text-white/70">{text}</p>
    </footer>
  );
};
