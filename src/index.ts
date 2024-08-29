const getUser = document.querySelector("#user") as HTMLInputElement;
const formSubmit: HTMLFormElement | null = document.querySelector("#form");
const mainContainer = document.querySelector(".main-container") as HTMLElement;

interface UserData {
  id: number;
  avatar_url: string;
  login: string;
  html_url: string;
}

const reusableFunction = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.json();
  console.log(data);
  return data;
};

const showCard = (user: UserData) => {
  const main_container = document.getElementById(
    "main-container"
  ) as HTMLDivElement;
  const card = document.createElement("div") as HTMLDivElement;
  card.classList.add("card");
  card.innerHTML = `
            <img src="${user.avatar_url}" alt="${"avatar_img"}">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Visit Profile</a>
    `;
  main_container.appendChild(card);
};

const fetchUserData = (url: string) => {
  reusableFunction<UserData[]>(url, {}).then((users) => {
    for (const user of users) {
      showCard(user);
    }
  });
};

fetchUserData("https://api.github.com/users");

formSubmit?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = getUser.value.toLowerCase();
  try {
    const url = `https://api.github.com/users`;
    const allUsers = await reusableFunction<UserData[]>(url, {});
    const filteredUsers = allUsers.filter((user) => {
        return user.login.toLowerCase().includes(username);
    })
    const mainContainer = document.getElementById(
        "main-container"
    ) as HTMLDivElement;
    mainContainer.innerHTML = "";
    if (filteredUsers.length === 0) {
        mainContainer.innerHTML = `<h3>No user found</h3>`;
    } else {
        for (const user of filteredUsers) {
            showCard(user);
        }
    }
  } catch (error) {
    alert("Something went wrong");
    window.location.reload();
  }
});