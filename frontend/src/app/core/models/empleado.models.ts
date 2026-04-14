export interface EmpleadoView {
  clave: string;
  nombre: string;
  direccion: string;
  telefono: string;
}

export interface EmpleadoCreateInput {
  nombre: string;
  direccion: string;
  telefono: string;
}

export interface EmpleadoUpdateInput {
  nombre: string;
  direccion: string;
  telefono: string;
}

export interface SessionCredentials {
  username: string;
  password: string;
  encodedAuthorization: string;
}

export interface UiOperationState {
  loading: boolean;
  successMessage?: string;
  errorMessage?: string;
  lastErrorCode?: number;
}
