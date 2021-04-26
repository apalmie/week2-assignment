import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unBookmarked from './_images/unBookmarked.png';
import bookmarked from './_images/bookmarked.jpg';
import hasAudio from './_images/audio-available.jpg';
import hasNoAudio from './_images/noAudio.png';

class BlogItem extends Component {
  static propTypes = {
    myPicks: PropTypes.array,
    missedPicks: PropTypes.array,
    takeMeToTheArticle: PropTypes.func.isRequired,
    bookmarkMe: PropTypes.func.isRequired
  }

  render() {
    const articleItems = this.props.myPicks.map((article, idx) => {
      const isArticleBookmarked = article.isBookmarked
        ? bookmarked
        : unBookmarked;
      const hasAudioIcon = article.hasAudioAvailable
        ? hasAudio
        : hasNoAudio;

      return(
        <div
          class="container tile"
          key={idx}
          style={{
            cursor: 'pointer'
          }}
        >
          <div onClick={this.props.takeMeToTheArticle(idx)}>
            <img
              class="article-image"
              src={article.image}
              alt='main'
            ></img>
          </div>
          <div class="article-details">
            <img
              class="article-audio"
              src={hasAudioIcon}
              alt='Audio'
            ></img>
            <div class="article-title">{article.title}</div>
            <div class="article-description">{article.description}</div>
            <div class="author-details">
              <div class="author-image">
                <img
                  src={article.authorImage}
                  class="profile-pic"
                  alt={article.authorName}
                ></img>
              </div>
              <div class="other-info">
                <div class="author-name">{article.authorName}</div>
                <div class="article-meta-data">
                  <div class="article-post-date">{article.postedDate}</div>
                  <span>&#183;</span>
                  <div class="minutes-to-read">{article.minutesToRead}</div>
                  <img
                    class="bookmark"
                    onClick={this.props.bookmarkMe(idx)}
                    src={isArticleBookmarked}
                    alt='bookmark'
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return <div class="container">{articleItems}</div>;
  }
}

export default BlogItem;
