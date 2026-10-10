import {Navigate } from 'react-router';

function Protected({ isSignedIn, children }){
   if(!isSignedIn){
    return <Navigate to="/login" replace />
   }
    return children
}
export default Protected