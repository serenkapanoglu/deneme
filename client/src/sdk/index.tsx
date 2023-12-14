import { Aon } from "./aon";

//global app intance, use this to perform custom app-specific logic
export const aon = new Aon();

//semantic sugar to make it clear that the zustand store is actually a react hook too
export const useAon = aon.store;
