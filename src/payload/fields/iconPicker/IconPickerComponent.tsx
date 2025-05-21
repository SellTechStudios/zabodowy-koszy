'use client'
import './index.scss'
import { TextFieldClientComponent } from 'payload'
import * as PiIcons from 'react-icons/pi'
import { cn } from '@/payload/utilities/cn'
import { FieldLabel,  useField } from '@payloadcms/ui'

import type { IconType } from 'react-icons'

const icons: string[] = [
  'PiPaintBrushBroadThin',
  'PiPencilRulerThin',
  'PiHouseLineThin',
  'PiSlidersThin',
]

export const GetIconComponent = (icon: string) => {
  return (PiIcons as Record<string, IconType>)[icon]
}

export const IconPickerComponent: TextFieldClientComponent = ({ field: clientField, path }) => {
  const { label } = clientField

  const { value, setValue } = useField<string>({ path: path || clientField.name })

  return (
    <div className="field-type icon-picker-component">
      <FieldLabel htmlFor={`field-${path}`} label={label} />

      <div className="icon-selection-wrapper">
        {icons.map((icon) => {
          const IconComponent = GetIconComponent(icon)

          return (
            <IconComponent
              size={30}
              onClick={() => setValue(icon)}
              key={icon}
              className={cn('icon-swatch', { selected: icon === value })}
            />
          )
        })}
      </div>
    </div>
  )
}
