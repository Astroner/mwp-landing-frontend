import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortal {
    children: ReactNode
}

const Portal: FC<IPortal> = ({ children }) => createPortal(children, document.body);

export default Portal;