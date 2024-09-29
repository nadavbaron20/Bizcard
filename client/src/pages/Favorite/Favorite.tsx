import { useEffect, useState } from 'react';
import { doGetAllCards } from '../../services/CardsService';
import { ICard } from '../../interfaces/CardInterfaces';
import BCard from '../../components/Card/BCard'; // Assuming BCard is your card component
import { Row, Col } from 'react-bootstrap';

export default function Favorite() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Fetch all cards
    const fetchCards = async () => {
      const { error, result } = await doGetAllCards();
      if (error) {
        console.error("Failed to fetch cards:", error);
      } else {
        setCards(result || []);
      }
    };

    fetchCards();

    // Get favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Filter the cards to show only favorites
  const favoriteCards = cards.filter(card => favorites.includes(card._id));

  return (
    <div>
      <h2>My Favorite Cards</h2>
      <Row>
        {favoriteCards.length > 0 ? (
          favoriteCards.map(card => (
            <Col key={card._id} sm={12} md={6} lg={4} className="mb-4">
              <BCard card={card} />
            </Col>
          ))
        ) : (
          <p>You haven't added any favorites yet.</p>
        )}
      </Row>
    </div>
  );
}