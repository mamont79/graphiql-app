'use client';

import { authors } from '@/constants/authors';
import { useState } from 'react';

export const PopupAuthors = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(!open)}>Authors</div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 flex justify-center items-center bg-slate-600 bg-opacity-50"
        >
          <div className="flex flex-wrap justify-around p-4 bg-white border-2 border-yellow-300 rounded-xl min-w-[200px] max-w-[700px] w-[60%]">
            {authors.map(({ id, image, name, position, linkGH }) => (
              <div
                key={id}
                className="h-[150px] w-[200px] m-2.5 bg-sky-300 border-2 border-yellow-300 rounded-md"
              >
                <div>{image}</div>
                <div>{name}</div>
                <div>{position}</div>
                <a href={linkGH} target="_blank">
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
