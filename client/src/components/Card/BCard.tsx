import { ICard } from '../../interfaces/CardInterfaces';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface IBcardProps {
  card: ICard;
}

export default function BCard(props: IBcardProps) {
  const { card } = props;

  const navigate = useNavigate();

  const goToCardDetails = (cardId: string) => {
    navigate(`/card-details/${cardId}`, { state: { cardId: cardId } });
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    try {
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error parsing favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  return (
    <Col key={card._id}>
      <Card className="text-center">
        <Card.Header style={{ fontWeight: '500' }}>{card.title}</Card.Header>
        <Card.Body>
          <Card.Img
            variant="top"
            src={card.image.url}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Title className="pt-3">{card.subtitle}</Card.Title>
          <Card.Text>{card.description}</Card.Text>
          <Button variant="primary" size="sm" onClick={() => goToCardDetails(card._id)}>
            Go to card
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <button
            className={`mr-2 p-1 rounded-md text-sm bg-gray-300 dark:bg-gray-700 font-medium ${
              favorites.includes(card._id)
                ? 'text-red-600'
                : 'text-gray-500 dark:text-gray-300'
            }`}
            onClick={() => toggleFavorite(card._id)}
          >
            Favorite {favorites.includes(card._id) ? '❤️' : '🤍'}
          </button>
        </Card.Footer>
      </Card>
    </Col>
  );
}
