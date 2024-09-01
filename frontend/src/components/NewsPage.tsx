import React, { FC, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './UI-HomePage/NewsPage.module.scss';
import Header from "./UI-HomePage/Header/Header";
import Footer from "./UI/Footer/Footer";
import Modal from "./UI-SubjectPage/Modal/Modal";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  img: string | ArrayBuffer | null;
}

const NewsPage: FC = () => {

  const [isModalActive, setIsModalActive] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', date: '', img: '' });

  const navigate = useNavigate();

  const TITLE_LIMIT = 200;

  const handleCreatePostClick = () => {
    setIsModalActive(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost(prevState => ({ ...prevState, img: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }

  const handleContentChange = (content: string) => {
    setNewPost(prevState => ({ ...prevState, content }));
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPostData = {
      ...newPost,
      id: Date.now(),
    };
    setPosts([...posts, newPostData]);
    setIsModalActive(false);
    setNewPost({ title: '', content: '', date: '', img: '' });
    console.log(newPost)
  }

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  }

  const handlePostClick = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      navigate(`/post/${postId}`, { state: { post } });
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className={classes.wrapper}>
      <Header></Header>
      <main className={classes.main}>
        <div className={classes.main__container}>
          <h1 className={classes.main__title}>Новини коледжу</h1>
          <button className={classes.main__button} onClick={handleCreatePostClick}>Створити пост</button>
          <div className={classes.main__posts}>
            {posts.map(post => (
              <div 
                key={post.id} 
                className={classes.main__post}
                onClick={() => handlePostClick(post.id)}
              >
                <div className={classes.post__img}>
                  {post.img && <img src={post.img as string} alt="Post image" />}
                </div>
                <div className={classes.post__content}>
                  <h2 className={classes.post__title}>{post.title}</h2>
                  <div className={classes.post__data}>
                    {post.date}
                    <button
                      className={classes.post__deleteButton}
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 9.88821L9.88821 11L5.5 6.61179L1.11179 11L0 9.88821L4.38821 5.5L0 1.11179L1.11179 0L5.5 4.38821L9.88821 0L11 1.11179L6.61179 5.5L11 9.88821Z" fill="black"/>
                      </svg>
                    </button>
                  </div>
                  <div className={classes.post__text} dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer className='footer'></Footer>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <h3 className={classes.modal__title}>Створення нового посту</h3>
        <form className={classes.modal__form} onSubmit={handleFormSubmit}>
          <div className={classes.modal__req}>
            <label className={classes.modal__text}>Заголовок:</label>
            <input
              maxLength={TITLE_LIMIT}
              className={classes.modal__input}
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={classes.modal__req}>
            <label className={classes.modal__text}>Дата:</label>
            <input
              className={classes.modal__input}
              type="date"
              name="date"
              value={newPost.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={classes.modal__req}>
            <label className={classes.modal__text}>Зображення:</label>
            <input
              className={classes.modal__input}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className={classes.modal__button} type="submit">Зберегти</button>
          <div className={classes.modal__req}>
            <label className={classes.modal__text}>Контент:</label>
            <ReactQuill 
              className={classes.modal__input}
              value={newPost.content}
              onChange={handleContentChange}
              modules={modules}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default NewsPage;
