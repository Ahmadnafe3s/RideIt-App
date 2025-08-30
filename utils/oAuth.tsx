import { useSSO } from '@clerk/clerk-expo'
import * as AuthSession from 'expo-auth-session'
import { useCallback } from 'react'

const useOAuth = () => {

    const { startSSOFlow } = useSSO()

    const handleOAuth = useCallback(async () => {

        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: AuthSession.makeRedirectUri({ scheme: 'rideit', path: '/(root)/(tabs)/home' }),
            })

            if (createdSessionId) {
                setActive!({
                    session: createdSessionId,
                })
                return {
                    success: true,
                    code: 'success',
                    message: "You have successfully authenticated"
                }
            }

            return {
                success: false,
                message: "Something went wrong, please try again"
            }

        } catch (err: any) {
            return {
                success: false,
                code : err.code,
                message: err.errors[0].longMessage
            }
        }
    }, [startSSOFlow])

    return {
        handleOAuth
    }
}

export default useOAuth