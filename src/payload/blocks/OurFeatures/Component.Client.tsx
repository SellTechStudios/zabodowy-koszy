import type { OurFeaturesBlock as OurFeaturesProps } from '@/payload-types'

import React from 'react'

export const OurFetauresBlock: React.FC<OurFeaturesProps> = (props: OurFeaturesProps) => {
  const { title, items } = props

  return (
    <div>
      <h3>{title}</h3>

      <div className="flex flex-row gap-8">
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
