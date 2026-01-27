export interface ISupabaseUser {
  id: string;
  aud: string;
  role: string;
  email: string;

  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  recovery_sent_at?: string;
  last_sign_in_at: string;
  app_metadata: ISupabaseAppMetadata;
  user_metadata: ISupabaseUserMetadata;
  identities: ISupabaseUserIdentity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface ISupabaseAppMetadata {
  provider: string;
  providers: string[];
}

export interface ISupabaseUserMetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  role: 'client' | 'administrator';
  sub: string;
  [key: string]: any;
}

export interface ISupabaseUserIdentity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: ISupabaseIdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface ISupabaseIdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}