import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full 2xl:p-8 4k:p-16 ">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix"
            className="h-10 2xl:h-12 4k:h-28"
          />
        </Link>
      </header>
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4 2xl:text-8xl 2xl:mb-6 4k:text-[12rem] 4k:mb-12">
          Dude, you visited the wrong page
        </h1>
        <p className="mb-6 text-xl 2xl:text-3xl 2xl:mb-14 4k:text-6xl 4k:mb-28">
          Click the Netflix logo to explore the home page. Visit the Developer's
          Website by clicking the below button.
        </p>
        <a
          href="https://abineshsrinivasan.netlify.app/"
          target="_blank"
          className="bg-white text-black py-2 px-4 rounded 2xl:text-4xl 2xl:py-4 2xl:px-8 2xl:rounded-lg 4k:py-8 4k:px-16 4k:text-7xl 4k:rounded-2xl "
        >
          Developer Info
        </a>
      </main>
    </div>
  );
};

export default NotFoundPage;
