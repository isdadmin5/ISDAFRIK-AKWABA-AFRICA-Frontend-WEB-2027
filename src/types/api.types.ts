// Nous définissons ici les types pour les réponses de l'API, y compris les métadonnées et les erreurs éventuelles.

export interface ApiMeta {
  timestamp: string;
  page?: number;
  perPage?: number;
  total?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
