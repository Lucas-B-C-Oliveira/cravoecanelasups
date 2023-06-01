import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// type PersistStore = {
// name: string
// email: string
// cpf: string
// birthDate: string
// phone: string
// }

// {
//         name: '',
//         email: '',
//         cpf: '',
//         birthDate: '',
//         phone: '',
//         password: '',
//         confirmPassword: '',
//         existingUser: false,
//       }

export const usePersistStore = create(
  persist(
    (set, get) => ({
      userData: undefined,
      setUserData: (newUserData: any) =>
        set({
          userData: {
            ...get().userData,
            ...newUserData,
            password: '',
            confirmPassword: '',
          },
        }),
      getUserData: () => get().userData,
    }),
    {
      name: '@cravoecanela:user-data:checkout', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
