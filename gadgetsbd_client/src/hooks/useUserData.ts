export const useUserData = () => {

    const data = JSON.parse(localStorage.getItem("user")!)

    return data
}