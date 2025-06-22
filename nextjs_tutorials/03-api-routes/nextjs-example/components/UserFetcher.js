import React, { useState, useEffect } from 'react';

function UserFetcher({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setUser(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <div>加载用户数据...</div>;
  if (error) return <div>错误: {error.message}</div>;
  if (!user) return <div>没有用户数据。</div>;

  return (
    <div>
      <h3>用户详情 (通过 API 路由获取)</h3>
      <p>ID: {user.id}</p>
      <p>姓名: {user.name}</p>
    </div>
  );
}

export default UserFetcher;