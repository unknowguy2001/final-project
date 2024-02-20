import { Icon } from "@iconify/react";
import { IconButton } from "@chakra-ui/react";

interface PasswordVisibilityToggleButtonProps {
  passwordType: string;
  switchPasswordType: () => void;
}

export const PasswordVisibilityToggleButton = ({
  passwordType,
  switchPasswordType,
}: PasswordVisibilityToggleButtonProps) => {
  return (
    <IconButton
      aria-label=""
      variant="unstyled"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      right={0}
      zIndex={1}
      top="50%"
      transform="translateY(-50%)"
      cursor="pointer"
      onClick={switchPasswordType}
    >
      <Icon
        icon={passwordType === "password" ? "lucide:eye" : "lucide:eye-off"}
      />
    </IconButton>
  );
};
