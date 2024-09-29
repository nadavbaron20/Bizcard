import React, { useState } from 'react';
import BCard from '../Card/BCard';
import { ICard } from '../../interfaces/CardInterfaces';
import { Row } from 'react-bootstrap';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface IBCardsGalleryProps {
  cards: ICard[];
}

export default function BCardsGallery(props: IBCardsGalleryProps) {
  const { cards } = props;

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex-grow-1 mx-2 mb-4" style={{ maxWidth: '40%' }}>
        <div className="input-group">
          <input
            className="form-control border-end-0 border rounded-3"
            type="search"
            id="header-search-input"
            value={searchQuery}
            onChange={handleSearchChange} // Handle input change
            placeholder="Search cards..."
          />
          <span className="input-group-append">
            <button
              style={{ marginLeft: '-41px' }}
              className="magnifying-glass btn btn-outline-secondary bg-white border-bottom-0 border rounded-3"
              type="button"
            >
              <FaMagnifyingGlass className="magnifying-glass" />
            </button>
          </span>
        </div>
      </div>
      <Row xs={1} md={2} lg={3} xl={4} className="g-5">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => <BCard key={card._id} card={card} />)
        ) : (
          <p>No cards found matching your search.</p>
        )}
      </Row>
      <h5 className="mt-5">Total {filteredCards.length} cards</h5>
    </>
  );
}