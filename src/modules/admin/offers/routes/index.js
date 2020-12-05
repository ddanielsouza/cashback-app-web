import ListOffers from '../views/ListOffers';
import CreateOffers from '../views/CreateOffers';
import EditOffers from '../views/EditOffers';

const routesOffers = [
   {
      path: '/offers/create',
      name: 'CreateOffers',
      component: CreateOffers,
      meta: { auth: true },
   },
   {
      path: '/offers',
      name: 'ListOffers',
      component: ListOffers,
      meta: { auth: true },
   },
   {
      path: '/offers/:id',
      name: 'EditOffers',
      component: EditOffers,
      meta: { auth: true },
   },
];

export default routesOffers;
