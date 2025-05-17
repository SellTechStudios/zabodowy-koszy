'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/providers/Auth'
import AddressesSection from './_components/AddressSection'
import ChangeNameSection from './_components/ChangeNameSection'
import ChangePasswordSection from './_components/ChangePasswordSection'
import ChangePhoneNumberSection from './_components/ChangePhoneNumberSection'
import OrderHistorySection from './_components/OrderHistorySection'

const AccountPage = () => {
  const { logout, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    'profile' | 'password' | 'phone' | 'orders' | 'addresses' | 'name'
  >('profile')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/login')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoggingOut(false)
    }
  }
  return (
    <>
      <div className="mb-4">
        <button className="secondary" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Wylogowywanie...' : 'Logout'}
        </button>
      </div>

      <div className="hidden md:flex md:flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={activeTab === 'profile' ? 'default' : 'secondary'}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('name')}
          className={activeTab === 'name' ? 'default' : 'secondary'}
        >
          Imię i nazwisko
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={activeTab === 'password' ? 'default' : 'secondary'}
        >
          Zmień hasło
        </button>
        <button
          onClick={() => setActiveTab('phone')}
          className={activeTab === 'phone' ? 'default' : 'secondary'}
        >
          Zmień numer telefonu
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={activeTab === 'addresses' ? 'default' : 'secondary'}
        >
          Adresy
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={activeTab === 'orders' ? 'default' : 'secondary'}
        >
          Historia zamówień
        </button>
      </div>

      <div className="md:hidden block mb-4 md:mb-8">
        <select
          value={activeTab}
          onChange={(e) =>
            setActiveTab(
              e.target.value as 'profile' | 'password' | 'phone' | 'orders' | 'addresses' | 'name',
            )
          }
          className="p-2 border rounded w-full"
        >
          <option value="profile">Profil</option>
          <option value="name">Imię i nazwisko</option>
          <option value="password">Zmień hasło</option>
          <option value="phone">Zmień numer telefonu</option>
          <option value="addresses">Adresy</option>
          <option value="orders">Historia zamówień</option>
        </select>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div>
            <h2>Informacje o koncie</h2>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Nazwa:</strong> {user?.name}
            </p>
            <p>
              <strong>Nazwisko:</strong> {user?.surname}
            </p>
          </div>
        )}
        {activeTab === 'name' && <ChangeNameSection />}
        {activeTab === 'password' && <ChangePasswordSection />}
        {activeTab === 'phone' && <ChangePhoneNumberSection />}
        {activeTab === 'orders' && <OrderHistorySection />}
        {activeTab === 'addresses' && <AddressesSection />}
      </div>
    </>
  )
}

export default AccountPage
