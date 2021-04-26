import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import BlogItem from './BlogItem';
import './BlogApp.css';
import yourArticles from './_data/your-articles.json';
import missedArticles from './_data/missed-articles.json';

const mon = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function setMyPicks(articles) {
  let settingArticles = [];
  articles.map((article, idx) => {
    const newDate = new Date(article.postedDate)

    settingArticles.push({
      title: article.title,
      description: article.description,
      image: article.image,
      link: article.link,
      postedDate: `${mon[newDate.getMonth()+1]} ${newDate.getDay()}`,
      minutesToRead: `${article.minutesToRead} min read`,
      hasAudioAvailable: article.hasAudioAvailable,
      memberPreview: article.memberPreview,
      authorName: article.author.name,
      authorImage: article.author.image,
      authorIsMemeber: article.author.isMediumMember,
      isBookmarked: false
    });
  })

  return settingArticles;
}

class BlogApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPicks: [],
      missedPicks: []
    };
  }

  componentDidMount() {
    this.setState({
      myPicks: setMyPicks(yourArticles),
      missedPicks: setMyPicks(missedArticles)
    })
  }

bookmarkMe = (idx) => {
    return() => {
      const article = this.state.myPicks[idx];
      const bookmarkedArticle = {
        ...article,
        isBookmarked: !article.isBookmarked
      };

      const myNewPicks= [
        ...this.state.myPicks.slice(0,idx),
        bookmarkedArticle,
        ...this.state.myPicks.slice(idx+1)
      ];

      this.setState({
        myPicks: myNewPicks
      });
    }
  }

  openArticle = (idx) => {
    return() => {
      const openArticleX = this.state.myPicks[idx].link;
      window.open(`${openArticleX}`,"_blank");
    }
  }

  render() {
    return(
      <div className="BlogApp">
        <h1>For You</h1>
        <BlogItem
          myPicks={this.state.myPicks}
          takeMeToTheArticle={this.openArticle}
          bookmarkMe={this.bookmarkMe}
        />
        <h1>In Case You Missed It</h1>
        <BlogItem
          myPicks={this.state.missedPicks}
          takeMeToTheArticle={this.openArticle}
          bookmarkMe={this.bookmarkMe}
        />
      </div>
    )
  }
}


export default BlogApp;
