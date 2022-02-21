import {
  Avatar as ChakraAvatar,
  AvatarProps as AvatarPropsChakra,
} from "@chakra-ui/react";
import PersonImage from "assets/images/person.png";
import styles from "./avatars.module.css";
import clsx from "clsx";

interface AvatarProps extends AvatarPropsChakra {
  circle?: boolean;
}

export function Avatar({ src, className, circle, ...props }: AvatarProps) {
  return (
    <ChakraAvatar
      src={src}
      className={clsx(!circle && styles.avatar, className)}
      {...props}
    />
  );
}
