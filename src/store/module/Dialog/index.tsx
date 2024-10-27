import React from "react";
import Provider from "./Provider";
import { ModalSlots, SlotsToClasses } from "@nextui-org/react";
import { Store } from "@/store/standard/base";
import { RootStore } from "@/store/root";
import { makeAutoObservable } from "mobx";

export class DialogStore implements Store {
  sid = "DialogStore";
  provider = () => <Provider />;

  isOpen = false;
  preventClose = false;
  placement: "center" | "auto" | "top" | "bottom" | "top-center" | "bottom-center";
  title = "";
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" = "md";
  onlyContent = false;
  className: string = "";
  classNames?: SlotsToClasses<ModalSlots>;
  theme = "default";
  content: React.ReactNode | ((props: any) => React.ReactNode) = "";
  isDismissable = true;

  constructor(args?: Partial<DialogStore>) {
    const classNames = {
      ...args?.classNames
    }
    Object.assign(this, args, { classNames });
    makeAutoObservable(this)
  }


  setData(v: Partial<DialogStore>) {
    Object.assign(this, v);
  }

  close() {
    this.isOpen = false;
    this.title = "";
    this.content = "";
    this.size = "md";
    this.isDismissable = true;
    this.onlyContent = false
  }

  static show(v: Partial<DialogStore>) {
    const classNames = {
      ...v?.classNames
    }
    RootStore.Get(DialogStore).setData({
      ...v,
      classNames,
      isOpen: true,

    });
  }

  static close() {
    RootStore.Get(DialogStore).close();
  }
}
