import { confirmAlert } from "react-confirm-alert";

const accessLocalStorage = (key_name) => {
    return JSON.parse(localStorage.getItem(key_name));
}

const showConfirmAlert = (deleteCustomerFunction,title,description) => {
    confirmAlert({
        title: title,
        message: description,
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    deleteCustomerFunction();
                }
            },
            {
                label: 'No',
                onClick: () => { }
            }
        ]
    });
}

export {
    accessLocalStorage,
    showConfirmAlert,
}