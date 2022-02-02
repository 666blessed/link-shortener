import React, {useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import useHttp from '../hooks/http.hook';
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

function LinksPage() {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      console.log('fetched: ' + fetched);
      setLinks(fetched);
    } catch (error) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links}/>}
    </>
  );
}

export default LinksPage;
