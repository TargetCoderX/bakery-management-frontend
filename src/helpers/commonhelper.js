import { confirmAlert } from "react-confirm-alert";

const accessLocalStorage = (key_name) => {
    return JSON.parse(localStorage.getItem(key_name));
}

const showConfirmAlert = (deleteCustomerFunction) => {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
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