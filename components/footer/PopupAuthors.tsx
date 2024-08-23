'use client';

import { authors } from '@/constants/authors';
import { useState } from 'react';
import Image from 'next/image';

export const PopupAuthors = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(!open)} className="cursor-pointer text-xl font-bold">
        Authors
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 flex justify-center items-center bg-slate-600 bg-opacity-50"
        >
          <div className="scrollbar flex flex-wrap justify-around p-4 bg-white border-2 rounded-xl min-w-[200px] max-w-[700px] w-[60%] max-h-[80%] overflow-auto">
            {authors.map(({ id, image, name, position, linkGH }) => (
              <div
                key={id}
                className=" flex flex-col justify-around p-3 h-[270px] w-[200px] m-2.5 bg-sky-100 border-2 rounded-[20%]"
              >
                <Image
                  src={image}
                  alt="Authors photo"
                  className="rounded-[20%] mx-auto"
                  width={130}
                  height={130}
                />
                <p className="text-center font-bold italic text-base">{name}</p>
                <p className="text-center font-bold italic text-base">{position}</p>
                <a
                  href={linkGH}
                  target="_blank"
                  className="text-center font-bold italic cursor-pointer text-base flex items-center justify-center"
                >
                  <Image
                    src="/github.png"
                    alt="Authors photo"
                    className="rounded-[20%] inline mx-0"
                    width={20}
                    height={20}
                  />
                  Visit my GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
