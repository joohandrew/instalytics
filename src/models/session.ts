export interface Session {
    isAuthenticated?: boolean;
    redirectPathOnAuthentication?: string;
    accessToken? : string;
  }
  
  export const initialSession: Session = {}