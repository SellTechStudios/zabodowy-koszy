'use client'

import { useEffect,  useMemo,  useState } from 'react'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { InpostGeowidget } from './InPostGeoWidget'

const formatAddress = (addressDetails): string => {
  if (!addressDetails) return ''
  const { street, building_number, city, post_code } = addressDetails
  return `${street} ${building_number}, ${city} (${post_code})`
}

const formatDisplayText = (location): string => {
  const formattedAddress = formatAddress(location.address_details)
  const description = location.location_description || ''
  const hours = location.opening_hours ? `Godziny: ${location.opening_hours}` : ''
  return `<strong>${location.name}</strong> - ${formattedAddress}<br/>${description}<br/>${hours}`
}

export const ShipmentSection = () => {
  const [shipmentType, setShipmentType] = useState<'address' | 'inpost'>('address')
  const { user } = useAuth()
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0)
  const [selectedInpost, setSelectedInpost] = useState<string | null>(null)
  const [showInpostWidget, setShowInpostWidget] = useState(true)

  const addresses: User['addresses'] = useMemo(() => user?.addresses || [], [user?.addresses])

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddressIndex(0)
    }
  }, [addresses])

  const onShipmentLocationSelected = (location) => {
    const displayText = formatDisplayText(location)
    setSelectedInpost(displayText)
    setShowInpostWidget(false)
  }

  return (
    <section className="p-4 border border-gray-300 rounded-lg">
      <h4 className="mb-4 font-semibold text-lg">Dostawa</h4>

      <div className="flex gap-4 mb-4">
        <button
          className={shipmentType === 'address' ? 'default' : 'secondary'}
          onClick={() => setShipmentType('address')}
        >
          Na adres
        </button>
        <button
          className={shipmentType === 'inpost' ? 'default' : 'secondary'}
          onClick={() => setShipmentType('inpost')}
        >
          Na paczkomat
        </button>
      </div>

      {shipmentType === 'address' && (
        <div className="flex flex-col gap-2">
          {addresses.length > 0 ? (
            <>
              <label className="block font-medium text-gray-700">Wybierz adres:</label>
              <select
                className="p-2 border rounded"
                value={selectedAddressIndex}
                onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
              >
                {addresses.map((address, index) => (
                  <option key={index} value={index}>
                    {address.street}, {address.city}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-gray-600">
                <p>
                  <strong>Miasto:</strong> {addresses[selectedAddressIndex]?.city}
                </p>
                <p>
                  <strong>Kod pocztowy:</strong> {addresses[selectedAddressIndex]?.zipCode}
                </p>
                <p>
                  <strong>Ulica:</strong> {addresses[selectedAddressIndex]?.street}
                </p>
                <p>
                  <strong>Numer domu:</strong> {addresses[selectedAddressIndex]?.houseNumber}
                </p>
                {addresses[selectedAddressIndex]?.apartmentNumber && (
                  <p>
                    <strong>Numer mieszkania:</strong>{' '}
                    {addresses[selectedAddressIndex]?.apartmentNumber}
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>Brak zapisanych adresów.</p>
          )}
        </div>
      )}

      {shipmentType === 'inpost' && (
        <div className="mt-4">
          {showInpostWidget ? (
            <div className="[&>div]:h-[600px]">
              <InpostGeowidget onPointAction={onShipmentLocationSelected} />
            </div>
          ) : (
            <>
              <h4 className="mb-2 font-semibold text-lg">Wybrany paczkomat</h4>
              <div className="bg-green-100 p-2 rounded text-green-800 whitespace-pre-wrap">
                <div dangerouslySetInnerHTML={{ __html: selectedInpost || '' }} />
              </div>
              <button
                className="mt-4"
                onClick={() => {
                  setShowInpostWidget(true)
                  setSelectedInpost(null)
                }}
              >
                Zmień paczkomat
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default ShipmentSection
