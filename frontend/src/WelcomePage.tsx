import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface DeliveryData {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

function WelcomePage() {
  const { userId } = useParams<{ userId: string }>();
  const [data, setData] = useState<DeliveryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [catImage, setCatImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/comms/your-next-delivery/${userId}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch delivery data');
        }
        const deliveryData: DeliveryData = await response.json();
        setData(deliveryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchCatImage = async () => {
      try {
        const response = await fetch(
          'https://api.thecatapi.com/v1/images/search',
        );
        const [cat] = await response.json();
        setCatImage(cat.url);
      } catch (err) {
        // Ignore cat image errors
      }
    };

    fetchData();
    fetchCatImage();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  console.log('hello');

  return (
    <div className="page">
      <section className="delivery-card">
        <div className="image-wrap">
          {catImage && <img src={catImage} alt="A cute cat" />}
        </div>

        <div className="content">
          {data.freeGift && <div className="gift-ribbon">FREE GIFT</div>}

          <h1>{data.title}</h1>
          <p className="message">{data.message}</p>

          <p className="price">
            <strong>Total price:</strong> £{data.totalPrice.toFixed(2)}
          </p>

          <div className="actions">
            <button className="primary">SEE DETAILS</button>
            <button className="secondary">EDIT DELIVERY</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
