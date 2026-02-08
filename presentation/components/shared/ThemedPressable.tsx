import { Text, Pressable, PressableProps } from 'react-native'

interface Props extends PressableProps {
    children: string;
}

const ThemedPressable = ({ children, ...rest }: Props) => {
    return (
        <Pressable 
            className="bg-black py-3 px-5 rounded-full m-2 active:opacity-80"
            {...rest}
        >
            <Text className="text-white text-center font-bold text-base">
                {children}
            </Text>
        </Pressable>
    )
}

export default ThemedPressable


