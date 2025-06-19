import React from 'react';
import { ChevronRight } from 'lucide-react';
import video from '../../../assets/video.jpeg';
import profile from '../../../assets/profile.jpg';

const ProductTabs = ({ activeTab, setActiveTab, productViewData }) => {
  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'questions' ? 'active' : 'inactive'}`}
          onClick={() => setActiveTab('questions')}
        >
          Questions & Answers
        </button>
        <button
          className={`tab-button ${activeTab === 'video' ? 'active' : 'inactive'}`}
          onClick={() => setActiveTab('video')}
        >
          Video
        </button>
        <button
          className={`tab-button ${activeTab === 'reviews' ? 'active' : 'inactive'}`}
          onClick={() => setActiveTab('reviews')}
        >
          Customer Review
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'questions' && (
          <div>
            {productViewData.qaData.map(qa => (
              <div key={qa.id} className="qa-item">
                <p className="qa-question">Q: {qa.question}</p>
                <p className="qa-answer">A: {qa.answer}</p>
                <div className="qa-meta">
                  <span className="qa-author">{qa.author}<br />Seller</span>
                  <div className="qa-actions">
                    <div className="qa-action">
                      <button className="qa-button helpful">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="qa-count">{qa.helpful}</span>
                    </div>
                    <div className="qa-action">
                      <button className="qa-button unhelpful">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23765 1.99446 4.76961 2.16359 4.40209 2.47599C4.03457 2.78839 3.79232 3.22309 3.72 3.7L2.34 12.7C2.29651 12.9866 2.31583 13.2793 2.39666 13.5577C2.47749 13.8362 2.61791 14.0937 2.80815 14.3125C2.99839 14.5313 3.23386 14.7061 3.49837 14.8248C3.76289 14.9435 4.05009 15.0033 4.34 15H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="qa-count">0</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="see-more">
              See More Q&A <ChevronRight className="see-more-icon" />
            </button>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="video-container">
            <img src={video} alt="Product Video" className="video-image" />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-container">
            <div>
              <h3 className="reviews-header">Ratings & Reviews</h3>
              <div className="rating-summary">
                <span className="rating-average">{productViewData.ratingStats.average}</span>
                <span className="rating-star">★</span>
                <span className="rating-count">{productViewData.ratingStats.total} ratings, {productViewData.reviews.length} Reviews</span>
              </div>

              <div className="rating-bars">
                {Object.entries(productViewData.ratingStats.distribution).map(([key, value]) => (
                  <div key={key} className="rating-bar">
                    <span className="rating-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <div className="rating-progress">
                      <div className={`rating-fill ${key}`} style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {productViewData.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-avatar">
                      <img src={profile} alt={review.author} />
                    </div>
                    <div>
                      <p className="review-author">{review.author}</p>
                      <div className="review-rating">
                        <div className="review-stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                          ))}
                        </div>
                        <span className="review-date">Posted On {review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                  <div className="review-actions">
                    <div className="review-action">
                      <button className="review-button helpful">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="review-count">{review.helpful}</span>
                    </div>
                    <div className="review-action">
                      <button className="review-button unhelpful">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23765 1.99446 4.76961 2.16359 4.40209 2.47599C4.03457 2.78839 3.79232 3.22309 3.72 3.7L2.34 12.7C2.29651 12.9866 2.31583 13.2793 2.39666 13.5577C2.47749 13.8362 2.61791 14.0937 2.80815 14.3125C2.99839 14.5313 3.23386 14.7061 3.49837 14.8248C3.76289 14.9435 4.05009 15.0033 4.34 15H10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="review-count">0</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="see-more">
                See More Reviews <ChevronRight className="see-more-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs; 