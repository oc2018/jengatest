import { Icons, type IconName } from "./lib/utils";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

function Icon({ name, ...props }: IconProps) {
  const Cmp = Icons[name];
  return <Cmp {...props} />;
}

export default Icon;
