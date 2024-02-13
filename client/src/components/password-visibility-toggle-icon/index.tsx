import { Icon } from "@iconify/react";

interface PasswordVisibilityToggleIconProps {
  passwordType: string;
}

export const PasswordVisibilityToggleIcon = ({
  passwordType,
}: PasswordVisibilityToggleIconProps) => {
  return (
    <Icon
      icon={passwordType === "password" ? "lucide:eye" : "lucide:eye-off"}
    />
  );
};
