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
const fetchUserData = (url) => {
    reusableFunction(url, {});
};
const data = fetchUserData('https://api.github.com/users');
