import React from 'react'

interface Props {
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
  accept: User[]
}

export const Filter = ({ active, setActive, accept }: Props) => {
  return (
    <div>
      <ul
        className={`flex text-lg border-b ${
          active === 'connections' && 'border-b-green'
        } ${active === 'pending' && 'border-b-orange'} ${
          active === 'accept' && 'border-b-prime-blue'
        }`}
      >
        <li
          onClick={() => setActive('connections')}
          className={`cursor-pointer text-center w-1/3 md:w-fit md:px-4 py-2 transition-all duration-200 hover:brightness-125 ${
            active === 'connections' && 'bg-green text-white'
          }`}
        >
          <span className="hidden md:inline-block">My</span>{' '}
          <span className=" capitalize md:lowercase">connections</span>
        </li>
        <li
          onClick={() => setActive('pending')}
          className={`cursor-pointer text-center w-1/3 md:w-fit md:px-4 py-2 transition-all duration-200 hover:brightness-125 ${
            active === 'pending' && 'bg-orange text-white '
          }`}
        >
          Pending <span className="hidden md:inline-block">requests</span>
        </li>
        <li
          onClick={() => setActive('accept')}
          className={`cursor-pointer text-center w-1/3 md:w-fit relative md:px-4 py-2 transition-all duration-200 hover:brightness-125 ${
            active === 'accept' && 'bg-prime-blue text-white '
          }`}
        >
          {accept.length > 0 && (
            <span className="absolute font-inter font-semibold animate-pulse flex items-center justify-center bg-red rounded-full w-4 h-4 text-sm top-[2px] right-[2px]">
              !
            </span>
          )}
          Accept <span className="hidden md:inline-block">connection</span>
        </li>
      </ul>
    </div>
  )
}
