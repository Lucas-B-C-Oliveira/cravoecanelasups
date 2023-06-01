'use client'

import { usePersistStore } from '@/store/persistStore'
import { memo } from 'react'

export const PesonalData = memo(function PersonalData() {
  const { getUserData } = usePersistStore()
  const userData = getUserData()

  return (
    <div className="flex flex-col gap-3.5">
      <h2 className="text-gray-yellow-cc-900 text-lg font-medium">
        Dados Pessoais
      </h2>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-base text-gray-yellow-cc-800">
            Nome Completo
          </p>
          <p className="text-gray-yellow-cc-750 font-medium text-sm">
            {userData.name}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-base text-gray-yellow-cc-800">
            E-mail
          </p>
          <p className="text-gray-yellow-cc-750 font-medium text-sm">
            {userData.email}
          </p>
        </div>
      </div>
    </div>
  )
})
