import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import cls from "./Popup.module.scss";
import { classNames } from "../../helpers/classNames";
import { Portal } from "../Portal/Portal";

interface Popup {
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  children: ReactNode;
}

export const Popup: FC<Popup> = (props) => {
  const { children, onClose, isOpen } = props;
  const [isMounted, setIsMounted] = useState(false);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsMounted(false);
      setTimeout(() => {
        onClose();
      }, 100);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsMounted(true);
      });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.overlay)} onClick={closeHandler}>
        <div
          className={classNames(cls.content, { [cls.active]: isMounted })}
          onClick={onContentClick}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
