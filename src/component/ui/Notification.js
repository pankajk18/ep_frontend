import { message } from "antd";

export const showMsg = (msg, url = '', type = 'success', duration = 1000) => {
    if (type === 'error') {
        message.error(msg);    // Show error message
    } else {
        message.success(msg);    // Show success message
    }
    if (url) {
        setTimeout(() => {
            window.location.href = url;
        }, duration);
    }

};
