export function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#" className="font-mono text-lg font-bold tracking-tight">
          <span className="text-accent-violet">{`{`}</span>
          bizden
          <span className="text-neon-cyan">.</span>
          tech
          <span className="text-accent-violet">{`}`}</span>
        </a>
        <p className="text-sm text-muted-foreground">
          &copy; 2026 bizden.tech. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
