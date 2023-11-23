import React, { ReactNode } from "react";

interface IColumn {
  children: ReactNode;
  className?: string;
}

const Column = ({ children, className }: IColumn) => {
    return <div className={`p-8 h-full ${className}`}>{children}</div>;
};

export default Column;
