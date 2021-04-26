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
          className="tile"
          key={idx}
          style={{
            cursor: 'pointer'
          }}
        >
          <div
            className="article-image"
            onClick={this.props.takeMeToTheArticle(idx)}
            style={{
              backgroundImage: `url(${article.image})`
            }}
          >
          </div>
          <div className="article-details">
            <img
              className="article-audio"
              src={hasAudioIcon}
              alt='Audio'
            ></img>
            <span className="meta-data">
              {article.hasAudioAvailable ? 'Has ': 'No '} Audio Available
            </span>
            <div
              className="article-title"
              onClick={this.props.takeMeToTheArticle(idx)}
            >{article.title}</div>
            <div
              className="article-description"
              onClick={this.props.takeMeToTheArticle(idx)}
            >{article.description}</div>
            <div className="author-details">
              <div className="author-image">
                <img
                  src={article.authorImage}
                  className="profile-pic"
                  alt={article.authorName}
                ></img>
              </div>
              <div className="spacer"></div>
              <div className="other-info">
                <div className="author-name">{article.authorName}</div>
                <div className="article-meta-data">
                  <div className="article-post-date">{article.postedDate}</div>
                  <span>&#183;</span>
                  <div className="minutes-to-read">{article.minutesToRead}</div>
                  <img
                    className="bookmark"
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

    return <div className="tiles">{articleItems}</div>;
  }
}

export default BlogItem;
