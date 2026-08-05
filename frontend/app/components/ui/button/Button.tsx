'use client';

interface ButtonProps {
    label: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
    rounded?: ButtonRounded;
    onClick?: () => void;
}

export enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    Didi = "didi",
}

export enum ButtonSize {
    Small = "small",
    Medium = "medium",
    Large = "large",
    XLarge = "xlarge",
    XXLarge = "2xlarge",
    XXXLarge = "3xlarge",
}

export enum ButtonRounded {
    None = "none",
    Small = "small",
    Medium = "medium",
    Large = "large",
    Full = "full",
}

const variantStyles: Record<ButtonVariant, string> = {
    [ButtonVariant.Primary]: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    [ButtonVariant.Secondary]: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
    [ButtonVariant.Tertiary]: "bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded",
    [ButtonVariant.Didi]: "bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded",
};

const sizeStyles: Record<ButtonSize, string> = {
    [ButtonSize.Small]: "text-sm",
    [ButtonSize.Medium]: "text-base",
    [ButtonSize.Large]: "text-lg",
    [ButtonSize.XLarge]: "text-xl",
    [ButtonSize.XXLarge]: "text-2xl",
    [ButtonSize.XXXLarge]: "text-3xl",
};

const roundedStyles: Record<ButtonRounded, string> = {
    [ButtonRounded.None]: "rounded-none",
    [ButtonRounded.Small]: "rounded-sm",
    [ButtonRounded.Medium]: "rounded-md",
    [ButtonRounded.Large]: "rounded-lg",
    [ButtonRounded.Full]: "rounded-full",
};


export const  Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={`cursor-pointer ${variantStyles[props.variant || ButtonVariant.Primary]} ${sizeStyles[props.size || ButtonSize.Medium]} ${roundedStyles[props.rounded || ButtonRounded.None]}`} onClick={props.onClick}>
            {props.label}
        </button>
    );
}