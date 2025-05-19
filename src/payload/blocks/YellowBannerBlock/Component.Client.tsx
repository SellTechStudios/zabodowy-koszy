import type { YellowBannerBlock as YellowBannerProps } from '@/payload-types'

import React from 'react'
import { PiClockThin, PiHandshakeThin, PiTruckThin, PiWalletThin } from 'react-icons/pi'

export const YellowBannerBlock: React.FC<YellowBannerProps> = (props: YellowBannerProps) => {
  const { items } = props

  return (
    <div className="bg-[#F0C417] -ml-[calc(50vw-50%)] w-screen">
      <div className="flex justify-center gap-8 py-10 container">
        {items?.map((item, index) => (
          <div key={index} className="group flex flex-col flex-1 items-center">
            <div className="group-hover:rotate-[-20deg] group-hover:scale-[1.2] transition-transform duration-150">
              {index === 0 && <PiClockThin size={60} className="" />}
              {index === 1 && <PiHandshakeThin size={60} />}
              {index === 2 && <PiTruckThin size={60} />}
              {index === 3 && <PiWalletThin size={60} />}
            </div>
            <div className="mt-2 font-semibold">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
