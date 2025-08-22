import AxiosInstance from "@/lib/axios";

export const UserApi = {
    createUser: async (body: { name: string, email: string, clerkId: string }) => {
        try {
            const res = await AxiosInstance.post('/api/user', body)
            return res
        } catch (error: any) {
            const err = error.response.data.message || 'Something went wrong'
            throw new Error(err)
        }
    }
}