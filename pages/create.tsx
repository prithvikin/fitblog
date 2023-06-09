// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, minutes, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {

      console.error(error);
    }


  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New FitBlog Post</h1>
          <p>Draft an Activity, how long you exercised, and any additional comments</p>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Activity"
            type="text"
            value={title}
          />
          <label>Duration: </label>
          <input
            autoFocus
            onChange={(e) => setMinutes(e.target.valueAsNumber)}
            placeholder="Duration (minutes)"
            type="number"
            value={minutes}
          />
          <label> minutes </label>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comments"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }



        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='number'],
        textarea {
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;