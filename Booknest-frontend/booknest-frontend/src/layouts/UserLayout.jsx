// src/layouts/UserLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';

export default function UserLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    if (searchQuery) setSearchParams({ search: searchQuery });
    else setSearchParams({});
  }, [searchQuery]);

  return (
    <>
      <AppNavbar onSearch={setSearchQuery} />
      <div className="container">
        <Outlet context={{ searchQuery }} />
      </div>
    </>
  );
}