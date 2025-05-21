import React from 'react'
import { GetIconComponent } from './IconPickerComponent'

import type { DefaultServerCellComponentProps } from 'payload'

export const IconPickerCell: React.FC<DefaultServerCellComponentProps> = ({ cellData }) => {
  const IconComponent = GetIconComponent(cellData as string)

  return <IconComponent size={30} />
}
