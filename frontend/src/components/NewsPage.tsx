import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classes from "./UI-HomePage/NewsPage.module.scss";
import Header from "./UI-HomePage/Header/Header";
import Footer from "./UI/Footer/Footer";
import Modal from "./UI-SubjectPage/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { createPost, deletePosts, getPosts } from "../network/auth_api";
import { motion } from "framer-motion";

export interface createdPost {
  id: string;
  title: string;
  content: string;
  img: File;
}
export interface loadedPosts {
  id: string;
  title: string;
  content: string;
  cover: string;
  slug: string;
  createdAt: Date;
}

const NewsPage: FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [createdPosts, setCreatedPosts] = useState<createdPost[]>([]);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [newPost, setNewPost] = useState<{
    title: string;
    content: string;
    img: File | null;
  }>({
    title: "",
    content: "",
    img: null,
  });

  const navigate = useNavigate();

  const TITLE_LIMIT = 200;

  const handleCreatePostClick = () => {
    setIsModalActive(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost((prevState) => ({ ...prevState, img: file }));
    }
  };

  const handleContentChange = (content: string) => {
    setNewPost((prevState) => ({ ...prevState, content }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPostData = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date(),
      cover: newPost.img,
    };

    try {
      const createdPost = await createPost(newPostData);
      setLoadedPosts([createdPost, ...loadedPosts]);
      setIsModalActive(false);
      setNewPost({ title: "", content: "", img: null });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    setLoadedPosts(loadedPosts.filter((post) => post.id !== postId));
    // useEffect(() => {
    //   const fetchDelete = async () => {
    const deletePost = await deletePosts(postId);
    //   };
    //   fetchDelete();
    // }, []);
  };

  const handlePostClick = (slug: string) => {
    const post = loadedPosts.find((p) => p.slug === slug);
    if (post) {
      navigate(`/post/${slug}`, { state: { post } });
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await getPosts();
        setLoadedPosts(posts);
        console.log(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Header></Header>
      <main className={classes.main}>
        <div className={classes.main__container}>
          <h1 className={classes.main__title}>Новини коледжу</h1>
          <button
            className={classes.main__button}
            onClick={handleCreatePostClick}>
            Створити пост
          </button>
          <div className={classes.main__posts}>
            {loadedPosts.map((post: loadedPosts) => (
              <motion.div
                key={post.id}
                className={classes.main__post}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}>
                <div
                  className={classes.post__img}
                  onClick={() => handlePostClick(post.slug)}>
                  <img
                    src={`${import.meta.env.VITE_HOST}/public/${post.cover}`}
                    alt="Post image"
                  />
                </div>
                <div className={classes.post__content}>
                  <h2
                    className={classes.post__title}
                    onClick={() => handlePostClick(post.slug)}>
                    {post.title}
                  </h2>
                  <div className={classes.post__data}>
                    {new Date(post.createdAt!).toLocaleDateString("uk-UA")}
                    <button
                      className={classes.post__deleteButton}
                      onClick={() => handleDeletePost(post.id)}>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11 9.88821L9.88821 11L5.5 6.61179L1.11179 11L0 9.88821L4.38821 5.5L0 1.11179L1.11179 0L5.5 4.38821L9.88821 0L11 1.11179L6.61179 5.5L11 9.88821Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className={classes.post__text}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    onClick={() => handlePostClick(post.slug)}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer className="footer"></Footer>
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
            <label className={classes.modal__text}>Зображення:</label>
            <input
              className={classes.modal__input}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button className={classes.modal__button} type="submit">
            Зберегти
          </button>
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
};

export default NewsPage;
