"use strict";
const getUser = document.querySelector('#user');
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector('.main-container');
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
    const main_container = document.getElementById('main-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${user.avatar_url}" alt="${'avatar_img'}">
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
const data = fetchUserData('https://api.github.com/users');
