export type Gender = "male" | "female";

export interface UserProfile {
  name: string;
  birthDate: string;
  gender: Gender;
}

export interface LifeEvent {
  id: number;
  title: string;
  choice: string;
  effect: number;
}

export type ScreenState = "setup" | "dashboard";
