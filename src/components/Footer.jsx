export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center text-center py-6 mt-20 text-gray-500 text-sm gap-2">
      <p>© 2025 NeonPass. All rights reserved.</p>
      <div className="flex gap-4 mt-2">
        <a
          href="https://github.com/biadebeatriz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/beatriz-siqueira-79a8b9147/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
