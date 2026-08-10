import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
// Nous définissons des hooks personnalisés pour utiliser le dispatch et le sélecteur de l'état global de Redux avec TypeScript. 
// Cela permet d'avoir une meilleure autocomplétion et de réduire les erreurs de typage lors de l'utilisation de Redux dans notre application.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
