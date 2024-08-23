import Image from 'next/image';
import { PopupAuthors } from './PopupAuthors';

export const Footer = () => {
  return (
    <footer className="flex flex-row justify-around bg-[#1da1f2] w-full h-[80px]">
      <div className="content-center">
        <PopupAuthors />
      </div>
      <div className="content-center">2024</div>
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
            width={40}
            height={40}
          />
        </a>
      </div>
    </footer>
  );
};
