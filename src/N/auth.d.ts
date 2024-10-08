declare module "N/auth" {
    interface ChangePasswordOptions {
        currentPassword: string;
        newPassword: string;
    }

    interface ChangeEmailOptions {
        password: string;
        newEmail: string;
        onlyThisAccount?: boolean;
    }

    /**
     * Method used to change the current user’s NetSuite email address (user name).
     */
    export function changeEmail(options: ChangeEmailOptions): void;

    /**
     * Method used to change the current user’s NetSuite password.
     */
    export function changePassword(options: ChangePasswordOptions): void;
}
