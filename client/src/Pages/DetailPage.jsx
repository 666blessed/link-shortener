import React, { useEffect, useState, useContext, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
import LinkCard from '../components/LinkCard';

function DetailPage() {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const linkId = useParams().id;
  const [link, setLink] = useState(null);

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (error) {
      
    }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && link && <LinkCard link={link}/>}
    </>
  );
}

export default DetailPage;
