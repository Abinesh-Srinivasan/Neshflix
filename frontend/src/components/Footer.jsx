const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row 4k:h-40">
        <p className="text-balance text-center text-sm leading-loose md:text-left md:text-xl 2xl:text-2xl 4k:text-5xl">
          Visit my{" "}
          <a
            href="https://abineshsrinivasan.netlify.app/"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Portfolio Website
          </a>
          . Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/abineshsrinivasan/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
export default Footer;
