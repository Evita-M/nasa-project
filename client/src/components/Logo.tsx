import { FC } from 'react';

interface LogoProps {
  name: string;
}

export const Logo: FC<LogoProps> = ({ name }) => {
  const [first, ...rest] = name.split(' ');
  const restWords = rest.join(' ');

  return (
    <div className="relative">
      <p className="flex items-center uppercase tracking-wider">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {first}
        </span>
        {restWords && (
          <>
            <span className="ml-2 tracking-wider text-cyan-100/90">
              {restWords}
            </span>
          </>
        )}
      </p>
      <div className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </div>
  );
};
