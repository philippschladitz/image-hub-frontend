export interface LoginResponse {
    expires_in: number;
    issued_at: number;
    access_token: string;
    user_id: {
        id: string;
        email: string;
    };
    status: number;
}
