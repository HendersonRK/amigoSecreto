import Feather from '@expo/vector-icons/Feather';
import { colors } from '../themes/global';

type TIcon = {
    name: string | any;
    color?: string;
    size?: number;
}

export function IconFeather({ name, color = colors.grey900, size = 40 }: TIcon) {
    return (
        <Feather name={name} size={size} color={color} />
    );
}