import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { uiActions } from './store/Ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
 const showCart = useSelector((state) => state.ui.cartIsVisible)
 const cart = useSelector(state=> state.cart);
 const notification = useSelector(state=> state.ui.notification)
 useEffect(()=>{
  const sendCartData = async()=> {
    dispatch(uiActions.showNotification({
      status: 'sending',
      title: "sending...",
      massage: 'sending cart data!'
    }))
    const response = await fetch('https://expense-tracker-7fe45-default-rtdb.firebaseio.com/cart.json',{
method:'PUT',
body: JSON.stringify(cart),
  })
  if(!response.ok){
    throw new Error("sending cart data failed!")
    // dispatch(uiActions.showNotification({
    //   status: 'error',
    //   title: "Error...",
    //   massage: 'sending cart data failed!'
    // }))
  }

  // const responseData = response.json()
  dispatch(uiActions.showNotification({
    status: 'success',
    title: "success...",
    massage: 'sent cart data successfully!'
  }))
  }
  if(isInitial){
    isInitial=false;
    return;
  }
  sendCartData().catch(error => {
        dispatch(uiActions.showNotification({
      status: 'error',
      title: "Error...",
      massage: 'sending cart data failed!'
    }))
  })
 },[cart,dispatch])
  return (
    <Fragment>
     {notification && <Notification status={notification.status} title={notification.title} massage={notification.massage}/>}
<Layout>
     {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;
