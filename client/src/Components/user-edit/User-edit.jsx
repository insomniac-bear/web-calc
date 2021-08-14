// Third party libraries
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Components
import { UpdateUserForm } from '../update-user-form/Update-user-form';
import { Loading } from '../loading/Loading';
// Utils
import { fetchedData } from '../../util/utils';

export const UserEdit = () => {
  const params = useParams();
  const userId = params.userId;
  const [user, setUser] = useState();

  useEffect(() => {
    let ignore = false;
    const loadUser = async () => {
      const userData = await fetchedData('user/user', 'POST', {userId});
      if (!ignore) {
        setUser(userData.data.data);
      }
    };

    loadUser();
    return () => {ignore = true}
  }, [userId])

  return <React.Fragment>
    {!user && <Loading />}
    {user && <UpdateUserForm 
      login={user.user.login}
      role={user.user.role}
      id={user.user._id}
    />}
  </React.Fragment>
}
