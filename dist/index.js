"use strict";
const getUser = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main-container");
const reusableFunction = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = response.json();
    console.log(data);
    return data;
};
const showCard = (user) => {
    const main_container = document.getElementById("main-container");
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${user.avatar_url}" alt="${"avatar_img"}">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Visit Profile</a>
    `;
    main_container.appendChild(card);
};
const fetchUserData = (url) => {
    reusableFunction(url, {}).then((users) => {
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
        const allUsers = await reusableFunction(url, {});
        const filteredUsers = allUsers.filter((user) => {
            return user.login.toLowerCase().includes(username);
        });
        const mainContainer = document.getElementById("main-container");
        mainContainer.innerHTML = "";
        if (filteredUsers.length === 0) {
            mainContainer.innerHTML = `<h3>No user found</h3>`;
        }
        else {
            for (const user of filteredUsers) {
                showCard(user);
            }
        }
    }
    catch (error) {
        alert("Something went wrong");
        window.location.reload();
    }
});