import Image from 'next/image';
import { PopupAuthors } from './PopupAuthors';

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center h-[80px] text-text">
      <div className="wrapper flex justify-between items-center w-full">
        <div className="content-center hover:underline" title="Click to see tean members">
          <PopupAuthors />
        </div>
        <div className="content-center text-xl font-bold">2024</div>
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
      </div>
    </footer>
  );
};
