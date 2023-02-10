import { IconType } from "react-icons/lib";

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
  isIncome: boolean;
  category: string;
  title: string;
  money: number;
  date: string;
}

export interface Category {
  Icon: IconType;
  title: string;
}

export type KeyActions = "back" | "clear" | "ok";
