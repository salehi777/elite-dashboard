import { Avatar as ChakraAvatar, AvatarProps } from "@chakra-ui/react";
import PersonImage from "assets/images/person.png";
import styles from "./avatars.module.css";
import clsx from "clsx";

export function Avatar({ src, className, ...props }: AvatarProps) {
  return (
    <ChakraAvatar
      src={src}
      className={clsx(styles.avatar, className)}
      {...props}
    />
  );
}
