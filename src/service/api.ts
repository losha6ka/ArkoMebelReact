export const api = {
    submitOrder: async (data: any) => {
        console.log("Отправка на сервер:", data);
        return Promise.resolve({ status: 'ok' });
    }
};
