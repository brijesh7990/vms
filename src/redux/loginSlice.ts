import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface LoginInterface {
    username: string
    password: string
}



// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
    reducerPath: 'loginApi',
    tagTypes: ['loginapi'],
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_LOGIN }),
    endpoints: (build) => ({
        loginCredentialSend: build.mutation<string , Partial<LoginInterface>>({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['loginapi'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginCredentialSendMutation } = loginApi;