import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

type InputFieldProps = {
    labelStyle?: string
    label: string
    Icon?: React.ComponentType<any>
    secureTextEntry?: boolean
    placeholder?: string
    containerStyle?: string
    inputStyle?: string
    iconStyle?: string
    className?: string
    onFocus?: () => void
    onBlur?: () => void
} & React.ComponentProps<typeof TextInput>

const InputField = ({
    labelStyle,
    label,
    Icon,
    secureTextEntry = false,
    placeholder,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    onFocus,
    onBlur,
    ...props
}: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
        onFocus?.()
    }

    const handleBlur = () => {
        setIsFocused(false)
        onBlur?.()
    }

    return (
        <View className='my-2 w-full'>
            <Text className={`text-lg mb-2 text-black font-JakartaRegular ${labelStyle}`}>
                {label}
            </Text>
            <View className={`
                relative flex flex-row px-4 items-center border gap-2 bg-neutral-50 rounded-full
                ${isFocused ? 'border-primary-500' : 'border-neutral-100'}
                ${containerStyle}
            `}>
                {Icon && (
                    <Icon
                        size={24}
                        color="gray"
                        className={iconStyle}
                    />
                )}
                <TextInput
                    className={`flex-1 py-4 font-JakartaSemiBold text-[15px] text-left ${inputStyle}`}
                    secureTextEntry={secureTextEntry}
                    placeholder={'dsehdu wehfdh'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </View>
        </View>
    )
}

export default InputField