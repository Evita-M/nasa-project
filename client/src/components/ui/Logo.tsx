interface LogoProps {
  name: string
}

export const Logo = ({name}: LogoProps) => {
  const [first, ...rest] = name.split(' ')
  const restWords = rest.join(' ')

  return (
    <div className="relative">
      <h1 className="flex items-center uppercase">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{first}</span>
        {restWords && (
          <>
            <span className="ml-2 text-cyan-100/90 tracking-wider">{restWords}</span>
          </>
        )}
      </h1>
      <div className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </div>
  )
}
