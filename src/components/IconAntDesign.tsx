import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../themes/global';

type TIcon = {
    name: string | any;
    color?: string;
    size?: number;
}

export function IconAntDesign({ name, color = colors.grey900, size = 40 }: TIcon) {
    return (
        <AntDesign name={name} size={size} color={color} />
    );
}