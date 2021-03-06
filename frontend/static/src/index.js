import React from 'react';
import ReactDOM from 'react-dom';
import { browserRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ArticlesListPopular from './components/ArticlesListPopular';
import CreateArticle from './components/CreateArticle'
import Login from './components/Login'
import Register from './components/Register'
import AuthorArticleView from './components/AuthorArticleView'
import AdminList from './components/AdminList'
import ArticlesListTrend from './components/ArticlesListTrend'
import ArticlesListAll from './components/ArticlesListAll'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='' element={<ArticlesListPopular/>}/>
          <Route path='articles' element={<AuthorArticleView/>}/>
          <Route path='create' element={<CreateArticle/>}/>
          <Route path='popular' element={<ArticlesListPopular/>}/>
          <Route path='trending' element={<ArticlesListTrend/>}/>
          <Route path='all' element={<ArticlesListAll/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='admin' element={<AdminList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
