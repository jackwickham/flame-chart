import feather, { FeatherIconNames } from "feather-icons";

export interface IconProps {
    icon: FeatherIconNames;
}

const Icon = (props: IconProps) => {
    return <span innerHTML={feather.icons[props.icon].toSvg()}></span>;
};

export default Icon;
