import React from 'react'

const categories = [
  'Zabudowy koszy 120L',
  'Zabudowy koszy 240L',
  'Zabudowy koszy AGRO',
  'Skrzynie i szafy tarasowo-balkonowe',
  'Domki ogrodowe i narzędziowe',
  'Akcesoria',
  'Wiaty rowerowe',
  'Kosze do segregacji śmieci',
]

export const ProductCategoriesBlock: React.FC = () => {
  return (
    <div className="bg-[#f0c41733] -ml-[calc(50vw-50%)] py-12 w-screen">
      <div className="gap-2 grid grid-cols-4 grid-rows-2 w-full h-[32rem] container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-full h-full font-bold cursor-pointer"
            style={{
              backgroundColor: 'rgb(244, 218, 113)',
            }}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  )
}
