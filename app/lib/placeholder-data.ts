// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Voluntier',
    email: 'voluntier@creu-roja.cat',
    password: '123456',
  },
];

const voluntiers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Joseima Ferrer',
    email: 'joseima@ferre.com',
    image_url: '/voluntiers/joseima-ferre.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Samurai Bear',
    email: 'samurai@bear.com',
    image_url: '/voluntiers/samurai-bear.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Cat Stevens',
    email: 'cat@stevens.com',
    image_url: '/voluntiers/cat-stevens.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Nice Rabbit',
    email: 'nice@rabbit.com',
    image_url: '/voluntiers/nice-rabbit.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Bender Rodriguez',
    email: 'bender@rodriguez.com',
    image_url: '/voluntiers/bender-rodriguez.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Doggy Houser',
    email: 'doggy@houser.com',
    image_url: '/voluntiers/doggy-houser.png',
  },
];

const activities = [
  {
    voluntier_id: voluntiers[0].id,
    title: 'Dinner',
    description: 'Assist the team in organizing and distributing the dinner',
    status: 'pending',
    date: '2024-12-06',
  },
  {
    voluntier_id: voluntiers[1].id,
    title: 'Breakfast',
    description: 'Assist the team in organizing and distributing the breakfast',
    status: 'pending',
    date: '2024-11-14',
  },
  {
    voluntier_id: voluntiers[4].id,
    title: 'Lunch',
    description: 'Assist the team in organizing and distributing the lunch',
    status: 'taken',
    date: '2024-10-29',
  },
  {
    voluntier_id: voluntiers[3].id,
    title: 'Gardening workshop',
    description: 'Collaborate in the gardening workshop',
    status: 'taken',
    date: '2025-09-10',
  },
  {
    voluntier_id: voluntiers[5].id,
    title: 'Sports activity - football match',
    description: 'Accompany the group to the location and collaborate with the sports activity',
    status: 'pending',
    date: '2025-08-05',
  },
  {
    voluntier_id: voluntiers[2].id,
    title: 'Computer workshop',
    description: 'Collaborate in the computer workshop',
    status: 'pending',
    date: '2025-07-16',
  },
  {
    voluntier_id: voluntiers[0].id,
    title: 'English lessons',
    description: 'Collaborate and participate in English classes',
    status: 'pending',
    date: '2025-06-27',
  },
  {
    voluntier_id: voluntiers[3].id,
    title: 'Cooking time',
    description: 'Help and collaborate in kitchen activities',
    status: 'taken',
    date: '2025-06-09',
  },
];

const realized = [
  { month: 'Jan', amount: 200 },
  { month: 'Feb', amount: 180 },
  { month: 'Mar', amount: 220 },
  { month: 'Apr', amount: 250 },
  { month: 'May', amount: 230 },
  { month: 'Jun', amount: 320 },
  { month: 'Jul', amount: 350 },
  { month: 'Aug', amount: 370 },
  { month: 'Sep', amount: 250 },
  { month: 'Oct', amount: 280 },
  { month: 'Nov', amount: 300 },
  { month: 'Dec', amount: 480 },
];

export { users, voluntiers, activities, realized };
