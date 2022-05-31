const today = new Date();
const yesterday = new Date().setDate(today.getDate() - 1);
const tomorrow = new Date().setDate(today.getDate() + 1);

const tasks = [
    {id: 1, name: 'to eat', description: 'to eat something really tasty', done: true, due_date: today, list_id: 1},
    {id: 2, name: 'to walk', description: 'to have a lonely long walk by the beach', done: false, list_id: 1},
    {id: 3, name: 'to work', description: 'to work hard and persistent', done: false, due_date: yesterday, list_id: 2},
    {id: 4, name: 'to sleep', done: false, due_date: tomorrow, list_id: 1},
]

module.exports = tasks;