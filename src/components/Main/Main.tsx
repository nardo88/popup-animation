import { FC, useCallback, useState } from "react";
import cls from "./Main.module.scss";
import { Popup } from "../Popup/Popup";

export const Main: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = useCallback(() => setIsOpen((prev) => !prev), []);
  return (
    <div className={cls.main}>
      <button className={cls.btn} onClick={() => setIsOpen(true)}>
        open popup
      </button>
      <Popup isOpen={isOpen} onClose={close}>
        <div className={cls.content}>
          <h1>It is a simple example popup animation</h1>
        </div>
      </Popup>
    </div>
  );
};
