const getUser = document.querySelector('#user') as HTMLInputElement;
const formSubmit: HTMLFormElement | null = document.querySelector("#form")
const mainContainer = document.querySelector('.main-container') as HTMLElement;

interface UserData {
    id: number
    name: string
    avatar_url: string
    login: string
    location: string
    url: string
}

const reusableFunction = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = response.json()
    console.log(data);
    return data
}

const fetchUserData = (url: string) => {
    reusableFunction<UserData[]>(url, {})   
}

const data = fetchUserData('https://api.github.com/users');