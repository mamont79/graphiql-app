export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <header className="flex flex-row justify-around bg-[#1da1f2] w-full h-[80px]">
      <div className="content-center">About team</div>
      <div className="content-center">{year}</div>
      <div className="content-center">Link to course</div>
    </header>
  );
};
