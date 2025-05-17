import { ContactPageClient } from './page.client'
import { Container } from '@/components/Container'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <Container>
      <ContactPageClient />
    </Container>
  )
}
