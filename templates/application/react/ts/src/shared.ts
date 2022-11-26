
export const getJWT = () => {
    return localStorage.getItem('jwt') ?? 'DEV_MODE';
}

