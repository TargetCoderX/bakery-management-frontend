const accessLocalStorage = (key_name) => {
    return JSON.parse(localStorage.getItem(key_name));
}

export {
    accessLocalStorage,
}