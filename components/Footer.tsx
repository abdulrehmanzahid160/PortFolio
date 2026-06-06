"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-dark-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <p className="font-mono text-xs text-warm-dim">
            © {new Date().getFullYear()} Abdul Rehman
          </p>
          <span className="hidden sm:inline text-dark-border">|</span>
          <p className="font-mono text-xs text-warm-dim opacity-50">
            Built with passion and too much caffeine
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/abdulrehmanzahid160"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-warm-dim hover:text-accent transition-colors"
            data-magnetic
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-rehman-5845373a4"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-warm-dim hover:text-accent transition-colors"
            data-magnetic
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
