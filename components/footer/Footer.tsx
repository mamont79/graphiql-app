import Image from 'next/image';
import { PopupAuthors } from './PopupAuthors';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-row justify-around bg-[#1da1f2] w-full h-[80px]">
      <div className="content-center">
        <PopupAuthors />
      </div>
      <div className="content-center">{year}</div>
      <div className="content-center">
        <a
          className="flex place-items-center"
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/rsschool-logo.svg"
            alt="RSS Logo"
            className="dark:invert"
            width={100}
            height={24}
          />
        </a>
      </div>
    </footer>
  );
};
