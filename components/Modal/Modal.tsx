"use client";

import { useEffect, useCallback, type ReactNode, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose?: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
      return;
    }

    router.back();
  }, [onClose, router]);

  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeClick);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
