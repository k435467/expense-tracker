import { IconType } from "react-icons/lib";

declare global {
  interface Window {
    myCache?: {
      records: any;
    };
  }
}

/**
 * User profile information
 */
export interface UserInfo {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
  readonly uid: string;
}

export interface AuthState {
  readonly user: UserInfo | null;
  readonly loading: boolean;
}

export interface Record {
  category: string;
  title: string;
  money: number;
  date: string;
  createTime: string;
}

export interface Category {
  readonly Icon: IconType;
  readonly title: string;
}

export type KeyActions = "back" | "clear" | "ok";
