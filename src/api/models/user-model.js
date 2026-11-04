const userItems = [
    {
        user_id: 3609,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@metropolia.fi',
        role: 'user',
        password: 'password1',
    },
    {
        user_id: 5301,
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane@metropolia.fi',
        role: 'user',
        password: 'password2',
    },
    {
        user_id: 1208,
        name: 'Ellina Kiriliuk',
        username: 'ellinakiriliuk',
        email: 'ellina@metropolia.fi',
        role: 'user',
        password: 'password3',
    }
];

const listAllUsers = () => userItems;

const findUserById = (id) => {
    return userItems.find((user) => user.user_id == id);
};

const addUser = (user) => {
    const newId = Math.max(...userItems.map((item) => item.user_id)) + 1;
    const newUser = {
        user_id: newId,
        ...user
    };
    userItems.unshift(newUser);
    return newUser;
};


export { listAllUsers, findUserById, addUser };