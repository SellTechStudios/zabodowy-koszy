'use client'
import type { OurFeaturesBlock as OurFeaturesProps } from '@/payload-types'
import React from 'react'
import { GetIconComponent } from '@/payload/fields/iconPicker/IconPickerComponent'

export const OurFetauresBlock: React.FC<OurFeaturesProps> = (props: OurFeaturesProps) => {
  const { title, items } = props

  return (
    <div>
      <h3 className="after:block relative after:bg-current after:mx-auto my-8 after:mt-2 after:w-[60px] after:h-0.5 font-thin text-4xl text-center after:content-['']">
        {title}
      </h3>

      <div className="flex flex-row gap-16">
        {items?.map((item, index) => {
          const randomOffsetX: number = Math.random() * -40 - 30
          const randomOffsetY: number = Math.random() * -40 - 30
          const IconComponent = GetIconComponent(item.iconPicker as string)

          return (
            <React.Fragment key={index}>
              <div className="group relative flex flex-col flex-1 justify-center items-center gap-8 py-8">
                <div className="relative flex justify-center items-center w-full">
                  <span
                    className={`top-1/2 left-1/2 -z-1 absolute bg-[#F0C417]/20 rounded-full w-18 h-18`}
                    style={{
                      width: 100,
                      height: 100,
                      transform: `translate(${randomOffsetX}%, ${randomOffsetY}%)`,
                    }}
                    aria-hidden="true"
                  />

                  <IconComponent size={80} className="z-10 text-[#74832a]" />
                </div>

                <h4 className="font-extrabold">{item.title}</h4>
                <p className="text-sm text-justify">{item.description}</p>

                <div className="bottom-0 left-0 absolute bg-[#F0C417] w-full h-[4px] group-hover:h-[6px] transition-all duration-150"></div>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
