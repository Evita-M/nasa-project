interface FooterProps {
  githubUrl: string;
  text: string;
}

export const Footer = ({ githubUrl, text }: FooterProps) => {
  return (
    <footer className="flex items-center justify-center border-t border-cyan-400/10 py-4 text-sm text-white/70 backdrop-blur-xl">
      <p>
        @ 2025
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-1 text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
        >
          Evita-M
        </a>
        . {text}
      </p>
    </footer>
  );
};
