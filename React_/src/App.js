import React, { useState, useEffect } from 'react';
import './App.css';

const localUsers = require('./datajson/users.json');
const localPosts = require('./datajson/posts.json');

function App() {
  // Состояния
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Настройки
  const [viewMode, setViewMode] = useState('all-posts');
  const [dataSource, setDataSource] = useState('local');

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (dataSource === 'local') {
          setUsers(localUsers);
          setPosts(localPosts);
        } else {
          const [usersResponse, postsResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts')
          ]);

          if (!usersResponse.ok || !postsResponse.ok) {
            throw new Error('Failed to fetch data from API');
          }

          const [apiUsers, apiPosts] = await Promise.all([
            usersResponse.json(),
            postsResponse.json()
          ]);

          setUsers(apiUsers);
          setPosts(apiPosts);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataSource]);

  // Фильтрация постов
  const userPosts = posts.filter(post => post.userId === selectedUserId);

   const renderContent = () => {
    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    if (viewMode === 'all-posts') {
      return (
          <div className="posts-container">
            {posts.map(post => {
              const user = users.find(u => u.id === post.userId);
              return (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      {user ? user.name : 'Unknown User'}
                    </div>
                    <div className="post-body">
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                  </div>
              );
            })}
          </div>
      );
    } else {
      return (
          <>
            <div className="users-list">
              <h2>Users</h2>
              <ul>
                {users.map(user => (
                    <li
                        key={user.id}
                        onClick={() => setSelectedUserId(user.id)}
                        className={selectedUserId === user.id ? 'active' : ''}
                    >
                      {user.name}
                    </li>
                ))}
              </ul>
            </div>

            <div className="user-posts-container">
              {selectedUserId ? (
                  <>
                    <h2>Posts by {users.find(u => u.id === selectedUserId)?.name}</h2>
                    {userPosts.map(post => (
                        <div key={post.id} className="post-card">
                          <h3>{post.title}</h3>
                          <p>{post.body}</p>
                        </div>
                    ))}
                  </>
              ) : (
                  <div className="placeholder">Select a user to view posts</div>
              )}
            </div>
          </>
      );
    }
  };

  return (
      <div className="app">
        <div className="controls">
          <div className="control-group">
            <h3>View Mode:</h3>
            <button
                onClick={() => setViewMode('all-posts')}
                disabled={viewMode === 'all-posts'}
            >
              All Posts
            </button>
            <button
                onClick={() => setViewMode('user-list')}
                disabled={viewMode === 'user-list'}
            >
              User List
            </button>
          </div>

          <div className="control-group">
            <h3>Data Source:</h3>
            <button
                onClick={() => setDataSource('local')}
                disabled={dataSource === 'local'}
            >
              Local Data
            </button>
            <button
                onClick={() => setDataSource('api')}
                disabled={dataSource === 'api'}
            >
              API Data
            </button>
          </div>
        </div>

        <div className="content">
          {renderContent()}
        </div>
      </div>
  );
}

export default App;